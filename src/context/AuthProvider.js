import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import firebase from 'firebase'

export const AuthContext = React.createContext()

const  AuthContextProvider = (props) => {
    let history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [didError, setDidError] = useState(false)
    const [currentUser, setCurrentUser] = useState({})


    const login = (e) => {
        e.preventDefault()

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // let user = userCredential.user
            setDidError(false)
            history.push('/admin/create-project')
        })
        .catch(() => {
            setDidError(true)
        })
    }

    const logout = () => {
        firebase.auth().signOut()
        .then(() => history.push('/'))
        .catch(error => error)
    }

    const checkAccessRights = async () => {
        await firebase.auth().onAuthStateChanged(function(user) {
            console.log(user)
            if(user) setCurrentUser(user)
        })
    }


    return (
        <AuthContext.Provider value={{
            email,
            setEmail,
            password,
            setPassword,
            login,
            didError,
            logout,
            checkAccessRights
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider