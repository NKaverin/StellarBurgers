import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useState } from "react";
import styles from './pages.module.css';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { loginUser } from "../services/actions/user";

const LoginPage = () => {
    const dispatch = useDispatch();
    const passwordRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }
    const submitHandler = async (e) => { 
        e.preventDefault();
        await dispatch(loginUser(email, password)); 
        history.replace({ pathname: '/' });
    };

    return (  
        <div className={styles.wrapper}>
            <h2 className='text text_type_main-medium mb-6'>Вход</h2>
            <form className={styles.container} onSubmit={submitHandler}>
            <div className={styles.item +" mb-6"}>
                    <Input
                        type={'email'}
                        placeholder={'E-mail'}
                        onChange={onChangeEmail}
                        value={email}
                        name={'e-mail'}
                        ref={emailRef}
                        size={'default'}
                    />
                </div>
                <div className={styles.item +" mb-6"}>
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder={'Пароль'}
                        onChange={onChangePassword}
                        icon={showPassword ? 'HideIcon' : 'ShowIcon'}
                        value={password}
                        name={'password'}
                        ref={passwordRef}
                        onIconClick={e => {setShowPassword(!showPassword)}}
                        size={'default'}
                    />
                </div>
                <Button type="primary" size="medium" disabled={email === '' || password === ''}>Войти</Button>        
            </form>      
            <p className={styles.mainText + ' text text_type_main-default text_color_inactive mt-20'}>
                Вы - новый пользователь?          
                <Button type="secondary" size="medium" onClick={() => history.replace({ pathname: '/register' })}>Зарегистрироваться</Button>          
            </p>
            <p className={styles.mainText + ' text text_type_main-default text_color_inactive mt-4'}>
                Забыли пароль?          
                <Button type="secondary" size="medium" onClick={() => history.replace({ pathname: '/forgot-password' })}>Восстановить пароль</Button>          
            </p>
        </div>
    );
};

export default LoginPage; 