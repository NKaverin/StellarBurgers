import styles from './pages.module.css';
import { useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { RootState } from "../services/redusers/rootReduser";
import { fotmatDate } from '../../utils/constants';

const OrdersFeed = () => {
    const location = useLocation();
    const history = useHistory();
    
    const orders = useSelector((state:RootState) => state.ws.orders);
    const getOrdersSuccess = useSelector((state:RootState) => state.ws.getOrdersSuccess);

    const ingredients = useSelector((state:RootState) => state.ingredients.items);

    // клик на заказ
    const onClick = (order_id) => {
        history.replace({pathname: 'path' + order_id, state: { background: location } });
    }
    
    const ingredientsInOrder = ingredients.filter((element) => order.ingredients.includes(element._id)).map((element) => element && {...element, __v: order.ingredients.filter(id => id===element._id).length});
    //
    console.log(ingredientsInOrder);

    const sumOrderPrice = () => {    
        return ingredientsInOrder.reduce((total, element) => { console.log(element); return total + element.price}, 0);
    }

    if (!getOrdersSuccess) {
        return null; 
    }

    return (
            <div className={styles.wrapper}>
                <h2 className='text text_type_main-large mt-10 mb-5 ml-5'>Лента заказов</h2>
                <div className={styles.container}>
                    {orders.map((order) => {
                            <div className={styles.order + ' p-6 ml-5 mr-2 mb-6'} onClick={onClick}>
                                <div className={styles.order__detail + ' mb-6'}>
                                    <p className='text text_type_digits-default'>{'#'+order.number}</p>
                                    <p className='text text_type_main-default text_color_inactive'>{fotmatDate(order.createdAt)}</p>
                                </div>
                                <p className='text text_type_main-medium'>{order.name}</p>
                                <div className={styles.order__iconsContainer + ' mt-6'}>
                                    <div className={styles.order__icons}>             
                                        {ingredientsInOrder.map((element, index) => {return (<img src={element.image} alt={element.name} className={styles.order__icon + ' ' + styles.order__iconPosition} key={index}/>)})}
                                    </div>
                                    <div className={styles.order__price + ' ml-6'}>
                                        <p className='text text_type_digits-default mr-2'>{sumOrderPrice()}</p>
                                        <CurrencyIcon type="primary" />
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>  
    )
}

export default OrdersFeed;