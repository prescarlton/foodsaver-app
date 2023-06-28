import React, { useState } from "react"
import { View, Button, Image, Alert, HStack } from "native-base"
import * as ImagePicker from "expo-image-picker"

export const CameraRollScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null)

  const selectImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== "granted") {
        Alert(["Permission Denied", "Sorry, we need camera roll permissions to select an image."])
        return
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      })

      if (!result.canceled) {
        console.log(result)
        setSelectedImage(result.assets[0].uri)
      }
    } catch (error) {
      console.log("Error selecting image:", error)
    }
  }
  const uploadImage = async (uri) => {
    try {
      const response = await fetch("YOUR_BACKEND_API_ENDPOINT", {
        method: "POST",
        body: uri,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      const result = await response.json()
      console.log("Image upload result:", result)
      setSelectedImage(null)
      return result
    } catch (error) {
      console.log("Error uploading image:", error)
    }
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={{ width: 300, height: 300 }} alt="Uh Oh" />
      )}
      <HStack space={6} pt={4}>
        <Button onPress={selectImage}>Select Image</Button>
        <Button onPress={uploadImage}>Upload Image</Button>
      </HStack>
    </View>
  )
}
