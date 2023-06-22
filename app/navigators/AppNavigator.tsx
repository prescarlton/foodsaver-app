/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams, // @demo remove-current-line
} from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React from "react"
import { TextStyle, ViewStyle, useColorScheme } from "react-native"
import * as Screens from "app/screens"
import Config from "../config"
import { DemoTabParamList } from "./DemoNavigator" // @demo remove-current-line
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { colors, spacing, typography } from "app/theme"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { translate } from "../i18n"
import { Icon } from "app/components"
import { useSafeAreaInsets } from "react-native-safe-area-context"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Home: undefined
  Login: undefined
  Demo: NavigatorScreenParams<DemoTabParamList>
  Camera: undefined
  DemoShowroom: undefined
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
const Tab = createBottomTabNavigator<AppStackParamList>()

const AppNavigator = observer(function AppStack() {
  const colorScheme = useColorScheme()
  const { bottom } = useSafeAreaInsets()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: [$tabBar, { height: bottom + 70 }],
          tabBarActiveTintColor: colors.text,
          tabBarInactiveTintColor: colors.text,
          tabBarLabelStyle: $tabBarLabel,
          tabBarItemStyle: $tabBarItem,
        }}
        // initialRouteName={isAuthenticated ? "Home" : "Login"}
        initialRouteName="Home"
      >
        <Tab.Screen
          name="Home"
          component={Screens.WelcomeScreen}
          options={{
            tabBarLabel: translate("tabNavigator.homeTab"),
            tabBarIcon: ({ focused }) => (
              <Icon icon="heart" color={focused && colors.tint} size={30} />
            ),
          }}
        />
        <Tab.Screen
          name="Camera"
          component={Screens.CameraScreen}
          options={{
            tabBarLabel: translate("tabNavigator.cameraTab"),
            tabBarIcon: ({ focused }) => (
              <Icon icon="camera" color={focused && colors.tint} size={30} />
            ),
          }}
        />
        <Tab.Screen
          name="DemoShowroom"
          component={Screens.DemoShowroomScreen}
          options={{
            tabBarLabel: translate("demoNavigator.componentsTab"),
            tabBarIcon: ({ focused }) => (
              <Icon icon="components" color={focused && colors.tint} size={30} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
})

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.md,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1,
}

// @demo remove-file

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export default AppNavigator
