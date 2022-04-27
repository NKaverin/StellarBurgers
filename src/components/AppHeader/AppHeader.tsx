import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';   
import { useHistory, useLocation } from 'react-router-dom';

const  AppHeader = () => {
    const history = useHistory();
    const location = useLocation();
    const activeHome = (location.pathname === '/');
    const activeFeed = (location.pathname.indexOf('/feed') === 0);
    const activeProfile = (location.pathname.indexOf('/profile') === 0);  

    return (  
        <header className={styles.header + " pt-4 pb-4"}>
            {/* левая часть*/}
            <nav className={styles.nav}>
                <ul className={styles.nav__navigation}>
                    <li className={styles.nav__buttonWrapper + " pl-5 pr-5"}>
                        <button className={styles.nav__button} onClick={() => history.replace({ pathname: '/' })}>
                            <BurgerIcon type={activeHome ? "primary" : "secondary"} />
                            <p className={activeHome ? "text text_type_main-default ml-2" : "text text_type_main-default ml-2 text_color_inactive"}>
                                Конструктор
                            </p>
                        </button>
                    </li>
                    <li className={styles.nav__buttonWrapper + " "}>
                        <button className={styles.nav__button} onClick={() => history.replace({ pathname: '/feed' })}>
                            <ListIcon type={activeFeed ? "primary" : "secondary"} />
                            <p className={activeFeed ? "text text_type_main-default ml-2" : "text text_type_main-default ml-2 text_color_inactive"}>
                                Лента заказов
                            </p>    
                        </button>                    
                    </li>
                </ul>   
            </nav>        
            <button className={styles.nav__button} onClick={() => history.replace({ pathname: '/' })}>
                <Logo />
            </button>     
            {/* правая часть*/}
            <nav className={styles.nav}>     
                <div className={styles.nav__buttonWrapper}>
                    <button className={styles.nav__button + ' pl-5 pr-5 ml-2'} onClick={() => history.replace({ pathname: '/profile' })}>
                        <ProfileIcon type={activeProfile ? "primary" : "secondary"} />
                        <p className={activeProfile ? "text text_type_main-default ml-2" : "text text_type_main-default ml-2 text_color_inactive"}>
                            Личный кабинет
                        </p>
                    </button> 
                </div>
            </nav>
        </header>
    );
};

export default AppHeader; 