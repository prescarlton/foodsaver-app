import * as React from "react"
import { Keyboard, Platform, TouchableWithoutFeedback, View } from "react-native"
import { useSignUp } from "@clerk/clerk-expo"
import { Button, HStack, Input, KeyboardAvoidingView, Text, VStack } from "native-base"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function SignUpScreen({ navigation }) {
  const { isLoaded, signUp, setActive } = useSignUp()

  const [emailAddress, setEmailAddress] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState("")

  const { bottom, top } = useSafeAreaInsets()

  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" })

      // change the UI to our pending section.
      setPendingVerification(true)
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      await setActive({ session: completeSignUp.createdSessionId })
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }
  const handleLoginPress = () => {
    navigation.navigate("Login")
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
        {pendingVerification ? (
          <View>
            <View>
              <Input value={code} placeholder="Code..." onChangeText={(code) => setCode(code)} />
            </View>
            <Button onPress={onPressVerify}>Verify Email</Button>
          </View>
        ) : (
          <VStack space="xl">
            <Text fontSize="3xl" alignSelf="flex-start" fontWeight="bold">
              Sign up
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
              <Button onPress={onSignUpPress} width="full">
                Sign Up
              </Button>
              <HStack alignItems="center" mb={24}>
                <Text>Already have an account?</Text>
                <Button variant="ghost" onPress={handleLoginPress}>
                  Login
                </Button>
              </HStack>
            </VStack>
          </VStack>
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}
