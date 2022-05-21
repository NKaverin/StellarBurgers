type TElement = {
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
    uud: string,
    count: number
}

type IValidationError  = {
    name: boolean,
    email: boolean,
    password: boolean
}

type IUser = {
    email: string,
    name: string
}

type IOrder = {
    createdAt: Date,
    ingredients: string[],
    name: string,
    number: number,
    status: string,
    updatedAt: string,
    _id: string
}

type IMessage = {
    success: boolean, 
    orders: IOrder[], 
    total: number, 
    totalToday: number
}

type ItokenAndUser = {
    accessToken: string,
    refreshToken: string,
    success: boolean,
    user: IUser
} 

export type {TElement, IValidationError, IUser, IOrder, IMessage, ItokenAndUser}