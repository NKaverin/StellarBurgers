import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useRef, useState } from 'react';
import styles from './BurgerIngredients.module.css';
import PropTypes from 'prop-types';
import propTypesOfDataElement from '../../utils/propTypesOfDataElement';
import { useSelector } from "react-redux";
import { RootState } from '../../services/redusers/rootReduser';
import { useDrag } from 'react-dnd';

const  BurgerIngredients = ({ openHandler }) => {
    const data = useSelector((state:RootState) => state.ingredients.items);
    const [current, setCurrent] = useState("buns");
    const orderData = useSelector((state:RootState) => state.order.ingredients);
    // скрол к группе
    const buns = useRef(null);
    const suses = useRef(null);
    const fillings = useRef(null);
    function goTo(ref) {
        ref.current.scrollIntoView({behavior: "smooth"})
    }  

    // отвечает за смену активного таба
    function tabOnScreen() {
        let options = {
            root: document.querySelector('.burgerIngredients__container'),
            rootMargin: '0px 0px -60% 0px',
            threshold: 0.1
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting ) {
                    switch (entry.target.id) {
                        case 'fillings': {
                            setCurrent('fillings');
                            break;
                        }
                        case 'suses': {
                            setCurrent('suses');
                            break;
                        }
                        case 'buns': {
                            setCurrent('buns');
                            break;
                        }
                    }
                }
            })
        }, options)

        observer.observe(document.querySelector('#fillings') as HTMLElement);
        observer.observe(document.querySelector('#suses') as HTMLElement);
        observer.observe(document.querySelector('#buns') as HTMLElement);
        
    }

    useEffect(() => {
        setTimeout(tabOnScreen, 200)
    },[])

    return (  
        <section className={styles.burgerIngredients + " mr-5"}>
            <h1 className="text text_type_main-large mt-10"> Соберите бургер </h1>
            {/* переключатель */}
            <div className={styles.burgerIngredients__tabs + " mt-5"}>
                <a><Tab  value="buns" active={current === "buns"} onClick={() => goTo(buns)}>
                    Булки
                </Tab></a>
                <a><Tab value="suses" active={current === "suses"} onClick={() => goTo(suses)}>
                    Соусы
                </Tab></a>
                <a><Tab value="fillings" active={current === "fillings"} onClick={() => goTo(fillings)}>
                    Начинки
            </Tab></a>
            </div>
            {/* ингредиенты */}
            <div className={styles.burgerIngredients__container + " mt-10"}>    
                <h2 className={styles.burgerIngredients__header + " text text_type_main-medium" } id = 'buns' ref={buns}> Булки </h2>
                <Ingredients type="bun" data = {data} openHandler = {openHandler} orderData = {orderData} />
                <h2 className={styles.burgerIngredients__header + " text text_type_main-medium"} id = 'suses' ref={suses}> Соусы </h2>
                <Ingredients type="sauce" data = {data} openHandler = {openHandler} orderData = {orderData}/>
                <h2 className={styles.burgerIngredients__header + " text text_type_main-medium"} id = 'fillings' ref={fillings}> Начинки </h2>
                <Ingredients type="main" data = {data} openHandler = {openHandler} orderData = {orderData}/> 
            </div>
        </section>
    );
};


const Ingredients = ({ data, type, openHandler, orderData }) => {
    return (
        <ul className={styles.burgerIngredients__ingridients + " pl-1 pr-1 pt-6 pb-2"}>
            {data.filter(element => element.type === type).map(element => {
                return <Element {...element} key = {element._id} openHandler = {openHandler} counter = {orderData.filter(orderElement => element._id === orderElement._id).length}/>
            })}
        </ul>
    )
}

const Element = (props) => {
    const [, dragRef] = useDrag({
        type: 'ingredient',  
        item: props,
    });

    return (
        <div className={styles.burgerIngredients__element + " mb-8 pl-3 pr-3"} key = {props._id} onClick={() => props.openHandler(props)} ref={dragRef}>
            {props.counter !== 0 && (<div className={styles.burgerIngredients__counter}>
                <Counter count={props.counter} size="default" />
            </div>)}
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
    element: propTypesOfDataElement
}

Element.propTypes = {
    openHandler: PropTypes.func.isRequired,
    element: propTypesOfDataElement,
    counter: PropTypes.number
}

Ingredients.propTypes = {
    openHandler: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
}

export default BurgerIngredients;