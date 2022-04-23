import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect }from 'react-router-dom';
import styles from './pages.module.css'
import IngredientDetails from '../components/IngredientDetails/IngredientDetails'
import { RootState } from '../services/redusers/rootReduser';
import { useEffect } from 'react';
import { getIngredients } from '../services/actions/ingredients';

const IngredientIDPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();  
    const items = useSelector((state:RootState) => state.ingredients.items);
    const item = items.find((element) => element._id === id);  
    console.log('asd')
    useEffect(() => {
        dispatch(getIngredients);
    }, []);

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