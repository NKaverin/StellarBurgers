import { Button, BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';   

const  AppHeader = () => {
    return (  
        <header className={styles.header}>
            <nav className={styles.headerContainer}>
                <Button  type="primary" size="medium">
                    <BurgerIcon type="primary" />
                    <p className="text text_type_main-large">Конструктор</p>
                </Button>
                <Button  type="primary" size="medium">
                    <ListIcon type="primary" />
                    <p className="text text_type_main-large">Лента заказов</p>
                </Button>
                <Button type="primary" size="medium">
                <Logo />
                </Button>
                <Button  type="primary" size="medium">
                    <ProfileIcon type="primary" />
                    <p className="text text_type_main-large">Личный кабинет</p>
                </Button>
            </nav>

        </header>
    );
};

export default AppHeader; 