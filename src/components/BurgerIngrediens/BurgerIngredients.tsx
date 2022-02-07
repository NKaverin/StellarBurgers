import { Tab, Counter, CurrencyIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './BurgerIngredients.module.css';
import data from '../../utils/data';
const  BurgerIngredients = () => {

    return (  
        <section className={styles.burgerIngredients + " mr-5"}>
            <h1 className="text text_type_main-large mt-10"> Соберите бургер </h1>
            {/* переключатель */}
            <Tabs/>
            {/* ингредиенты */}
            <div className={styles.burgerIngredientsSet + " mt-10"}>
                <h2 className="burgerIngredients__header text text_type_main-large"> Булки </h2>
                <Ingredients type="bun" />
                <h2 className="burgerIngredients__header text text_type_main-large"> Соусы </h2>
                <Ingredients type="main" />
                <h2 className="burgerIngredients__header text text_type_main-large"> Начинки </h2>
                <Ingredients type="sause" />
            </div>
        </section>
    );
};

const Tabs = () => {
    const [current, setCurrent] = React.useState('buns')
    return (
        <div className={styles.burgerIngredientsTubs + " mt-5"}>
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
        <div className={" mt-6 mb-10"}>
            {data.map(element => {
                if (element.type === props.type) {
                    return <Element {...element} key = {element._id} />
                }
            })}
        </div>
    )
}

const Element = (props) => {
    const [count, setCount] = React.useState(0);
    return (
        <div className="burgerIngredients__element">
            {/*<Counter count={0} size="default" />*/}
            <img src={props.image} alt={props.name} className="burgerIngredients__picture" />
            <div className="burgerIngredients__price">
                <p>{props.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={ " text text_type_main-default"}>{props.name}</p>
        </div>
    )
}

export default BurgerIngredients;