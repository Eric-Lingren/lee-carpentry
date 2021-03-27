import { Route, Redirect } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
// import firebase from 'firebase'
// import ErrorBoundary from '../ErrorBoundary'


const ProtectedRoute = ({ path, otherProps, component }) => {
    const Component = component
    const { checkAccessRights, currentUser } = useContext(AuthContext)

    checkAccessRights()
    console.log(currentUser)
    let canAccess;
    // let checkAuth = async () =>{

    //     canAccess = await checkAccessRights()
    //     // console.log(access)
    //     // return access
    //     canAccess = true
    // }
    
    // const checkAccessRights = async () => {
    //     await firebase.auth().onAuthStateChanged(function(user) {
    //         if (user) {
    //             console.log(user)
    //             canAccess = true
    //           // User is signed in.
    //         } else {
    //             console.log('NONE')
    //           // No user is signed in.
    //             canAccess = false
    //         }
    //     })
    //     console.log(canAccess)
    //     return canAccess
    // }
    // checkAccessRights()


    return (
        true ?
        (
            <Route
                path={path}
                render={props => (
                    // <ErrorBoundary >
                        <Component {...props} {...otherProps} />
                    // </ErrorBoundary>
                )}
            />
        ) : (
            <Redirect to={{ pathname: '/admin' }} />
        )
    )
}

export default ProtectedRoute