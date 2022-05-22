import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, SyntheticEvent, useRef, useState } from "react";
import styles from './pages.module.css';
import { useHistory, Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../services/hooks';
import { loginUser } from "../services/actions/user";

interface LocationState {  
    from?: any
}

const LoginPage = () => {
    const dispatch = useDispatch();
    const passwordRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const history = useHistory();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const loggedIn = useSelector((state) => state.user.loggedIn); 
    const { state } = useLocation<LocationState>();

    const onChangeEmail = (e : ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    
    const onChangePassword = (e : ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    const submitHandler = async (e : SyntheticEvent) => { 
        e.preventDefault();
        await dispatch(loginUser(email, password)); 
        history.replace({ pathname: state?.from || '/' });
    };

    if (loggedIn) {
        console.log('редирект')
        return (
            <Redirect to={ state?.from || '/' }/>
        );
    }
    
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