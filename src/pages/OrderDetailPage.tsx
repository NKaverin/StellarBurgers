import { useEffect } from 'react';
import styles from './pages.module.css';
import { useSelector, useDispatch } from '../services/hooks';
import { wsConnectionStart, wsConnectionClosed } from '../services/actions/ws';
import { useParams, useLocation }from 'react-router-dom';
import { fotmatDate, getStatusText } from '../utils/constants';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getCookie } from '../services/actions/user';

const OrderDetailPage = () => { 
    const dispatch = useDispatch();  
    const { id } = useParams();
    const orders = useSelector((state) => state.ws.orders);
    const getOrdersSuccess = useSelector((state) => state.ws.getOrdersSuccess);
    const order = orders.find((element) => element._id === id);
    const wsConnected = useSelector((state) => state.ws.wsConnected);
    const location = useLocation();
    const background = location.state && location.state.background;
    const ingredients = useSelector((state) => state.ingredients.items) || [];
    const activeProfile = (location.pathname.indexOf('/profile') === 0);  

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

    const ingredientsInOrder:Array<any> = [];
    if (order) {
        ingredients.forEach(element => {
            const count = order.ingredients.filter((e) => element._id === e).length;
            if ( count !== 0) {
                ingredientsInOrder.push({...element, count});
            };
        });
    }

    useEffect(
        () => {
            if (!background) {
                if (activeProfile) {
                    dispatch(wsConnectionStart(`?token=${getCookie('token')}`));
                }  else {
                    dispatch(wsConnectionStart('/all'));
                }
            }
        }, [dispatch]
    );

    useEffect(
        () => {
            return () => {
                if (wsConnected && !background) {
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
            <div className={styles.orderDetail__container + " pt-6 mb-6"}>
                <p className={styles.order__centered + " pt-5 text text_type_digits-default"}>{'#' + order.number}</p>
                <div>      
                    <p className="text text_type_main-default mb-3 mt-10">{order.name}</p>
                    <p className={getStatusColorClass(order.status) + " text text_type_main-small mb-15"}>{getStatusText(order.status)}</p>
                    <p className="text text_type_main-medium mb-6">Состав:</p>
                    <ul className={styles.orderDetail__ingredients}>
                        {ingredientsInOrder.map((element, index) => {
                            return (
                                <li className={styles.orderDetail__item  + ' mb-4 mr-6'} key ={index}>
                                    <img src={element.image} alt={element.name} className={styles.orderDetail__image}/>
                                    <p className="text text_type_main-default ml-4">{element.name}</p>
                                    <div className={styles.orderDetail__itemTotal}>
                                        <p className="text text_type_digits-default pl-4">{element.count}</p>
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