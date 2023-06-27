import React from "react"
import { IRecipeCard } from "../types/RecipeCard"
import { Button, Card, HStack, Text } from "native-base"
import { navigate } from "app/navigators"

const RecipeCard = ({ recipe }: IRecipeCard) => {
  return (
    <Card backgroundColor="warmGray.300" borderRadius="xl">
      <Button
        variant="unstyled"
        onPress={() => {
          navigate({ name: "RecipeInstructions", params: { recipe } })
        }}
      >
        <Text fontWeight="bold">{recipe.name}</Text>
        <HStack>
          <Text>{recipe.description}</Text>
        </HStack>
      </Button>
    </Card>
  )
}

export default RecipeCard
