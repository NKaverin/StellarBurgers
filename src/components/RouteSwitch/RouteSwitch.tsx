import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Switch, Route, useHistory } from "react-router-dom";
import ForgotPasswordPage from "../../pages/ForgotPasswordPage";
import HomePage from "../../pages/HomePage";
import IngredientIDPage from "../../pages/IngredientIDPage";
import LoginPage from "../../pages/LoginPage";
import NotFoundPage from "../../pages/NotFoundPage";
import ProfilePage from "../../pages/ProfilePage";
import RegisterPage from "../../pages/RegisterPage";
import ResetPasswordPage from "../../pages/ResetPasswordPage";
import { refreshToken, setLoggedIn, setNotLoggedIn } from "../../services/actions/user";
import { RootState } from "../../services/redusers/rootReduser";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const RouteSwitch = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const background = location.state && location.state.background;
    const loggedIn = useSelector((state:RootState) => state.user.loggedIn);

    function checkToken() {
        const token = localStorage.getItem('accessToken');
        if (token) {
            if (Date.now() <= JSON.parse(atob(token.split('.')[1])).exp * 1000) {                       
                dispatch(setLoggedIn()); 
            } else {                      
                dispatch(refreshToken());        
            }
        } else {     
            dispatch(setNotLoggedIn());
        }  
    }

    useEffect(
        () => {          
            checkToken();
        }, 
        [loggedIn]
    );

    return (
        <Switch location = {location || background}>
            <Route exact path='/'>
                <HomePage/>
            </Route>
            <Route path='/login'>
                {loggedIn ? history.replace({ pathname: '/' }) : <LoginPage/>}
            </Route>
            <Route path='/register'>
                {loggedIn ? <HomePage/> : <RegisterPage/>}          
            </Route>
            <Route path='/forgot-password'>
                {loggedIn ? <HomePage/> : <ForgotPasswordPage/>}
            </Route>
            <ProtectedRoute path='/reset-password'>
                {loggedIn ? <HomePage/> : 
                    localStorage.getItem('forgotPasswordSuccess') || false ? <ResetPasswordPage/> : <ForgotPasswordPage/>
                }          
            </ProtectedRoute>          
            <Route path='/profile'>
                {loggedIn ? <ProfilePage/> : <LoginPage/>} 
            </Route>
            <Route path='/ingredients/:id'>
                {background && (<IngredientIDPage/>)}
            </Route>      
            <Route path='*'>
                <NotFoundPage/>
            </Route>
        </Switch>
    )
}

export default RouteSwitch;