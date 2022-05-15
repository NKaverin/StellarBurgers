import styles from './OrderDetails.module.css';
import successImg from '../../images/graphics.svg'
import { useSelector } from '../../services/hooks';

const OrderDetails = () => {
    const orderId = useSelector((state) => state.order.orderId);
    return (
        <div className={styles.orderDetails}>
            <p className="text text_type_digits-large">{orderId}</p>
            <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
            <img src={successImg} alt="галочка, показывающая, что заказ принят" className="mt-15"/>
            <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive mt-2 mb-30">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails;