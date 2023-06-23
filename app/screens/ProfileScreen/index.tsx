import React from "react"
import { StyleSheet } from "react-native"
import { spacing } from "../../theme"
import { Text } from "native-base"
import { Screen } from "app/components"

export const ProfileScreen = () => {
  return (
    <Screen preset="auto" contentContainerStyle={styles.container} safeAreaEdges={["top"]}>
      <Text variant="heading">My Profile</Text>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    flex: 1,
    justifyContent: "center",
  },
})
