import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import firebase from 'firebase'

export const AuthContext = React.createContext()

const  AuthContextProvider = (props) => {
    let history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [authMessage, setAuthMessage] = useState(null)

    const register = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) return setAuthMessage('Passwords do not match')
        // Mesage to notify users they can not create an account:
        setAuthMessage('You do not have permissions to perfrom this action. Please contact the site administrator')
        
        // Registrations are disabled when the code below is removed
        // firebase.auth().createUserWithEmailAndPassword(email, password)
        // .then(() => setAuthMessage('Successfully created user.  Please login.'))
        // .catch(() => setAuthMessage('Failed to create user.  Please try again.'))
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
        setAuthMessage('none')
        firebase.auth().signOut()
        .then(() => {
            sessionStorage.removeItem('constructionIsLogged')
            setAuthMessage('')
            history.push('/')
        })
        .catch(error => error)
    }


    return (
        <AuthContext.Provider value={{
            email,
            setEmail,
            password,
            setPassword,
            confirmPassword,
            setConfirmPassword,
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