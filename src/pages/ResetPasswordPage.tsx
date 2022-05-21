import styles from './pages.module.css';
import { Link, useHistory } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, SyntheticEvent, useRef, useState } from 'react';
import { useDispatch } from '../services/hooks';
import { resetPassword } from '../services/actions/user';


const ResetPasswordPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const passwordRef = useRef<HTMLInputElement>(null);
    const codeRef = useRef<HTMLInputElement>(null);
    const [password, setPassword] = useState<string>('');
    const [code, setCode] = useState<string>('');
    const [validationError, setValidationError] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const onChangePassword = (e : ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setValidationError(e.target.value.length < 6);
    }

    const onChangeCode = (e : ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
    }

    const submitHandler = async (e : SyntheticEvent) => { 
        e.preventDefault();
        await dispatch(resetPassword(password, code));
        if (!localStorage.getItem('forgotPasswordSuccess')) { 
            history.replace({ pathname: '/login' });
        }
    };

    return ( 
        <div className={styles.wrapper}>
            <form className={`${styles.container} mt-15`} onSubmit={submitHandler}>
                <p className="text text_type_main-medium mt-30 mb-6">
                    Восстановление пароля
                </p>
                <div className={styles.item +" mb-6"}>
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder={'Пароль'}
                        onChange={onChangePassword}
                        icon={showPassword ? 'HideIcon' : 'ShowIcon'}
                        value={password}
                        name={'password'}
                        error={validationError}
                        ref={passwordRef}
                        onIconClick={() => {setShowPassword(!showPassword)}}
                        errorText={'Пароль должен быть не менее шести символов.'}
                        size={'default'}
                    />
                </div>
                <div className="mb-6">
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={onChangeCode}
                        value={code}
                        name={'e-mail code'}
                        error={false}
                        ref={codeRef}
                        size={'default'}                      
                    />
                </div>
                <Button type="primary" size="medium" disabled={validationError} name = 'Сохранить'/>
                <p className={styles.mainText + ' text text_type_main-default text_color_inactive mt-20'}>
                    Вспомнили пароль?
                    <Button type="secondary" size="medium" onClick={() => history.replace({ pathname: '/login' })} name = 'Войти'/>
                </p>  
            </form>
        </div> 
    );
};

export default ResetPasswordPage; 