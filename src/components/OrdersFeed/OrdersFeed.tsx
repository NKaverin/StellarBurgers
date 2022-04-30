import styles from './/OrdersFeed.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { fotmatDate, getStatusText } from '../../utils/constants';
import { RootState } from '../../services/redusers/rootReduser';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { wsConnectionClosed, wsConnectionStart } from '../../services/actions/ws';
import { getCookie } from '../../services/actions/user';


const OrdersFeed = () => {
    const dispatch = useDispatch();
    const wsConnected = useSelector((state:RootState) => state.ws.wsConnected);
    const location = useLocation();
    const history = useHistory();
    
    const orders = useSelector((state:RootState) => state.ws.orders);
    const getOrdersSuccess = useSelector((state:RootState) => state.ws.getOrdersSuccess);

    const activeProfile = (location.pathname.indexOf('/profile') === 0);  
    const ingredients = useSelector((state:RootState) => state.ingredients.items);

    const onClick = (order_id) => {
        if (activeProfile) {
            history.replace({pathname: 'orders/' + order_id, state: { background: location } });
        }  else {
            history.replace({pathname: 'feed/' + order_id, state: { background: location } });
        }
    }

    const sumOrderPrice = (ingredientsInOrder) => {    
        return ingredientsInOrder.reduce((total, element) => { return total + ingredients.filter((e) => element === e._id)[0].price}, 0);
    }

    const getStatusColorClass = (status) => {
        if (status === 'done' || status === 'created') {
            return '';
        }
        if (status === 'pending') {
            return styles.orderDone;
        }
        return styles.orderCanceled;
    }

    useEffect(
        () => {
            return () => {
                if (wsConnected) {          
                    dispatch(wsConnectionClosed())
                }        
            }
        }, [wsConnected, dispatch]
    );

    const init = async () => {
        if (activeProfile) {
            await dispatch(wsConnectionStart(`?token=${getCookie('token')}`));
        }  else {
            await dispatch(wsConnectionStart('/all'));
        }       
    };

    useEffect(() => {
        init();
    }, []);

    if (!getOrdersSuccess) {
        return null;
    } else {
        return (
                <div>
                    <h2 className='text text_type_main-large mb-5 ml-5'>Лента заказов</h2>
                    <div className={styles.ordersFeed}>
                        {orders.map((order) => {
                            return (
                                <div className={styles.ordersFeed__order + ' p-6 ml-5 mr-2 mb-6'} onClick={() => {return onClick(order._id)}} key={order._id}>
                                    <div className={styles.ordersFeed__orderDetails + ' mb-6'}>
                                        <p className='text text_type_digits-default'>{'#'+order.number}</p>
                                        <p className='text text_type_main-default text_color_inactive'>{fotmatDate(order.createdAt)}</p>
                                    </div>
                                    <p className='text text_type_main-medium'>{order.name}</p>
                                    {activeProfile && (<p className={getStatusColorClass(order.status) + ' text text_type_main-default mt-2'} >{getStatusText(order.status)}</p>)}
                                    <div className={styles.ordersFeed__iconsContainer + ' mt-6'}>
                                        <div className={styles.ordersFeed__icons}>             
                                            {order.ingredients.map((orderIngredient, index) => {
                                                const element = ingredients.filter((e) => orderIngredient === e._id)[0];
                                                if (index > 0 && index <= 5) {
                                                    return (<img className={styles.ordersFeed__image + ' ' + ((index === 0) ? '' : styles.ordersFeed__imageShifted)} src={element.image} alt={element.name} key={index}/>)
                                                }
                                                if (index === 0 && order.ingredients.length > 5) {
                                                    return (<div className={styles.ordersFeed__imageContainer} key={index}>
                                                        <img className={styles.ordersFeed__image + ' ' + styles.ordersFeed__imageShifted + ' ' + (order.ingredients.length > 5 ?  styles.ordersFeed__blured : '')} src={element.image} alt={element.name} key={index}/>
                                                        <p className={styles.ordersFeed__imageText + ' text text_type_digits-default'}>{'+' + (order.ingredients.length - 5)}</p>
                                                    </div>)
                                                }  
                                                if (index === 0 && order.ingredients.length <= 5) {
                                                    return (<div className={styles.ordersFeed__imageContainer} key={index}>
                                                        <img className={styles.ordersFeed__image + ' ' + styles.ordersFeed__imageShifted + ' ' + (order.ingredients.length > 5 ?  styles.ordersFeed__blured : '')} src={element.image} alt={element.name} key={index}/>
                                                    </div>)
                                                }  
                                            })}
                                        </div>
                                        <div className={styles.ordersFeed__price + ' ml-6'}>
                                            <p className='text text_type_digits-default mr-2'>{sumOrderPrice(order.ingredients)}</p>
                                            <CurrencyIcon type="primary" />
                                        </div>
                                    </div>
                                </div>)
                            })
                        }
                    </div>
                </div>  
        )
    }
}

export default OrdersFeed;