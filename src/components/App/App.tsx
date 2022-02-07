import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngrediens/BurgerIngredients';

function App() {
    return (
        <div className={styles.app}>
        <AppHeader />
        <main className={styles.page}>
            <BurgerIngredients />
            <BurgerConstructor />    
        </main>
        </div>
    );
}

export default App;
