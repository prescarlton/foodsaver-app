import React, { FC, useState } from "react"
import { View, StyleSheet } from "react-native"
import { Button, Text } from "../components"
import { Camera, CameraType } from "expo-camera"
import { TouchableOpacity } from "react-native-gesture-handler"
// import MlkitOcr from 'react-native-mlkit-ocr';
import * as FileSystem from 'expo-file-system';
import MlkitOcr, { MlkitOcrResult } from 'react-native-mlkit-ocr';



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

  // const resultFromUri = await MlkitOcr.detectFromUri(uri);
  // const resultFromFile = await MlkitOcr.detectFromFile(path);

  async function saveImage() {
    const downloadResumable = FileSystem.createDownloadResumable(
      'https://i.pinimg.com/originals/99/97/02/99970232c4c2debdfeeabf947258caad.jpg',
      FileSystem.documentDirectory + 'tmp.jpg',
      {},
    )

    try {
      const { uri } = await downloadResumable.downloadAsync();
      console.log('Finished downloading to uri:', uri);
      await ocr(uri)
    } catch (e) {
      console.error(e);
    }
  }


  async function ocr(uri: string) {
    const idk: MlkitOcrResult = await MlkitOcr.detectFromUri(uri)
    console.log('results', JSON.stringify(idk))
  }

  saveImage()

  return (
    <Camera
      style={styles.camera}
      type={type}
      ref={ref => { setCameraRef(ref) }}
    >
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

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.button} onPress={takePicture}>
//             <Text style={styles.text}> Shot </Text>
//         </TouchableOpacity>
//       </View>

      // <View style={styles.buttonContainer}>
      //   <TouchableOpacity style={{alignSelf: 'center', marginBottom: 20}} onPress={async() => {
      //     console.log("pressed")
      //         if(cameraRef) {
      //           let photo = await cameraRef.takePictureAsync({ skipProcessing: true });
      //           }
      //       }}>
      //     <Text style={styles.text}>Photo</Text>
      //   </TouchableOpacity>
      // </View>

  // const saveImage = async () => {
  //   try {
  //     const uri = await getImage()
  //     // Request device storage access permission
  //     const { status } = await MediaLibrary.requestPermissionsAsync();
  //     if (status === "granted") {
  //       // Save image to media library
  //       await MediaLibrary.saveToLibraryAsync(uri.data);
  //       console.log("Image successfully saved");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async function takePicture() {
  //   console.log("takePicture")
  //   if (cameraRef) {
  //     const options = { quality: 0.5, base64: true, skipProcessing: true };
  //     const img = await cameraRef.takePictureAsync(options)
  //     console.log(`img uri: ${img.uri}`)
  //   }
  // }

// export default function ImageViewer({ placeholderImageSource, selectedImage }) {
//   const imageSource = selectedImage !== null
//     ? { uri: selectedImage }
//     : placeholderImageSource;

//   return <Image source={imageSource} style={styles.image} />;
// }


// export const SomeScreen: FC = () => {
//    const [selectedImage, setSelectedImage] = useState(null);

//   const pickImageAsync = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: true,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setSelectedImage(result.assets[0].uri);
//       const resultFromUri = await MlkitOcr.detectFromUri(result.assets[0].uri);
//     } else {
//       alert('You did not select any image.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.imageContainer}>
//         <ImageViewer
//           placeholderImageSource={PlaceholderImage}
//           selectedImage={selectedImage}
//         />
//       </View>
//     </View>
//   )
// }

// const takePicture = async (camera: CameraType) => {
//     if (camera) {
//       const data = await camera.takePictureAsync(null);
//       console.log(data.uri);
//       // setImageUri(data.uri);
//     }
//   };

