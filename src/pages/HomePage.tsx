
import {  useEffect, useState } from 'react';
import { useDispatch, useSelector, useHistory, useLocation } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from './pages.module.css';
import { RootState } from '../services/redusers/rootReduser';
import { closeIngredientDetails, showIngredientDetails } from '../services/actions/ingredientDetails';
import { postOrder } from '../services/actions/orderReducer';
import { getIngredients } from '../services/actions/ingredients';
import BurgerIngredients from '../components/BurgerIngrediens/BurgerIngredients';
import BurgerConstructor from '../components/BurgerConstructor/BurgerConstructor';
import Modal from '../components/Modal/Modal';
import IngredientDetails from '../components/IngredientDetails/IngredientDetails';
import OrderDetails from '../components/OrderDetails/OrderDetails';

function HomePage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isVisibleOrder, setIsVisibleOrder] = useState(false);
    const loggedIn = useSelector((state:RootState) => state.user.loggedIn);
    const location = useLocation();

    const item = useSelector((state:RootState) => state.ingredientDetails.ingredient);
    const data = useSelector((state:RootState) => state.order.ingredients);

    {/* открытие и закрытие  деталей ингредиента */}
    const openItem = (item) => {
        history.replace({ pathname: '/', state: { background: location }});
        dispatch(showIngredientDetails(item));
    }  
    const closeItem = () => {
        history.goBack();
        dispatch(closeIngredientDetails(item));
    }

    {/* смена состояния для деталей заказа */}
    const closeOrder = () => {
        setIsVisibleOrder(!isVisibleOrder);
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
            // нужно сохранить путь в куки и перейти на логин
            history.replace({ pathname: '/login' });
        }
    }

    {/* получаем данные */}
    useEffect(() => {
        dispatch(getIngredients);
    }, []);

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
