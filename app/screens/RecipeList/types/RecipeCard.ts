export interface IRecipeCard {
  recipe: IRecipe
}

export interface IRecipe {
  id: number
  name: string
  description: string
  photo: string
  ingredients: string[]
}
