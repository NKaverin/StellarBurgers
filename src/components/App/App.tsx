import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngrediens/BurgerIngredients';
import { useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
const api = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
    const [data, setData] = useState(null); 
    const [item, setItem] = useState(null);
    const [isVisibleIngredient, setIsVisibleIngredient] = useState(false);
    const [isVisibleOrder, setIsVisibleOrder] = useState(false);
    
    {/* открытие и закрытие  деталей ингредиента */}
    const openItem = (item) => {
        setIsVisibleIngredient(true);
        setItem(item);
    }  
    const closeItem = () => {
        setIsVisibleIngredient(false);
        
        setItem(null);
    }

    {/* смена состояния для деталей заказа */}
    const doOrder = () => {
        setIsVisibleOrder(!isVisibleOrder);
    }

    {/* получаем данные */}
    useEffect(()=> {
        fetch(api)
            .then(res => {
                return res.json()
            })
            .then(data => {
                setData(data);
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <>
            <div className={styles.app + " pt-10"}>
                <AppHeader />
                <main className={styles.page + " pb-10 pt-10"}>
                    {data && <BurgerIngredients {...data} openHandler={openItem}/>}
                    {data && <BurgerConstructor {...data} openHandler={doOrder}/>}   
                </main>
            </div>
            {isVisibleIngredient && <Modal closeHandler={closeItem} title="Детали ингредиента">        
                {<IngredientDetails item={item} />} 
            </Modal>}
            {isVisibleOrder && <Modal closeHandler={doOrder}>        
                {<OrderDetails />} 
            </Modal>}
        </>
    );
}

export default App;
