import { useEffect, useState, useContext, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../context/AuthProvider'
import { useCurrentWidth } from '../shared/CustomHooks/useCurrentWidth'
import { useOutsideClick } from '../shared/CustomHooks/useOutsideClick'
import SidePanel from './SidePanel'
import Logo from '../assets/jade-elephant.png'

const Navbar = () => {
    const [isAdmin, setIsAdmin] = useState(false)
    const { authMessage, logout } = useContext(AuthContext)
    const node = useRef()
    const currentWindowWidth = useCurrentWidth()
    const [expandPanel, collapsePanel, expanded] = useOutsideClick(node)

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
            { currentWindowWidth < 769 ? 
                <>
                    {expanded ? (
                        <div ref={node}>
                            <FontAwesomeIcon 
                                className='hamburger-bars'
                                icon={faTimes} 
                                onClick={collapsePanel}
                            /> 
                            <SidePanel
                                closeSidePanel={collapsePanel}
                                isAdmin={isAdmin}
                            />
                        </div>
                    ):(
                        <div ref={node}>
                            <FontAwesomeIcon 
                                className='hamburger-bars'
                                icon={faBars} 
                                onClick={expandPanel}
                            /> 
                        </div> 
                    )}
                </>
                : 
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
            }
        </nav>
    )
}

export default Navbar