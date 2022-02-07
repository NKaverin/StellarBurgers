import './App.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngrediens/BurgerIngredients';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main className="page">
        <BurgerIngredients />
        <BurgerConstructor />    
      </main>
    </div>
  );
}

export default App;
