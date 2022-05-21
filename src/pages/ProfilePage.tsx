import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, SyntheticEvent, useEffect, useRef, useState } from "react";
import styles from './pages.module.css';
import { logoutUser, patchUser } from "../services/actions/user";
import { useSelector, useDispatch } from '../services/hooks';
import { useHistory, useLocation } from 'react-router-dom';
import OrdersFeed from "../components/OrdersFeed/OrdersFeed";
import { IValidationError } from "../utils/types";

const ProfilePage = () => {

    const dispatch = useDispatch();   
    const history = useHistory();
    const location = useLocation();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null); 
    const nameRef = useRef<HTMLInputElement>(null);
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [validationForm, setValidationForm] = useState<boolean>(false);
    const [isChanged, setIsChenged] = useState<boolean>(false);
    const [validationError, setValidationError] = useState<IValidationError>({
        name: false,
        email: false,
        password: false
    });

    const user = useSelector((state) => state.user.user);

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const onChangeName = (e : ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        setValidationError({
            ...validationError,
            name: e.target.value.length < 4
        });
        setValidationForm(e.target.value.length >= 4 && !validationError.email && !validationError.password);
        setIsChenged(true);
    }

    const onChangeEmail = (e : ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setValidationError({
            ...validationError,
            email: !e.target.validity.valid
        });
        setValidationForm(!validationError.name && !e.target.validity.valid && !validationError.password);
        setIsChenged(true);
    }

    const onChangePassword = (e : ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setValidationError({
            ...validationError,
            password: e.target.value.length < 6
        });
        setValidationForm(!validationError.name && !validationError.email && e.target.value.length >= 6);
        setIsChenged(true);
    }

    const submitHandler = async (e : SyntheticEvent) => {
        e.preventDefault();
        await dispatch(patchUser(name, email, password));
    };

    const cancelHandler = () => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
        setPassword('');
        setIsChenged(false);
    };

    
    const activeProfile = (location.pathname === '/profile');
    const activeOrders = (location.pathname === '/profile/orders');

    const logout = async () => {
        await dispatch(logoutUser());
        history.replace({ pathname: '/login'}); 
    };

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);


    
    return (
        <div className={styles.horizontalWrapper}>
            <div className={styles.sideMenu__wrapper + ' mr-15 pl-5'}>
                <ul className={styles.sideMenu__list}>
                    <li>
                        <button className={styles.sideMenu__link + ' text text_type_main-medium pt-3 pb-3 ' + (activeProfile ? styles.sideMenu__activeLink : ' text_color_inactive')}  onClick={() => history.replace({ pathname: '/profile' })}>
                            Профиль
                        </button>
                    </li>  
                    <li>
                        <button className={styles.sideMenu__link + ' text text_type_main-medium pt-3 pb-3 ' + (activeOrders ? styles.sideMenu__activeLink : ' text_color_inactive')} onClick={() => history.replace({ pathname: '/profile/orders' })}>
                            История заказов
                        </button>
                    </li> 
                    <li>    
                        <button className={styles.sideMenu__link + ' text text_type_main-medium text_color_inactive pt-3 pb-3'} onClick={logout}>
                            Выход
                        </button>          
                    </li> 
                </ul>
                <p className='text text_type_main-default text_color_inactive mt-20'>
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </div>
            {activeProfile &&(<div>
                <form className={styles.container} onSubmit={submitHandler}>
                    <div className={styles.item +" mb-6"}>
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            onChange={onChangeName}
                            value={name}
                            name={'Name'}
                            error={validationError.name}
                            ref={nameRef}
                            errorText={'Имя должно быть не менее четырех символов.'}
                            size={'default'}
                        />
                    </div>
                    <div className={styles.item +" mb-6"}>
                        <Input
                            type={'email'}
                            placeholder={'E-mail'}
                            onChange={onChangeEmail}
                            value={email}
                            name={'e-mail'}
                            error={validationError.email}
                            ref={emailRef}
                            errorText={'Ошибка, адрес почты введен не верно!'}
                            size={'default'}
                        />
                    </div>
                    <div className={styles.item + ' mb-6'}>
                    <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder={'Пароль'}
                            onChange={onChangePassword}
                            icon={showPassword ? 'HideIcon' : 'ShowIcon'}
                            value={password}
                            name={'password'}
                            error={validationError.password}
                            ref={passwordRef}
                            onIconClick={e => {setShowPassword(!showPassword)}}
                            errorText={'Пароль должен быть не менее шести символов.'}
                            size={'default'}
                        />
                    </div>
                    {isChanged && (<div className={styles.buttons + ' mt-10'}>
                        <Button type="primary" size="medium" disabled={!validationForm && !isChanged}>Сохранить</Button>
                        <Button type="primary" size="medium" onClick={cancelHandler}>Отмена</Button>
                    </div>)}
                </form>
                
            </div>)}

            {activeOrders && (<OrdersFeed />)}
            
        </div>
    )
}

export default ProfilePage; 