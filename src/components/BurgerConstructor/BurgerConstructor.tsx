import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import data from '../../utils/data';
import styles from './BurgerConstructor.module.css';

const img = 'https://code.s3.yandex.net/react/code/bun-02.png';
const  BurgerConstructor = (props) => {
    return (  
        <section className={styles.burgerConstructor + " ml-5 pt-25"}>
            {/* отдельно верх булки*/}
            <div className={styles.burgerConstructor__bun + " pl-8"}>
                <ConstructorElement 
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={img}
                />
            </div>
            {/* содержимое*/}
            <ul className={styles.burgerConstructor__ingredients + " "}>   
                {props.data.map( element => {
                return (
                    <li className={styles.burgerConstructor__element + " mt-4" } key={element._id}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text= {element.name}
                            price={element.price}
                            thumbnail={element.image}
                            
                        />
                    </li>
                )})}
            </ul>
            {/* отдельно низ булки*/}
            <div className={styles.burgerConstructor__bun + " pl-8 mt-4"}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={img}
                />
            </div>
            {/* подвал*/}
            <div className={styles.burgerConstructor__total + " mt-10 mr-10"}>
                <p className="text text_type_digits-medium mr-2">200</p>
                <CurrencyIcon type="primary" />
                <div className={styles.burgerConstructor__button + " pl-5 pr-5 ml-10"}>
                    <p className="text text_type_main-medium ml-2">Оформить заказ</p>
                </div>
            </div>
        </section>      
    );
};

export default BurgerConstructor;