import React, { FC, useState } from "react"
import { View, StyleSheet } from "react-native"
import { Button, Text } from "../components"
import { Camera, CameraType } from "expo-camera"
import { TouchableOpacity } from "react-native-gesture-handler"

export const CameraScreen: FC = () => {
  const [type, setType] = useState(CameraType.back)
  const [permission, requestPermission] = Camera.useCameraPermissions()

  if (!permission) {
    // Camera permissions are still loading
    return <View />
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission}>Request Permission</Button>
      </View>
    )
  }

  function toggleCameraType() {
    setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back))
  }

  return (
    <Camera style={styles.camera} type={type}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
      </View>
    </Camera>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    alignSelf: "flex-end",
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: "transparent",
    flex: 1,
    flexDirection: "row",
    margin: 64,
  },
  camera: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
})
