export const SHOW_INGREDIENT_DETAILS = 'SHOW_INGREDIENT_DETAILS';
export const CLOSE_INGREDIENT_DETAILS = 'CLOSE_INGREDIENT_DETAILS';

export function showIngredientDetails(item) {
    return {
        type: SHOW_INGREDIENT_DETAILS, 
        ingredient: item
    }
}

export function closeIngredientDetails(item) {
    return {
        type: CLOSE_INGREDIENT_DETAILS,
        ingredient: item 
    }
}