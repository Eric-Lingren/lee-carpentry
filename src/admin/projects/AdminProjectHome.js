import { Link } from 'react-router-dom'

const AdminProjectHome  = () => {

    return(
        <div>
            <h1 className='admin-project-home-header'> Admin Home </h1>
            <div style={{ display: 'flex', justifyContent: 'space-evenly'}}>
                <button className='btn btn-green'>
                    <Link 
                        className='admin-project-home-link'
                        to='/admin/projects/create'
                    > 
                        Create New Project 
                    </Link>
                </button>
                <button className='btn btn-brown'>
                    <Link 
                        className='admin-project-home-link'
                        to='/admin/projects/edit'
                    > 
                        Edit Existing Project 
                    </Link>
                </button>
            </div>
        </div>
    )
}

export default AdminProjectHome