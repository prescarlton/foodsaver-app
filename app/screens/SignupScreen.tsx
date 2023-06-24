import * as React from "react"
import { Keyboard, Platform, TouchableWithoutFeedback } from "react-native"
import { useSignUp } from "@clerk/clerk-expo"
import {
  Button,
  HStack,
  Icon,
  Input,
  KeyboardAvoidingView,
  Pressable,
  Text,
  VStack,
} from "native-base"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import useSignup from "app/hooks/api/useSignup"
import Feather from "@expo/vector-icons/Feather"
import { useToast } from "react-native-toast-notifications"

export default function SignUpScreen({ navigation }) {
  const { isLoaded, signUp, setActive } = useSignUp()

  const [emailAddress, setEmailAddress] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)

  const { bottom, top } = useSafeAreaInsets()
  const signup = useSignup()
  const toast = useToast()
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
      toast.show("Unable to signup", {
        placement: "top",
        type: "danger",
      })
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
      // after we set the token, make a request to create user
      await signup.mutateAsync({
        firstName: completeSignUp.firstName || "",
        lastName: completeSignUp.lastName || "",
        email: completeSignUp.emailAddress,
        phone: completeSignUp.phoneNumber || "",
        clerkId: completeSignUp.createdUserId,
      })
      // finally, sign the user in
      await setActive({ session: completeSignUp.createdSessionId })
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
      toast.show("Unable to sign up", { type: "danger", placement: "top" })
    }
  }
  const handleLoginPress = () => {
    navigation.navigate("Login")
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
        {pendingVerification ? (
          <VStack space="lg" mb={24}>
            <VStack>
              <Text fontSize="3xl">Check your email for a verification code</Text>
              <Text fontSize="lg">Don't see it yet? Give 'er a few minutes.</Text>
            </VStack>
            <Input value={code} placeholder="Code..." onChangeText={(code) => setCode(code)} />
            <Button onPress={onPressVerify}>Verify Email</Button>
          </VStack>
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
                autoCapitalize="none"
              />
              <Input
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                variant="filled"
                size="2xl"
                autoCapitalize="none"
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
