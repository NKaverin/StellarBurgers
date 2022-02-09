import { Tab, Counter, CurrencyIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useRef } from 'react';
import styles from './BurgerIngredients.module.css';

const  BurgerIngredients = (props) => {
    return (  
        <section className={styles.burgerIngredients + " mr-5"}>
            <h1 className="text text_type_main-large mt-10"> Соберите бургер </h1>
            {/* переключатель */}
            <Tabs/>
            {/* ингредиенты */}
            <div className={styles.burgerIngredients__container + " mt-10"}>    
                <h2 className={styles.burgerIngredients__header + " text text_type_main-large"}> Булки </h2>
                <Ingredients type="bun" data = {props.data || []} />
                <h2 className={styles.burgerIngredients__header + " text text_type_main-large"}> Соусы </h2>
                <Ingredients type="sauce" data = {props.data || []}  />
                <h2 className={styles.burgerIngredients__header + " text text_type_main-large"}> Начинки </h2>
                <Ingredients type="main" data = {props.data || []} /> 
            </div>
            
        </section>
    );
};


const Tabs = () => {
    const [current, setCurrent] = React.useState('buns')
    return (
        <div className={styles.burgerIngredients__tabs + " mt-5"}>
            <a><Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
                Булки
            </Tab></a>
            <a><Tab value="suses" active={current === 'suses'} onClick={setCurrent}>
                Соусы
            </Tab></a>
            <a><Tab value="fillings" active={current === 'fillings'} onClick={setCurrent}>
                Начинки
            </Tab></a>
        </div>
    )
}

const Ingredients = (props) => {
    return (
        <ul className={styles.burgerIngredients__ingridients + " pl-1 pr-1 pt-6 pb-2"}>
            {props.data.map(element => {
                if (element.type === props.type) {
                    return <Element {...element} key = {element._id}/>
                }
            })}
        </ul>
    )
}

const Element = (props) => {
    const [count, setCount] = React.useState(0);
    return (
        <div className={styles.burgerIngredients__element + " mb-8 pl-3 pr-3"} key = {props._id}>
            {/*<Counter count={0} size="default" />*/}
            <img src={props.image} alt={props.name} className="burgerIngredients__picture" />
            <div className={styles.burgerIngredients__priceBox + " mt-1 mb-1"}>
                <p className={styles.burgerIngredients__price}>{props.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={styles.burgerIngredients__caption +  " text text_type_main-default"}>{props.name}</p>
        </div>
    )
}

export default BurgerIngredients;