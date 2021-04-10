import { Link } from 'react-router-dom'

const AdminProjectHome  = () => {

    return(
        <div>
            <h1> Admin Project Home </h1>
            <div style={{ display: 'flex', justifyContent: 'space-evenly'}}>
                <Link to='/admin/projects/create'> New Project </Link>
                <Link to='/admin/projects/edit'> Edit Project </Link>
            </div>
        </div>
    )
}

export default AdminProjectHome