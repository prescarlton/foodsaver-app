import React, { useState } from "react"
import { View, Button, Image, Alert } from "react-native"
import * as ImagePicker from "expo-image-picker"

export const CameraRollScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null)

  const selectImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Sorry, we need camera roll permissions to select an image.",
        )
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
        uploadImage(result.assets[0].uri)
      }
    } catch (error) {
      console.log("Error selecting image:", error)
    }
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />
      )}
      <Button title="Select Image" onPress={selectImage} />
    </View>
  )
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
  } catch (error) {
    console.log("Error uploading image:", error)
  }
}
