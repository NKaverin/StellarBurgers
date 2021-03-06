import { ADD_TO_ORDER, POST_ORDER_CLOSE, POST_ORDER_FAILED, POST_ORDER_REQUEST, POST_ORDER_SUCCESS, REMOVE_FROM_ORDER, REORDER_ITEMS } from '../actions/orderReducer';

interface Element {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
    elementIndex: number,
    uud: string
}

// самая популярная булка в нашей бургерной
const initialState  = {
    totalPrice: 0,
    ingredients: [] as Array<Element>,
    orderId: ''
}

export const orderReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case ADD_TO_ORDER: {
            if (action.element.type === 'bun') {
                if (state.ingredients.filter(element => element.elementIndex === 0).length === 0) {
                    //если булки нет - добавляем её вначало
                    return {
                        ...state,
                        totalPrice: state.totalPrice + action.element.price*2,
                        ingredients: [{...action.element, elementIndex: 0},...state.ingredients]
                    };
                } else {
                    // ищем булку и меняем её
                    const oldBun = state.ingredients.filter(element => element.elementIndex === 0)[0];
                    return {
                        ...state,
                        totalPrice: state.totalPrice + action.element.price*2 - oldBun.price*2,
                        ingredients: [{...action.element, elementIndex: 0},...state.ingredients.filter(element => element.elementIndex !== 0)]
                    };
                }
            } else {
                return {
                    ...state,
                    totalPrice: state.totalPrice + action.element.price,
                    ingredients: [...state.ingredients, action.element]
                };
            }
        }
        case REMOVE_FROM_ORDER: {
            const updatedData = [...state.ingredients].filter(element => element.elementIndex !== action.element.elementIndex);
            // сдвигаем индексы в новом массиве
            updatedData.forEach(element => {
                if (element.elementIndex > action.element.elementIndex) {
                    element.elementIndex--; 
                }
            })

            return {
                ...state,
                totalPrice: state.totalPrice - action.element.price,
                ingredients: updatedData
            };
        }
        case REORDER_ITEMS: {
            // меняем местами
            const noBun = state.ingredients.filter(element => element.elementIndex === 0).length === 0 ? 1 : 0;
            const dragItem = state.ingredients[action.dragIndex - noBun];
            const hoverItem = state.ingredients[action.hoverIndex - noBun];
            const updatedData = [...state.ingredients];
            updatedData[action.dragIndex - noBun] = hoverItem;
            updatedData[action.dragIndex - noBun].elementIndex = action.dragIndex;
            updatedData[action.hoverIndex - noBun] = dragItem;
            updatedData[action.hoverIndex - noBun].elementIndex = action.hoverIndex;
            return {
                ...state,
                ingredients: updatedData
            }
        }
        case POST_ORDER_REQUEST: {
            return state;
        }
        case POST_ORDER_SUCCESS: {
            return {
                ...state,
                orderId: action.order
            };
        }
        case POST_ORDER_CLOSE: {
            return {
                ...state,
                orderId: null
            };
        }
        case POST_ORDER_FAILED: {
            return state;
        }
        default: return state;
    }
}

