import React from "react"
import { IRecipeCard } from "../types/RecipeCard"
import { Card, HStack, Text } from "native-base"

const RecipeCard = ({ recipe }: IRecipeCard) => {
  return (
    <Card backgroundColor="warmGray.300" borderRadius="xl">
      <Text fontWeight="bold">{recipe.name}</Text>
      <HStack>
        <Text>{recipe.description}</Text>
      </HStack>
    </Card>
  )
}

export default RecipeCard
