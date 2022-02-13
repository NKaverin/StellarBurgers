import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';   

const  AppHeader = () => {
    return (  
        <header className={styles.header + " pt-4 pb-4"}>
            {/* левая часть*/}
            <nav className={styles.nav}>
                <ul className={styles.nav__navigation}>
                    <li className={styles.nav__button + " pl-5 pr-5"} key = {1}>
                        <BurgerIcon type="primary" />
                        <p className="text text_type_main-default ml-2">Конструктор</p>
                    </li>
                    <li className={styles.nav__button + " pl-5 pr-5 ml-2"} key = {2}>
                        <ListIcon type="secondary" />
                        <p className="text text_type_main-default ml-2 text_color_inactive">Лента заказов</p>                        
                    </li>
                </ul>   
            </nav>        
            <Logo />
            {/* правая часть*/}
            <nav className={styles.nav}>    
                <div className={styles.nav__button + " pl-5 pr-5 ml-2"}>
                    <ProfileIcon type="secondary" />
                    <p className="text text_type_main-default ml-2 text_color_inactive">Личный кабинет</p>
                </div>
            </nav>
        </header>
    );
};

export default AppHeader; 