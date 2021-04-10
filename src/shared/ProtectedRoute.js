import { Route, Redirect } from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary'


const ProtectedRoute = ({ path, otherProps, Component }) => {

    const canAccess = () => {
        if(sessionStorage.getItem('constructionIsLogged') === 'true') return true
        return false
    }


    return (
        canAccess() ?
        (
            <Route
                path = {path}
                render = {props => (
                    <ErrorBoundary >
                        <Component {...props} {...otherProps} />
                    </ErrorBoundary>
                )}
            />
        ) : (
            <Redirect to={{ pathname: '/admin' }} />
        )
    )
}

export default ProtectedRoute