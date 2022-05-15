
import {  useState } from 'react';
import { useSelector, useDispatch } from '../services/hooks';
import { DndProvider } from "react-dnd";

import { useHistory, useLocation } from 'react-router-dom';
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from './pages.module.css';
import { closeIngredientDetails, showIngredientDetails } from '../services/actions/ingredientDetails';
import { postOrder, postOrderClose } from '../services/actions/orderReducer';
import BurgerIngredients from '../components/BurgerIngrediens/BurgerIngredients';
import BurgerConstructor from '../components/BurgerConstructor/BurgerConstructor';
import Modal from '../components/Modal/Modal';
import IngredientDetails from '../components/IngredientDetails/IngredientDetails';
import OrderDetails from '../components/OrderDetails/OrderDetails';

function HomePage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isVisibleOrder, setIsVisibleOrder] = useState<boolean>(false);
    const loggedIn = useSelector((state) => state.user.loggedIn);
    const location = useLocation();

    const item = useSelector((state) => state.ingredientDetails.ingredient);
    const data = useSelector((state) => state.order.ingredients);

    {/* открытие и закрытие  деталей ингредиента */}
    const openItem = (item) => {
        history.replace({ pathname: '/ingredients/' + item._id, state: { background: {...location, pathname: '/ingredients/' + item._id}}} );
        dispatch(showIngredientDetails(item));       
    }  
    const closeItem = () => {
        history.replace({ pathname: '/', state: { background: null }});
        dispatch(closeIngredientDetails(item));
    }

    {/* смена состояния для деталей заказа */}
    const closeOrder = () => {
        setIsVisibleOrder(!isVisibleOrder);
        dispatch(postOrderClose());
    }

    function openOrder () {
        
        if (loggedIn) {
            const dataForOrder: string[] = [];
            data.forEach(element =>{
                dataForOrder.push(element._id);
            })
            dispatch(postOrder(dataForOrder));
            setIsVisibleOrder(!isVisibleOrder);
        } else {
            history.replace({ pathname: '/login', state: { from: location.pathname } }); 
        }
    }

    return (
        <>
            <DndProvider backend={HTML5Backend}>
            <main className={styles.page + " pb-10 pt-10"}>
                {(<BurgerIngredients openHandler={openItem}/>)}
                {(<BurgerConstructor openHandler={openOrder}/>)} 
            </main>
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

export default HomePage;
