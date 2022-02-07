import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';   

const  AppHeader = () => {
    return (  
        <header className={styles.header + " pt-4 pb-4"}>
            <nav className={styles.nav}>
                <ul className={styles.navNavigation}>
                    <li className={styles.navButton + " pl-5 pr-5"}>
                        <BurgerIcon type="primary" />
                        <p className="text text_type_main-large ml-2">Конструктор</p>
                    </li>
                    <li className={styles.navButton + " pl-5 pr-5 ml-2"}>
                        <ListIcon type="primary" />
                        <p className="text text_type_main-large ml-2 text_color_inactive">Лента заказов</p>                        
                    </li>
                </ul>   
            </nav>        
            <Logo />
            <nav className={styles.nav}>    
                <div className={styles.navButton + " pl-5 pr-5 ml-2"}>
                    <ProfileIcon type="primary" />
                    <p className="text text_type_main-large ml-2 text_color_inactive">Личный кабинет</p>
                </div>
            </nav>
        </header>
    );
};

export default AppHeader; 