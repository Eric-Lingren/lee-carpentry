import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider'

const Navbar = () => {
    const [isAdmin, setIsAdmin] = useState(false)
    const { authMessage } = useContext(AuthContext)

    useEffect(() => {
        if(sessionStorage.getItem('constructionIsLogged') === 'true'){
            setIsAdmin(true)
        } else{
            setIsAdmin(false)
        }
    }, [authMessage])


    return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly'}} >
            <Link to='/'> Home </Link>
            <Link to='/projects'> Projects </Link>
            <Link to='/contact'> Contact </Link>
            {isAdmin && 
                <>  
                    <Link to='/admin/projects/create'> Create Project </Link>
                    <Link to='/admin/projects/edit'> Edit Project </Link>
                </>
            }
        </div>
    )
}

export default Navbar