import styles from './pages.module.css';

const NotFoundPage = () => {
    return (  
        <div className={styles.wrapper}>
            <p className={styles.mainText + ' text text_type_main-large mt-20'}>
                Что-то пошло не так                   
            </p>
        </div>
    );
};

export default NotFoundPage; 