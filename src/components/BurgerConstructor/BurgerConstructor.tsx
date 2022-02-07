import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
const img = '';
const  BurgerConstructor = () => {
    return (  
        <section className={styles.burgerConstructor}>
            {/* отдельно верх булки*/}
            <ConstructorElement
                type="top"
                isLocked={true}
                text="Краторная булка N-200i (верх)"
                price={200}
                thumbnail={img}
            />
            {/* содержимое*/}
            <ConstructorElement
                text="Краторная булка N-200i (верх)"
                price={50}
                thumbnail={img}
            />
            {/* отдельно низ булки*/}
            <ConstructorElement
                type="bottom"
                isLocked={true}
                text="Краторная булка N-200i (низ)"
                price={200}
                thumbnail={img}
            />
            <div className="burgerConstructor__totalPrice">
                <CurrencyIcon type="primary" />
                {200}
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>      
    );
};

export default BurgerConstructor;