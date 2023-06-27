import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import * as Screens from "app/screens"

function StackNavigator() {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator initialRouteName="RecipeList" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RecipeList" component={Screens.RecipeListScreen} />
      <Stack.Screen name="RecipeInstructions" component={Screens.RecipeInstructionsScreen} />
    </Stack.Navigator>
  )
}

export default StackNavigator
