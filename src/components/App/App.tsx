import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngrediens/BurgerIngredients';
import {  useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { RootState } from '../../services/redusers/rootReduser';
import { closeIngredientDetails, showIngredientDetails } from '../../services/actions/ingredientDetails';
import { postOrder } from '../../services/actions/orderReducer';

function App() {
    const dispatch = useDispatch();
    const [isVisibleOrder, setIsVisibleOrder] = useState(false);

    const item = useSelector((state:RootState) => state.ingredientDetails.ingredient);
    const data = useSelector((state:RootState) => state.order.ingredients);

    {/* открытие и закрытие  деталей ингредиента */}
    const openItem = (item) => {
        dispatch(showIngredientDetails(item));
    }  
    const closeItem = () => {
        dispatch(closeIngredientDetails(item));
    }

    {/* смена состояния для деталей заказа */}
    const closeOrder = () => {
        setIsVisibleOrder(!isVisibleOrder);
    }

    function openOrder () {
        const dataForOrder: string[] = [];
        data.forEach(element =>{
            dataForOrder.push(element._id);
        })
        dispatch(postOrder(dataForOrder));
        setIsVisibleOrder(!isVisibleOrder);
    }

    {/* получаем данные */}
    useEffect(() => {
        dispatch(getIngredients);
    }, []);

    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <div className={styles.app + " pt-10"}>
                    <AppHeader />
                    <main className={styles.page + " pb-10 pt-10"}>
                        {(<BurgerIngredients openHandler={openItem}/>)}
                        {(<BurgerConstructor openHandler={openOrder}/>)}   
                    </main>
                </div>
            </DndProvider>
            {item && (<Modal closeHandler={closeItem} title="Детали ингредиента">       
                <IngredientDetails item={item} />
            </Modal>)}
            {isVisibleOrder && (<Modal closeHandler={closeOrder}>        
                {<OrderDetails />} 
            </Modal>)}
        </>
    );
}

export default App;
