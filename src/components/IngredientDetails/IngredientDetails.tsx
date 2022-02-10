import styles from './IngredientDetails.module.css';
import PropTypes from 'prop-types';

const IngredientDetails = ({ item }) => {
    return (
        <div className={styles.ingredientDetails}>
            <img src={item.image_large} alt={item.name} />
            <p className="text text_type_main-medium mt-4">{item.name}</p>
            <ul className={styles.ingredientDetails__info + " mt-8 mb-15"}>
                <li className={styles.ingredientDetails__infoItem}>
                    <p className="text text_type_main-small text_color_inactive">Калории,ккал</p>
                    <p className="text text_type_digits-default text_color_inactive mt-2">{item.calories}</p>
                </li>
                <li className={styles.ingredientDetails__infoItem + " ml-5"}>
                    <p className="text text_type_main-small text_color_inactive">Белки, г</p>
                    <p className="text text_type_digits-default text_color_inactive mt-2">{item.calories}</p>
                </li>
                <li className={styles.ingredientDetails__infoItem + " ml-5"}>
                    <p className="text text_type_main-small text_color_inactive">Жиры, г</p>
                    <p className="text text_type_digits-default text_color_inactive mt-2">{item.calories}</p>
                </li>
                <li className={styles.ingredientDetails__infoItem + " ml-5"}>
                    <p className="text text_type_main-small text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_digits-default text_color_inactive mt-2">{item.calories}</p>
                </li>
            </ul>
        </div>
    )
}

IngredientDetails.propTypes = {  
    item: PropTypes.element
}

export default IngredientDetails;