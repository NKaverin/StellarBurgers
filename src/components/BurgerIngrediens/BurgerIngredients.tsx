import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './BurgerIngredients.module.css';
import PropTypes from 'prop-types';
import propTypesOfDataElement from '../../utils/propTypesOfDataElement';

const  BurgerIngredients = ({ data, openHandler }) => {
    return (  
        <section className={styles.burgerIngredients + " mr-5"}>
            <h1 className="text text_type_main-large mt-10"> Соберите бургер </h1>
            {/* переключатель */}
            <Tabs/>
            {/* ингредиенты */}
            <div className={styles.burgerIngredients__container + " mt-10"}>    
                <h2 className={styles.burgerIngredients__header + " text text_type_main-medium"}> Булки </h2>
                <Ingredients type="bun" data = {data} openHandler = {openHandler} />
                <h2 className={styles.burgerIngredients__header + " text text_type_main-medium"}> Соусы </h2>
                <Ingredients type="sauce" data = {data} openHandler = {openHandler} />
                <h2 className={styles.burgerIngredients__header + " text text_type_main-medium"}> Начинки </h2>
                <Ingredients type="main" data = {data} openHandler = {openHandler} /> 
            </div>
        </section>
    );
};


const Tabs = () => {
    const [current, setCurrent] = React.useState("buns")
    return (
        <div className={styles.burgerIngredients__tabs + " mt-5"}>
            <a><Tab value="buns" active={current === "buns"} onClick={setCurrent}>
                Булки
            </Tab></a>
            <a><Tab value="suses" active={current === "suses"} onClick={setCurrent}>
                Соусы
            </Tab></a>
            <a><Tab value="fillings" active={current === "fillings"} onClick={setCurrent}>
                Начинки
            </Tab></a>
        </div>
    )
}

const Ingredients = ({ data, type, openHandler }) => {
    return (
        <ul className={styles.burgerIngredients__ingridients + " pl-1 pr-1 pt-6 pb-2"}>
            {data.filter(element => element.type === type).map(element => {
                return <Element {...element} key = {element._id} openHandler = {openHandler}/>
            })}
        </ul>
    )
}

const Element = (props) => {
    {/*const [count, setCount] = React.useState(0);*/}
    return (
        <div className={styles.burgerIngredients__element + " mb-8 pl-3 pr-3"} key = {props._id} onClick={() => props.openHandler(props)}>
            {/*<Counter count={0} size="default" />*/}
            <img src={props.image} alt={props.name} className="burgerIngredients__picture" />
            <div className={styles.burgerIngredients__priceBox + " mt-1 mb-1"}>
                <p className={styles.burgerIngredients__price + " text text_type_digits-default"}>{props.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={styles.burgerIngredients__caption +  " text text_type_main-default"}>{props.name}</p>
        </div>
    )
}

BurgerIngredients.propTypes = {
    openHandler: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    element: propTypesOfDataElement
}

Element.propTypes = {
    openHandler: PropTypes.func.isRequired,
    // данные элемента
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired
}

Ingredients.propTypes = {
    openHandler: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(propTypesOfDataElement).isRequired,
    type: PropTypes.string.isRequired
}

export default BurgerIngredients;