import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useState } from "react";
import styles from './pages.module.css';
import { useHistory } from 'react-router-dom';
import { registerUser } from "../services/actions/user";
import { useDispatch } from "react-redux";

const RegisterPage = () => {
    const history = useHistory();
    const dispatch = useDispatch(); 
    const emailRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [validationForm, setValidationForm] = useState(false);
    const [validationError, setValidationError] = useState({
        name: false,
        email: false,
        password: false,
    });

    const onChangeName = (e) => {
        setName(e.target.value);
        setValidationError({
            ...validationError,
            name: e.target.value.length < 4
        });
        setValidationForm(e.target.value.length >= 4 && !validationError.email && !validationError.password);
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
        setValidationError({
            ...validationError,
            email: !e.target.validity.valid
        });

        setValidationForm(!validationError.name && !e.target.validity.valid && !validationError.password);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
        setValidationError({
            ...validationError,
            password: e.target.value.length < 6
        });
        setValidationForm(!validationError.name && !validationError.email && e.target.value.length >= 6);
    }

    const submitHandler = async (e) => { 
        e.preventDefault();
        await dispatch(registerUser(name, email, password));
        history.replace({ pathname: '/' });
    };

    return (  
        <div className={styles.wrapper}>    
            <form className={`${styles.container}`} onSubmit={submitHandler}>
                <p className="text text_type_main-medium mt-30 mb-6">
                    ??????????????????????
                </p>
                <div className={styles.item +" mb-6"}>
                    <Input
                        type={'text'}
                        placeholder={'??????'}
                        onChange={onChangeName}
                        value={name}
                        name={'Name'}
                        error={validationError.name}
                        ref={nameRef}
                        errorText={'?????? ???????????? ???????? ???? ?????????? ?????????????? ????????????????.'}
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
                        errorText={'????????????, ?????????? ?????????? ???????????? ???? ??????????!'}
                        size={'default'}
                    />
                </div>
                <div className={styles.item +" mb-6"}>
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder={'????????????'}
                        onChange={onChangePassword}
                        icon={showPassword ? 'HideIcon' : 'ShowIcon'}
                        value={password}
                        name={'password'}
                        error={validationError.password}
                        ref={passwordRef}
                        onIconClick={e => {setShowPassword(!showPassword)}}
                        errorText={'???????????? ???????????? ???????? ???? ?????????? ?????????? ????????????????.'}
                        size={'default'}
                    />
                </div>
                <Button type="primary" size="medium" disabled={!validationForm}>
                    ????????????????????????????????????
                </Button>
                <p className="text text_type_main-default text_color_inactive mt-20 mb-4">
                    ?????? ?????????????????????????????????          
                    <Button type="secondary" size="medium" onClick={() => history.replace({ pathname: '/login' })}>??????????</Button>          
                </p>
            </form>
        </div>
    );
};

export default RegisterPage; 