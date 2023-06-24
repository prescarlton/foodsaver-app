import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from "app/screens/LoginScreen"
import SignUpScreen from "app/screens/SignupScreen"

const SignedOutNavigator = () => {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignUpScreen} />
    </Stack.Navigator>
  )
}

export default SignedOutNavigator
