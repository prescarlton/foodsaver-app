import React from "react"
import { Keyboard, Platform, TouchableWithoutFeedback } from "react-native"
import { useSignIn } from "@clerk/clerk-expo"
import { Button, HStack, Input, KeyboardAvoidingView, VStack, Text } from "native-base"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function LoginScreen({ navigation }) {
  const { signIn, setActive, isLoaded } = useSignIn()

  const [emailAddress, setEmailAddress] = React.useState("")
  const [password, setPassword] = React.useState("")

  const { bottom, top } = useSafeAreaInsets()

  const handleLoginPress = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      })
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId })
    } catch (err: any) {
      console.log(err)
    }
  }
  const handleSignupPress = () => {
    navigation.navigate("Signup")
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        display="flex"
        justifyContent="flex-end"
        flex={1}
        paddingTop={top}
        paddingBottom={bottom + 32}
        paddingX={4}
        backgroundColor="white"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <VStack space="xl">
          <Text fontSize="3xl" alignSelf="flex-start" fontWeight="bold">
            Log in
          </Text>
          <VStack space="lg" alignItems="center">
            <Input
              value={emailAddress}
              onChangeText={setEmailAddress}
              placeholder="Email"
              variant="filled"
              size="2xl"
            />
            <Input
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              variant="filled"
              size="2xl"
            />
            <Button onPress={handleLoginPress} width="full">
              Login
            </Button>
            <HStack alignItems="center" mb={24}>
              <Text>Don't have an account yet?</Text>
              <Button variant="ghost" onPress={handleSignupPress}>
                Sign Up
              </Button>
            </HStack>
          </VStack>
        </VStack>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}
