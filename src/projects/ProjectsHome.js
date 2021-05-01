import { useContext, useEffect, useState } from 'react'
import { ProjectContext } from '../context/ProjectProvider'
import ProjectsFilterBar from './ProjectsFilterBar'
import ProjectCard from './ProjectCard'


const ProjectsHome = () => {
    const { getAllProjects } = useContext(ProjectContext)
    const [ allProjects, setAllProjects ] = useState([])

    useEffect(() => {
        async function fetchData() {
            const response = await getAllProjects()
            setAllProjects(response)
        }
        fetchData()
    }, [getAllProjects])

    const mappedProjectCards = allProjects.map( project => <ProjectCard key={project.id} project={project} /> )

    return (
        <div>
            <h1> Projects </h1>
            <ProjectsFilterBar />
            { allProjects.length > 0 && mappedProjectCards }
        </div>
    )
}

export default ProjectsHome