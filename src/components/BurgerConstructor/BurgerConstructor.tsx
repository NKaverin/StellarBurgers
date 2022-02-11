import {  ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import PropTypes from 'prop-types';
import propTypesOfDataElement from '../../utils/propTypesOfDataElement';

const  BurgerConstructor = (props) => {
    {/* берем первую булку из данных*/}
    const bun =  props.data.filter((element) => element.type === 'bun')[0];

    return (  
        <section className={styles.burgerConstructor + " ml-5 pt-25"}>
            {/* отдельно верх булки*/}
            <div className={styles.burgerConstructor__bun + " pl-8"}>
                <ConstructorElement 
                    isLocked={true}
                    text={bun.name + " (верх)"}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            </div>
            {/* содержимое*/}
            <ul className={styles.burgerConstructor__ingredients + " "}>   
                {props.data.map( element => {
                    if (element.type !== 'bun') {
                        return (
                            <li className={styles.burgerConstructor__element + " mt-4" } key={element._id}>
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    text= {element.name}
                                    price={element.price}
                                    thumbnail={element.image}
                                    
                                />
                            </li>
                        )
                    }
                })}
            </ul>
            {/* отдельно низ булки*/}
            <div className={styles.burgerConstructor__bun + " pl-8 mt-4"}>
                <ConstructorElement 
                    isLocked={true}
                    text={bun.name + " (низ)"}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            </div>
            {/* подвал*/}
            <div className={styles.burgerConstructor__total + " mt-10 mr-10"}>
                <p className="text text_type_digits-medium mr-2">200</p>
                <CurrencyIcon type="primary" />
                <div className="ml-10" onClick={props.openHandler}>
                    <Button type="primary" size="medium">
                        Оформить заказ
                    </Button>   
                </div>
        
            </div>
        </section>      
    );
};


BurgerConstructor.propTypes = {
    openHandler: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    element: propTypesOfDataElement
}

export default BurgerConstructor;