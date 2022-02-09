import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngrediens/BurgerIngredients';
import { useEffect, useState } from 'react';

function App() {
    const [data, setData] = useState(null); 
    useEffect(()=> {
        fetch('https://norma.nomoreparties.space/api/ingredients')
            .then(res => {
                return res.json()
            })
            .then(data => {
                setData(data);
            })
            .catch(err => console.log(err))
    }, []);
    return (
        <div className={styles.app + " pt-10"}>
            <AppHeader />
            <main className={styles.page + " pb-10 pt-10"}>
                {data && <BurgerIngredients {...data} />}
                {data && <BurgerConstructor {...data} />}   
            </main>
        </div>
    );
}

export default App;
