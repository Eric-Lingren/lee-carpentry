import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthProvider'
import sanitizeData from '../shared/utils/SanitizeData'


const AdminLogin = () => {
    const { email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, login, authMessage, register } = useContext(AuthContext)
    const [ isRegistering, setIsRegistering ] = useState(false)

    return(
        <div className='admin-login-wrapper'>
            {
                !isRegistering ?
                <>
                    <h1 className='admin-login-header'> Login: </h1>
                    <form 
                        className='admin-login-form'
                        onSubmit={login}>
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
                        <button className='btn btn-orange'> Login </button>
                    </form>
                </>
                :
                <>
                    <h1 className='admin-login-header'> Create User: </h1>
                    <form 
                        className='admin-login-form'
                        onSubmit={register}>
                        <label> Email </label>
                        <input 
                            type='email'
                            value={email}
                            placeholder='Email'
                            onChange={e => setEmail(sanitizeData(e.target.value))}
                        />
                        <label> Password </label>
                        <input
                            type='password'
                            value={password}
                            placeholder='Password'
                            onChange={e => setPassword(sanitizeData(e.target.value))}
                        />
                        <label> Confirm Password </label>
                        <input
                            type='password'
                            value={confirmPassword}
                            placeholder='Repeat Password'
                            onChange={e => setConfirmPassword(sanitizeData(e.target.value))}
                        />
                        <button className='btn btn-orange'> Register </button>
                    </form>
                </>
            }
            <button 
                className='btn btn-cream'
                onClick={() => setIsRegistering(!isRegistering)}
            > 
                { !isRegistering ? 'Switch to Register' : 'Switch to Login'}
            </button>
            { authMessage && <h4>{authMessage}</h4>} 
        </div>
    )
}

export default AdminLogin