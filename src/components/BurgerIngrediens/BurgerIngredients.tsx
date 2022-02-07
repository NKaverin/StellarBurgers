import { Tab, Counter, CurrencyIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './BurgerIngredients.module.css';

const  BurgerIngredients = () => {

    return (  
        <section className="burgerIngredients">
            <h1 className="burgerIngredients__header text text_type_main-large"> Соберите бургер </h1>
            {/* переключатель */}
            <Tub/>
            {/* ингредиенты */}
            <div>
                <h2 className="burgerIngredients__header text text_type_main-large"> Булки </h2>
                <div className="burgerIngredients__element">
                    <Counter count={1} size="default" />
                    <img src="" alt="" className="burgerIngredients__picture" />
                    <div className="burgerIngredients__price">
                        {20} <CurrencyIcon type="primary" />
                    </div>
                </div>
                <h2 className="burgerIngredients__header text text_type_main-large"> Соусы </h2>
                <h2 className="burgerIngredients__header text text_type_main-large"> Начинки </h2>
            </div>
        </section>
    );
};

const Tub = () => {
    const [current, setCurrent] = React.useState('buns')
    return (
        <div>
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


export default BurgerIngredients;