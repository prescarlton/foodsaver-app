import React from "react"
import { StyleSheet } from "react-native"
import { spacing } from "../../theme"
import { Button, Text } from "native-base"
import { Screen } from "app/components"
import { useAuth } from "@clerk/clerk-expo"

export const ProfileScreen = () => {
  const { signOut } = useAuth()
  const handleSignout = () => {
    signOut()
  }

  return (
    <Screen preset="fixed" contentContainerStyle={styles.container} safeAreaEdges={["top"]}>
      <Text fontSize="2xl">My Profile</Text>
      <Button onPress={handleSignout}>Log out</Button>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    flex: 1,
    // justifyContent: "center",
  },
})
