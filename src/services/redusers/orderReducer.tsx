import { ADD_TO_ORDER, POST_ORDER_FAILED, POST_ORDER_REQUEST, POST_ORDER_SUCCESS, REMOVE_FROM_ORDER, REORDER_ITEMS } from '../actions/orderReducer';

// самая популярная булка в нашей бургерной
const initialState  = {
    totalPrice: 1255*2,
    ingredients: [{
        "_id":"60d3b41abdacab0026a733c6",
        "name":"Краторная булка N-200i",
        "type":"bun",
        "proteins":80,
        "fat":24,
        "carbohydrates":53,
        "calories":420,
        "price":1255,
        "image":"https://code.s3.yandex.net/react/code/bun-02.png",
        "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
        "__v":0,
        "elementIndex": 0
    }],
    orderId: ''
}

export const orderReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case ADD_TO_ORDER: {
            if (action.element.type === 'bun') {
                // ищем булку и меняем её
                const oldBun = state.ingredients.filter(element => element.elementIndex === 0)[0];
                return {
                    ...state,
                    totalPrice: state.totalPrice + action.element.price*2 - oldBun.price*2,
                    ingredients: [{...action.element, elementIndex: 0},...state.ingredients.filter(element => element.elementIndex !== 0)]
                };
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
            const dragItem = state.ingredients[action.dragIndex];
            const hoverItem = state.ingredients[action.hoverIndex];
            const updatedData = [...state.ingredients];
            updatedData[action.dragIndex] = hoverItem;
            updatedData[action.dragIndex].elementIndex = action.dragIndex;
            updatedData[action.hoverIndex] = dragItem;
            updatedData[action.hoverIndex].elementIndex = action.hoverIndex;
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
                orderId: action.order.number
            };
        }
        case POST_ORDER_FAILED: {
            return state;
        }
        default: return state;
    }
}

