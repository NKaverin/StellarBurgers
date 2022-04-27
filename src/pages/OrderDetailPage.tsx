import { useEffect } from 'react';
import styles from './pages.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../services/redusers/rootReduser";
import { wsConnectionStart, wsConnectionClosed } from '../services/actions/ws';
import { useParams }from 'react-router-dom';
import { fotmatDate, getStatusText } from '../utils/constants';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderDetailPage = () => { 
    const dispatch = useDispatch();  
    const { id } = useParams();
    const orders = useSelector((state:RootState) => state.ws.orders);
    const getOrdersSuccess = useSelector((state:RootState) => state.ws.getOrdersSuccess);
    const order = orders.find((element) => element._id === id);
    const wsConnected = useSelector((state:RootState) => state.ws.wsConnected);

    const ingredients = useSelector((state:RootState) => state.ingredients.items);

    const sumOrderPrice = (ingredientsInOrder) => {    
        return ingredientsInOrder.reduce((total, element) => { return total + ingredients.filter((e) => element === e._id)[0].price}, 0);
    }

    const getStatusColorClass = (status) => {
        if (status === 'pending' || status === 'created') {
            return '';
        }
        if (status === 'done') {
            return styles.orderDone;
        }
        return styles.orderCanceled;
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

    if (!getOrdersSuccess || !order) {
        return null;
    } else {
        return (
        <div className={styles.orderDetail__wrapper}>
            <div className={styles.orderDetail__container + " mt-6 mb-6"}>
                <p className={styles.order__centered + " text text_type_digits-default"}>{'#' + order.number}</p>
                <div>      
                    <p className="text text_type_main-medium mb-3 mt-10">{order.name}</p>
                    <p className={getStatusColorClass(order.status) + " text text_type_main-small mb-15"}>{getStatusText(order.status)}</p>
                    <p className="text text_type_main-medium mb-6">Состав:</p>
                    <ul className={styles.orderDetail__ingredients}>
                        {order.ingredients.map((orderIngredient, index) => {
                            const element = ingredients.filter((e) => orderIngredient === e._id)[0];
                            return (
                                <li className={styles.orderDetail__item  + ' mb-4 mr-6'} key ={index}>
                                    <img src={element.image} alt={element.name} className={styles.orderDetail__image}/>
                                    <p className="text text_type_main-default ml-4">{element.name}</p>
                                    <div className={styles.orderDetail__itemTotal}>
                                        <p className="text text_type_digits-default pl-4">{1}</p>
                                        <p className="text text_type_digits-default">x</p>
                                        <p className="text text_type_digits-default">{element.price}</p>
                                        <CurrencyIcon type="primary" />
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    <div className={styles.orderDetail__total  + ' mt-10'}>
                        <p className="text text_type_main-small text_color_inactive">{fotmatDate(order.createdAt)}</p>
                        <p className={styles.orderDetail__totalPrice  + " text text_type_digits-default mr-2"}>{sumOrderPrice(order.ingredients)}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </div> 
        )
    }

}

export default OrderDetailPage;