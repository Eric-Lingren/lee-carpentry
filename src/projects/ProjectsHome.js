import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ProjectContext } from '../context/ProjectProvider'
import ProjectsFilterBar from './ProjectsFilterBar'
import ProjectCard from './ProjectCard'



const ProjectsHome = () => {
    const { getAllProjects } = useContext(ProjectContext)
    const [ allProjects, setAllProjects ] = useState([])
    const [ renderedProjects, setRenderedProjects ] = useState([])
    const location = useLocation()
    let canEdit = location.pathname.includes('admin')


    useEffect(() => {
        async function fetchData() {
            const response = await getAllProjects()
            setAllProjects(response)
            setRenderedProjects(response)
        }
        fetchData()
    }, [getAllProjects])


    const setFilteredProjects = (filter) => {
        setRenderedProjects([])
        if(filter === 'all') return setRenderedProjects(allProjects)
        let matches = []
        allProjects.forEach( project => {
            project.categories.filter( tag => tag.toLowerCase() === filter ? matches.push(project) : null )
        })
        setRenderedProjects(matches)
    }


    const mappedProjectCards = renderedProjects.map( project => <ProjectCard key={project.id} project={project} canEdit={canEdit}/> )


    return (
        <div className='projects-home-wrap'>
            <h1 className='projects-header'> 
                { canEdit ? 'Edit Projects' : 'Projects' }
            </h1>
            <ProjectsFilterBar setFilteredProjects={setFilteredProjects}/>
            <div className='project-card-container'>
                { allProjects.length > 0 && mappedProjectCards }
            </div>
        </div>
    )
}

export default ProjectsHome