import { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getUser } from '../../services/actions/user';
import { RootState } from '../../services/redusers/rootReduser';

export default function ProtectedRoute({ children, ...restOfProps }) { 
    const dispatch = useDispatch();
    const loggedIn = useSelector((state:RootState) => state.user.loggedIn); 
    const [isUserLoaded, setUserLoaded] = useState(false);
    const location = useLocation();

    const init = async () => {
        await dispatch(getUser());
        setUserLoaded(true);        
    };

    useEffect(() => {
        init();
    }, []);

    if (!isUserLoaded) {
        return null;
    }

    return (
        <Route
            {...restOfProps}
            render={() =>    
                loggedIn  ? (children) : (<Redirect
                to={{
                    pathname: '/login',
                    state: { from: location.pathname }
                }}
                />)
            }
        />
    );
}