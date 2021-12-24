import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import firebase from 'firebase/compat/app'

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
        setAuthMessage('You do not have permissions to perfrom this action. Please contact the site administrator.')
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






// import React, {useState, useEffect} from "react"
// import axios from "axios"


// export const ProductContext = React.createContext()


// const userAxios = axios.create()
// userAxios.interceptors.request.use(config => {
//     const token = localStorage.getItem("token")
//     config.headers.Authorization = `Bearer ${token}`
//     return config
// })

// export default function ProductProvider(props){
    
//     const [products, setProduct] = useState({allProducts: [], userProducts: []})

//         function getAllProducts(){
//             userAxios.get("/api/product")
//             .then(res => {
//                 setProduct(prevState => ({
//                     ...prevState,
//                     allProducts: res.data
//                 }))
//             })
//             .catch(err => console.log(err.response.data.errMsg))
//         }
    
//         function getUserProducts(){
//             userAxios.get("/api/product/user")
//             .then(res => {
//                 setProduct(prevState => ({
//                     ...prevState,
//                     userProducts: res.data
//                 }))
//             })
//             .catch(err => console.log(err.response.data.errMsg))
//         }
        
    
//         function addProduct(newProduct) {
//             console.log(newProduct)
//             userAxios.post("/api/product", newProduct)
//             .then(res => {
//                 setProduct(prevState => ({
//                     ...prevState,
//                     product: [...prevState.product, res.data]
//                 }))
//             })
//             .catch(err => console.log(err.response.data.errMsg))
//         }
    
//         function deleteProduct(_id) {
//             axios.delete(`/product/:productId`)
//             .then(() => {
//                 setProduct(prevProducts => {
//                     return prevProducts.filter((product) =>  product._id !== _id)
//                 })
//             })
//             .catch(err => console.log(err))
//         }
    
//         function editProduct(updates, productId) {
//             axios.put(`/product/${productId}`, updates)
//             .then(res => {
//                 setProduct(prevProducts => prevProducts.map(product => product._id !== productId ? product : res.data)) 
//             })
//             .catch(err => console.log(err))
//         } 
//         useEffect(() => {
//             getUserProducts()
//             getAllProducts()
//         })
    
    
//     return (

//         <ProductContext.Provider
//             value={{
//                 products,
//                 addProduct,
//                 deleteProduct,
//                 editProduct,
//                 getAllProducts,
//                 getUserProducts
//             }}>

//             { props.children }

//         </ProductContext.Provider>
//     )
// }