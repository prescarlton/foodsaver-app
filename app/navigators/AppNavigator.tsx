/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React from "react"
import * as Screens from "app/screens"
import Config from "../config"
import { useBackButtonHandler } from "./navigationUtilities"
import { colors } from "app/theme"
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar"
import FeatherIcons from "@expo/vector-icons/Feather"
import { translate } from "app/i18n"
import RecipeListNavigator from "./RecipeListNavigator"
/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 */
export type AppStackParamList = {
  Home: undefined
  Login: undefined
  Camera: undefined
  RecipeList: undefined
  Profile: undefined
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
// const Stack = createNativeStackNavigator<AppStackParamList>()
// const Tab = createBottomTabNavigator<AppStackParamList>()
const Tab = AnimatedTabBarNavigator()

const AppNavigator = observer(function AppStack() {
  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        // tabBarStyle: [styles.tabBar, { marginBottom: bottom }],
        // tabBarItemStyle: styles.tabBarItem,
        tabBarShowLabel: false,
      }}
      initialRouteName="Home"
      appearance={{
        floating: true,
      }}
    >
      <Tab.Screen
        name="RecipeList"
        component={RecipeListNavigator}
        options={{
          tabBarLabel: translate("tabNavigator.recipeListTab"),
          tabBarIcon: ({ focused }) => (
            <FeatherIcons
              name="home"
              color={focused ? colors.tint : colors.palette.neutral300}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={Screens.CameraScreen}
        options={{
          tabBarLabel: translate("tabNavigator.cameraTab"),
          tabBarIcon: ({ focused }) => (
            <FeatherIcons
              name="camera"
              color={focused ? colors.tint : colors.palette.neutral300}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Screens.ProfileScreen}
        options={{
          tabBarLabel: translate("tabNavigator.profileTab"),
          tabBarIcon: ({ focused }) => (
            <FeatherIcons
              name="user"
              color={focused ? colors.tint : colors.palette.neutral300}
              size={30}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
})

export default AppNavigator
