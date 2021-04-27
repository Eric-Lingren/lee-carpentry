import { useContext, useEffect, useState } from 'react'
import { ProjectContext } from '../../context/ProjectProvider'
import ProjectCard from '../../projects/ProjectCard'
import EditProjectModal from './EditProjectModal'

const AdminProjectEdit  = () => {
    const { getAllProjects } = useContext(ProjectContext)
    const [ allProjects, setAllProjects ] = useState([])

    useEffect(() => {
        async function fetchData() {
            const response = await getAllProjects()
            setAllProjects(response)
        }
        fetchData()
    }, [getAllProjects])

    const mappedProjectCards = allProjects.map( (project, i) => {
        return(
            <div key={i}>
                <ProjectCard key={project.id} project={project} /> 
                <EditProjectModal project={project} />
            </div>
        )
    })

    return(
        <div>
            <h1> Admin Project Edit </h1>
            { allProjects.length > 0 && mappedProjectCards }
        </div>
    )
}

export default AdminProjectEdit