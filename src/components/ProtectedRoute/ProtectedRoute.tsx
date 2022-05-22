import { ReactNode, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import { useLocation } from 'react-router-dom';
import { getUser } from '../../services/actions/user';

export default function ProtectedRoute({ children, ...restOfProps } : IProtectedRoute) { 
    const dispatch = useDispatch();
    const loggedIn = useSelector((state) => state.user.loggedIn); 
    const [isUserLoaded, setUserLoaded] = useState<boolean>(false);
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

interface IProtectedRoute {
    children: ReactNode,
    exact?: boolean,
    path: string
}