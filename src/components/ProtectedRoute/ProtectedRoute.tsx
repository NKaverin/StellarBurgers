import { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../services/actions/user';
import { RootState } from '../../services/redusers/rootReduser';

export default function ProtectedRoute({ children, ...restOfProps }) { 
    const dispatch = useDispatch();
    const loggedIn = useSelector((state:RootState) => state.user.loggedIn); 

    useEffect(
        () => {
            if (loggedIn) {
                dispatch(getUser())
            }     
        },
        [dispatch, loggedIn]
    ); 

    return (
        <Route
            {...restOfProps}
            render={(props) =>    
                !loggedIn ? (children) : (<Redirect
                to={{
                    pathname: '/login',
                    state: { from: location }
                }}
                />)
            }
        />
    );
}