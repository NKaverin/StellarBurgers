import { BrowserRouter as Router }from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import RouteSwitch from '../RouteSwitch/RouteSwitch'
import styles from './App.module.css';

const App = () => {   

    return (
        <Router>
            <div className={styles.app + " pt-10"}>
                <AppHeader />
                <RouteSwitch />
            </div>
        </Router>
        
    );
}

export default App;


