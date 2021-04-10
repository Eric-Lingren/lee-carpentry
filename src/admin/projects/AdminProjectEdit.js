import { useContext, useState } from 'react'
import { ProjectContext } from '../../context/ProjectProvider'

const AdminProjectEdit  = () => {
    const { projectTest } = useContext(ProjectContext)
    
    // console.log(projectTest)

    return(
        <div>
            <h1> Admin Project Edit </h1>
        </div>
    )
}

export default AdminProjectEdit