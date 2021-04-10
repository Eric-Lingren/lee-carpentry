import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import firebase from 'firebase'

export const AuthContext = React.createContext()

const  AuthContextProvider = (props) => {
    let history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [authMessage, setAuthMessage] = useState('')

    const register = (e) => {
        e.preventDefault()
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => setAuthMessage('Successfully created user.  Please login.'))
        .catch(() => setAuthMessage('Failed to create user.  Please try again.'))
    }

    const login = (e) => {
        e.preventDefault()
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            sessionStorage.setItem('constructionIsLogged', true)
            setAuthMessage('')
            history.push('/admin/projects')
        })
        .catch(() => setAuthMessage('Incorrect Email or Password'))
    }

    const logout = () => {
        firebase.auth().signOut()
        .then(() => {
            sessionStorage.removeItem('constructionIsLogged')
            history.push('/')
        })
        .catch(error => error)
    }

    // const checkAccessRights = async () => {
    //     await firebase.auth().onAuthStateChanged( user => {
    //         if(user) console.log(user)
    //     })
    // }


    return (
        <AuthContext.Provider value={{
            email,
            setEmail,
            password,
            setPassword,
            register,
            login,
            authMessage,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider