import { useEffect } from 'react';
import styles from './pages.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../services/redusers/rootReduser";
import { wsConnectionStart, wsConnectionClosed } from '../services/actions/ws';
import { useParams }from 'react-router-dom';
import { fotmatDate, getStatusText } from '../utils/constants';

const OrderDetailPage = () => { 
    const dispatch = useDispatch();  
    const { id } = useParams();
    const orders = useSelector((state:RootState) => state.ws.orders);
    const getOrdersSuccess = useSelector((state:RootState) => state.ws.getOrdersSuccess);
    const order = orders.find((element) => element._id === id);
    const wsConnected = useSelector((state:RootState) => state.ws.wsConnected);

    const ingredients = useSelector((state:RootState) => state.ingredients.items);;
    const ingredientsInOrder = ingredients.filter((element) => order.ingredients.includes(element._id)).map((element) => element && {...element, __v: order.ingredients.filter(id => id===element._id).length});  

    const sumOrderPrice = () => {
        return ingredientsInOrder.reduce((total, element) => { return total + element.price }, 0)
    }

    useEffect(
        () => {
            dispatch(wsConnectionStart());
        }, [dispatch]
    );

    useEffect(
        () => {
            return () => {
                if (wsConnected) {
                    dispatch(wsConnectionClosed())
                }
            }
        }, [wsConnected, dispatch]
    )

    if (!getOrdersSuccess) {
        return null;
    }

    if (getOrdersSuccess) {
        return (
        <div className={styles.wrapper}>
            <p className={styles.aaaaaa + " text text_type_digits-default"}>{'#' + order.number}</p>
            <div className={styles.container}>      
                <p className="text text_type_main-medium mb-3 mt-10">{order.name}</p>
                <p className="text text_type_main-small mb-15">{getStatusText(order.status)}</p>
                <p className="text text_type_main-medium mb-6">Состав:</p>
                <ul className={styles.ingredients}>
                    {ingredientsInOrder.map((element, index) => {
                        <li className={styles.ingredients__item + ' mb-4 mr-6'} key ={index}>
                            <img src={element.image} alt={element.name} className={styles.image}/>
                            <p className="text text_type_main-default ml-4">{element.name}</p>
                            <div className={styles.ingredients__total}>
                                <p className="text text_type_digits-default pl-4">{element.__v}</p>
                                <p className="text text_type_digits-default">x</p>
                                <p className="text text_type_digits-default">{element.price}</p>
                                <CurrencyIcon type="primary" />
                            </div>
                        </li>
                    })}
                </ul>
                <div className={styles.horizontalWrapper + ' mt-10'}>
                    <p className="text text_type_main-small text_color_inactive">{fotmatDate(order.createdAt)}</p>
                    <p className={styles.ingredients__total + " text text_type_digits-default mr-2"}>{sumOrderPrice()}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div> 
        )
    }

}

export default OrderDetailPage;