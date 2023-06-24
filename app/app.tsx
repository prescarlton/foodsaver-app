/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
import "./i18n"
import "./utils/ignoreWarnings"
import { useFonts } from "expo-font"
import React from "react"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import { useInitialRootStore } from "./models"
import { navigationRef, useNavigationPersistence } from "./navigators"
import { ErrorBoundary } from "./screens/ErrorScreen/ErrorBoundary"
import * as storage from "./utils/storage"
import { customFontsToLoad } from "./theme"
import { setupReactotron } from "./services/reactotron"
import Config from "./config"
import AppNavigator from "./navigators/AppNavigator"
import { NativeBaseProvider } from "native-base"
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo"
import tokenCache from "./utils/tokenCache"
import SignedOutNavigator from "./navigators/SignedOutNavigator"
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { useColorScheme } from "react-native"
import { QueryClient, QueryClientProvider } from "react-query"
import { ToastProvider } from "react-native-toast-notifications"

// Set up Reactotron, which is a free desktop app for inspecting and debugging
// React Native apps. Learn more here: https://github.com/infinitered/reactotron
setupReactotron({
  // clear the Reactotron window when the app loads/reloads
  clearOnLoad: true,
  // generally going to be localhost
  host: "localhost",
  // Reactotron can monitor AsyncStorage for you
  useAsyncStorage: true,
  // log the initial restored state from AsyncStorage
  logInitialState: true,
  // log out any snapshots as they happen (this is useful for debugging but slow)
  logSnapshots: false,
})

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

interface AppProps {
  hideSplashScreen: () => Promise<void>
}

/**
 * This is the root component of our app.
 */
function App(props: AppProps) {
  const { hideSplashScreen } = props
  const { isRestored: isNavigationStateRestored } = useNavigationPersistence(
    storage,
    NAVIGATION_PERSISTENCE_KEY,
  )

  const [areFontsLoaded] = useFonts(customFontsToLoad)

  const { rehydrated } = useInitialRootStore(() => {
    // This runs after the root store has been initialized and rehydrated.

    // If your initialization scripts run very fast, it's good to show the splash screen for just a bit longer to prevent flicker.
    // Slightly delaying splash screen hiding for better UX; can be customized or removed as needed,
    // Note: (vanilla Android) The splash-screen will not appear if you launch your app via the terminal or Android Studio. Kill the app and launch it normally by tapping on the launcher icon. https://stackoverflow.com/a/69831106
    // Note: (vanilla iOS) You might notice the splash-screen logo change size. This happens in debug/development mode. Try building the app for release.
    setTimeout(hideSplashScreen, 500)
  })
  const colorScheme = useColorScheme()
  const queryClient = new QueryClient()

  if (!rehydrated || !isNavigationStateRestored || !areFontsLoaded) return null

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ToastProvider placement="top" offsetTop={60}>
        <ErrorBoundary catchErrors={Config.catchErrors}>
          <ClerkProvider publishableKey={Config.clerkPK} tokenCache={tokenCache}>
            <QueryClientProvider client={queryClient}>
              <NativeBaseProvider>
                <NavigationContainer
                  ref={navigationRef}
                  theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
                >
                  <SignedIn>
                    <AppNavigator />
                  </SignedIn>
                  <SignedOut>
                    <SignedOutNavigator />
                  </SignedOut>
                </NavigationContainer>
              </NativeBaseProvider>
            </QueryClientProvider>
          </ClerkProvider>
        </ErrorBoundary>
      </ToastProvider>
    </SafeAreaProvider>
  )
}

export default App
