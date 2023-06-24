import React from "react"
import { StyleSheet } from "react-native"
import { Screen, Text } from "../../components"
import { spacing } from "../../theme"
import RecipeCard from "./components/RecipeCard"
import { fakeRecipes } from "./data/fakeRecipes"
import { FlatList, View } from "native-base"
import useClerkQuery from "app/hooks/api/useClerkQuery"

export const RecipeListScreen = () => {
  const { data: me } = useClerkQuery("http://localhost:5001/app/users/me")
  return (
    <Screen preset="fixed" contentContainerStyle={styles.container} safeAreaEdges={["top"]}>
      <Text preset="heading">Recipes</Text>
      <Text preset="subheading">Find recipes with ingredients you already have</Text>
      <FlatList
        borderWidth="0"
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        data={fakeRecipes}
        renderItem={({ item }) => <RecipeCard key={item.id} recipe={item} />}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
    flex: 1,
    justifyContent: "center",
  },
})
