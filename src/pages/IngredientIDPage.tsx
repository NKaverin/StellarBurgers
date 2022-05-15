import { useSelector } from '../services/hooks';
import { useParams, Redirect }from 'react-router-dom';
import styles from './pages.module.css'
import IngredientDetails from '../components/IngredientDetails/IngredientDetails'

const IngredientIDPage = () => {
    const { id } = useParams();  
    const items = useSelector((state) => state.ingredients.items);
    const item = items.find((element) => element._id === id);  

    // если ещё не подгрузились - возвращаем пустой ответ
    if (items.length === 0) {
        return (    
            <></>    
        ) 
    }
    
    if (item) return (    
        <div className={styles.ingredientMain}>
            <IngredientDetails item={item}/>
        </div>    
    )  

    return (<Redirect to='/404'/>)
};

export default IngredientIDPage; 