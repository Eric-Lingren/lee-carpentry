import { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider'

const SidePanel = ({ closeSidePanel }) => {
    const { authMessage, logout } = useContext(AuthContext)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        if(sessionStorage.getItem('constructionIsLogged') === 'true'){
            setIsAdmin(true)
        } else{
            setIsAdmin(false)
        }
    }, [authMessage])

    const clickedLogout = () => {
        closeSidePanel()
        logout()
    }

    return(
        <div className="sidepanel-container">
            <NavLink className="sidepanel-navlink" activeClassName="sidepanel-navlink-selected" onClick={closeSidePanel} exact to='/'> Home </NavLink>
            <NavLink className="sidepanel-navlink" activeClassName="sidepanel-navlink-selected" onClick={closeSidePanel} to='/projects'> Projects </NavLink>
            <NavLink className="sidepanel-navlink" activeClassName="sidepanel-navlink-selected" onClick={closeSidePanel} to='/contact'> Contact </NavLink>
            {isAdmin && 
                <>  
                    <NavLink className="sidepanel-navlink" activeClassName="sidepanel-navlink-selected" onClick={closeSidePanel} to='/admin/projects/create'> Create Project </NavLink>
                    <NavLink className="sidepanel-navlink" activeClassName="sidepanel-navlink-selected" onClick={closeSidePanel} to='/admin/projects/edit'> Edit Project </NavLink>
                    <NavLink className="sidepanel-navlink" to="/" onClick={clickedLogout}> Log out </NavLink>
                </>
            }
        </div>
    )
}

export default SidePanel