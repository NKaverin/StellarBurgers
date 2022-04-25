import { useEffect } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { useLocation, Switch, Route, Redirect } from "react-router-dom";
import ForgotPasswordPage from "../../pages/ForgotPasswordPage";
import HomePage from "../../pages/HomePage";
import IngredientIDPage from "../../pages/IngredientIDPage";
import LoginPage from "../../pages/LoginPage";
import NotFoundPage from "../../pages/NotFoundPage";
import ProfilePage from "../../pages/ProfilePage";
import RegisterPage from "../../pages/RegisterPage";
import ResetPasswordPage from "../../pages/ResetPasswordPage";
import { getIngredients } from "../../services/actions/ingredients";
import { RootState } from "../../services/redusers/rootReduser";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const RouteSwitch = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const background = location.state && location.state.background;
    const loggedIn = useSelector((state:RootState) => state.user.loggedIn);                   
    const item = useSelector((state:RootState) => state.ingredientDetails.ingredient);
    
    {/* получаем данные */}
    useEffect(() => {
        dispatch(getIngredients);
    }, []);

    return (
        <>
            <Switch location = {background || location}>
                <Route exact path='/'>
                    <HomePage/>
                </Route>
                <Route path='/login'>
                    {loggedIn ? <Redirect to='/'/> : <LoginPage/>}
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
                <ProtectedRoute path='/profile'>
                    <ProfilePage/>
                </ProtectedRoute>
                <Route path='/ingredients/:id'>
                    {item && <HomePage/>}
                    {!background && <IngredientIDPage/>}
                </Route>
                <Route path='*'>
                    {!background && (<NotFoundPage/>)}
                </Route>

            </Switch>
                        
            {background && !item && (
                <Route path='/ingredients/:id'>
                    <IngredientIDPage/>
                </Route>
            )}
            
        </>     
    )
}

export default RouteSwitch;