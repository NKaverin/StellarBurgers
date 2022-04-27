import { useEffect } from 'react';
import styles from './pages.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../services/redusers/rootReduser";
import { wsConnectionStart, wsConnectionClosed } from '../services/actions/ws';
import OrdersFeed from '../components/OrdersFeed/OrdersFeed';


const FeedPage = () => {
    const dispatch = useDispatch();
    const wsConnected = useSelector((state:RootState) => state.ws.wsConnected);
    const orders = useSelector((state:RootState) => state.ws.orders);
    const getOrdersSuccess = useSelector((state:RootState) => state.ws.getOrdersSuccess);
    const total = useSelector((state:RootState) => state.ws.total);
    const totalToday = useSelector((state:RootState) => state.ws.totalToday);


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
    );

    if (!getOrdersSuccess) {
        return null; 
    }

    return (   
        <div className={styles.horizontalWrapper}>     
            <OrdersFeed />    
            <div className={styles.orderNumbers + ' ml-15'}>
                <div className={styles.orderNumbers__horizontal + ' mb-15'}>
                    <div className={styles.orderNumbers + ' mr-9'}>
                        <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
                        <ul className={styles.sideMenu__list}>
                            {orders.filter((order) => order.status === 'done').map((order, index) => {
                                if (index <15) {
                                    return (<li className={styles.orderDone + " text text_type_digits-default mr-2"} key={index}>{order.number}</li>)  
                                }
                            })}
                        </ul>
                    </div>
                    <div className={styles.orderNumbers}>
                        <h3 className="text text_type_main-medium mb-6">В работе:</h3>
                        <ul className={styles.sideMenu__list}>
                            {orders.filter((order) => order.status === 'pending').map((order, index) => {
                                return (<li className="text text_type_digits-default mr-2" key={index}>{order.number}</li>)             
                            })}
                        </ul>
                    </div>
                </div>
                <h3 className="text text_type_main-medium mt-15">Выполнено за все время:</h3>
                <p className="text text_type_digits-large mb-15">{total}</p>
                <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
                <p className="text text_type_digits-large">{totalToday}</p>
            </div>
                    
        </div>    

    )
}

export default FeedPage;