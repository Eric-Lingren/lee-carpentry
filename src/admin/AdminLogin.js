import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthProvider'
import sanitizeData from '../shared/utils/SanitizeData'


const AdminLogin = () => {
    const { email, setEmail, password, setPassword, login, authMessage, logout, register } = useContext(AuthContext)
    const [ isRegistering, setIsRegistering ] = useState(false)

    return(
        <div>
            {
                !isRegistering ?
                <>
                    <h2> Login: </h2>
                    <form onSubmit={login}>
                        <input 
                            type='email'
                            value={email}
                            placeholder='Email'
                            onChange={e => setEmail(sanitizeData(e.target.value))}
                        />
                        <input
                            type='password'
                            value={password}
                            placeholder='Password'
                            onChange={e => setPassword(sanitizeData(e.target.value))}
                        />
                        <button> Login </button>
                    </form>
                </>
                :
                <>
                    <h2> Create User: </h2>
                    <form onSubmit={register}>
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
                        <button> Register </button>
                    </form>
                </>
            }
            <button onClick={() => setIsRegistering(!isRegistering)}> 
                { !isRegistering ? 'Switch to Register' : 'Switch to Login'}
            </button>
            <button onClick={logout}> Logout </button>
            { authMessage && <h4>{authMessage}</h4>}
        </div>
    )
}

export default AdminLogin