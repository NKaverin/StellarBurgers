import { useEffect } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { useLocation, Switch, Route, Redirect, useHistory } from "react-router-dom";
import FeedPage from "../../pages/FeedPage";
import ForgotPasswordPage from "../../pages/ForgotPasswordPage";
import HomePage from "../../pages/HomePage";
import IngredientIDPage from "../../pages/IngredientIDPage";
import LoginPage from "../../pages/LoginPage";
import NotFoundPage from "../../pages/NotFoundPage";
import OrderDetailPage from "../../pages/OrderDetailPage";
import ProfilePage from "../../pages/ProfilePage";
import RegisterPage from "../../pages/RegisterPage";
import ResetPasswordPage from "../../pages/ResetPasswordPage";
import { getIngredients } from "../../services/actions/ingredients";
import { RootState } from "../../services/redusers/rootReduser";
import Modal from "../Modal/Modal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const RouteSwitch = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const background = location.state && location.state.background;
    const loggedIn = useSelector((state:RootState) => state.user.loggedIn);                   
    const item = useSelector((state:RootState) => state.ingredientDetails.ingredient);
    const getOrdersSuccess = useSelector((state:RootState) => state.ws.getOrdersSuccess);

    const closeItemFeed = () => {
        history.replace({ pathname: '/feed', state: { background: null }});
    }

    const closeItemProfile = () => {
        history.replace({ pathname: '/profile/orders', state: { background: null }});
    }

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
                <ProtectedRoute exact path='/profile'>
                    <ProfilePage/>
                </ProtectedRoute>
                <Route path='/ingredients/:id'>
                    {item && <HomePage/>}
                    {!background && <IngredientIDPage/>}
                </Route>
                <Route exact path='/feed'>
                    <FeedPage/>
                </Route>
                <Route path='/feed/:id'>
                    {!background && <OrderDetailPage/>}
                </Route>
                <ProtectedRoute exact path='/profile/orders'>
                    <ProfilePage/>
                </ProtectedRoute>
                <ProtectedRoute exact path='/profile/orders/:id'>
                    {!background && <OrderDetailPage/>}
                </ProtectedRoute>
                <Route path='*'>
                    {!background && (<NotFoundPage/>)}
                </Route>

            </Switch>
                        
            {background && !item && (
                <Route path='/ingredients/:id'>
                    <IngredientIDPage/>
                </Route>
            )}
            {background && getOrdersSuccess && (
                <Route exact path='/feed/:id'>
                    <Modal closeHandler={closeItemFeed} title="Детали заказа">       
                        <OrderDetailPage />
                    </Modal>
                </Route>
            )}
            {background && getOrdersSuccess && (
                <ProtectedRoute exact path='/profile/orders/:id'>
                    <Modal closeHandler={closeItemProfile} title="Детали заказа">       
                        <OrderDetailPage />
                    </Modal>
                </ProtectedRoute>
            )}
            
        </>     
    )
}

export default RouteSwitch;