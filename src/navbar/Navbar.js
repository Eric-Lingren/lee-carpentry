import { useEffect, useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider'
import Logo from '../assets/jade-elephant.png'

const Navbar = () => {
    const [isAdmin, setIsAdmin] = useState(false)
    const { authMessage, logout } = useContext(AuthContext)

    useEffect(() => {
        if(sessionStorage.getItem('constructionIsLogged') === 'true'){
            setIsAdmin(true)
        } else{
            setIsAdmin(false)
        }
    }, [authMessage])


    return (
        <nav>
            <NavLink className="logo-link" to='/'>
                <img src={Logo} alt="Logo" />
            </NavLink>
            <div className="navlinks-container">
                <NavLink className="navlink" activeClassName="navlink-selected" exact to='/'> Home </NavLink>
                <NavLink className="navlink" activeClassName="navlink-selected" to='/projects'> Projects </NavLink>
                <NavLink className="navlink" activeClassName="navlink-selected" to='/contact'> Contact </NavLink>
                {isAdmin && 
                    <>  
                        <NavLink className="navlink" activeClassName="navlink-selected" to='/admin/projects/create'> Create Project </NavLink>
                        <NavLink className="navlink" activeClassName="navlink-selected" to='/admin/projects/edit'> Edit Project </NavLink>
                        <NavLink className="navlink" to="/" onClick={logout}> Log out </NavLink>
                    </>
                }
            </div>
        </nav>
    )
}

export default Navbar