import React, { useState } from "react"
import { Keyboard, Platform, TouchableWithoutFeedback } from "react-native"
import { useSignIn } from "@clerk/clerk-expo"
import {
  Button,
  HStack,
  Input,
  KeyboardAvoidingView,
  VStack,
  Text,
  Pressable,
  Icon,
} from "native-base"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Feather from "@expo/vector-icons/Feather"

export default function LoginScreen({ navigation }) {
  const { signIn, setActive, isLoaded } = useSignIn()

  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

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
  const togglePassword = () => setShowPassword((prev) => !prev)

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
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
            />
            <Input
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              variant="filled"
              size="2xl"
              autoCapitalize="none"
              autoComplete="password"
              type={showPassword ? "text" : "password"}
              InputRightElement={
                <Pressable onPress={togglePassword}>
                  <Icon
                    as={<Feather name={showPassword ? "eye" : "eye-off"} />}
                    size={5}
                    mr="2"
                    color="muted.400"
                  />
                </Pressable>
              }
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
