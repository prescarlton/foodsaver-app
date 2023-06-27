import React from "react"
import { StyleSheet } from "react-native"
import { ListItem, Screen, Text } from "../../components"
import { spacing } from "../../theme"

import { FlatList } from "native-base"

export const RecipeInstructionsScreen = ({ route }) => {
  const { recipe } = route.params
  console.log(route.params)
  return (
    <Screen preset="fixed" contentContainerStyle={styles.container} safeAreaEdges={["top"]}>
      <Text preset="heading">{recipe.name}</Text>
      <Text preset="subheading">{recipe.description}</Text>
      <FlatList
        data={recipe.instructions}
        renderItem={({ item, index }) => ListItem({ text: `${index + 1}. ${item}` })}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
    flex: 1,
    justifyContent: "flex-start",
    paddingBottom: 90,
  },
})
