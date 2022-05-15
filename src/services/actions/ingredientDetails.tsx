import { TElement } from "../../utils/types";

export const SHOW_INGREDIENT_DETAILS : 'SHOW_INGREDIENT_DETAILS' = 'SHOW_INGREDIENT_DETAILS';
export const CLOSE_INGREDIENT_DETAILS : 'CLOSE_INGREDIENT_DETAILS' = 'CLOSE_INGREDIENT_DETAILS';

export interface IshowIngredientDetails {
    readonly type: typeof SHOW_INGREDIENT_DETAILS;
    readonly ingredient: null | TElement;
}
export interface IcloseIngredientDetails {
    readonly type: typeof CLOSE_INGREDIENT_DETAILS;
    readonly ingredient: null | TElement;
}

export type TIngredientDetailsActions = IshowIngredientDetails | IcloseIngredientDetails;

export function showIngredientDetails(item : TElement) : IshowIngredientDetails {
    return {
        type: SHOW_INGREDIENT_DETAILS, 
        ingredient: item
    }
}

export function closeIngredientDetails(item : (null | TElement)) : IcloseIngredientDetails {
    return {
        type: CLOSE_INGREDIENT_DETAILS,
        ingredient: item 
    }
}