import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, SyntheticEvent, useRef, useState } from "react";
import styles from './pages.module.css';
import { useHistory } from 'react-router-dom';
import { useDispatch } from '../services/hooks';
import { forgotPassword } from "../services/actions/user";

const ForgotPasswordPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const emailRef = useRef<HTMLInputElement>(null);
    const [email, setEmail] = useState<string>('');
    const [validationError, setValidationError] = useState<boolean>(false);

    const onChangeEmail = (e : ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setValidationError(!e.target.validity.valid);
    }

    const submitHandler = async (e : SyntheticEvent) => { 
        e.preventDefault();
        await dispatch(forgotPassword(email));

        if (false || localStorage.getItem('forgotPasswordSuccess')) {     
            history.replace({ pathname: '/reset-password' });
        }   
    };

    return (  
        <div className={styles.wrapper}>
            <h2 className='text text_type_main-medium mb-6'>Восстановление пароля</h2>
            <form className={styles.container} onSubmit={submitHandler}>      
            <div className={styles.item +" mb-6"}>
                <Input
                    type={'email'}
                    placeholder={'E-mail'}
                    onChange={onChangeEmail}
                    value={email}
                    name={'e-mail'}
                    error={validationError}
                    ref={emailRef}
                    errorText={'Ошибка, адрес почты введен не верно!'}
                    size={'default'}
                />
            </div>
                <div className="mt-6">
                    <Button type="primary" size="medium" disabled={validationError}/>
                </div>      
            </form>      
            <p className={styles.mainText + ' text text_type_main-default text_color_inactive mt-20'}>
                Вспомнили пароль?
                <Button type="secondary" size="medium" onClick={() => history.replace({ pathname: '/login' })} name ='Войти'/>
            </p>      
        </div>
    );
};

export default ForgotPasswordPage; 