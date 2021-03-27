import { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'


const AdminLogin = () => {
    const { email, setEmail, password, setPassword, login, didError, logout } = useContext(AuthContext)

    return(
        <div>
            <h2> Login: </h2>
            <form onSubmit={login}>
                <input 
                    type='email'
                    value={email}
                    placeholder='Email'
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    value={password}
                    placeholder='Password'
                    onChange={e => setPassword(e.target.value)}
                />
                <button> Login </button>
            </form>
            { didError && <h4>Incorrect Email or Password</h4>}
            <button onClick={logout}> Logout </button>
        </div>
    )
}

export default AdminLogin