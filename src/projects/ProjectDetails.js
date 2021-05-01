import { useEffect, useState, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ProjectContext } from '../context/ProjectProvider'



const ProjectDetails = () => {
    const { getOneProject } = useContext(ProjectContext)
    const [ project, setProject ] = useState(null)
    const location = useLocation().pathname
    const lastIndex = location.lastIndexOf('/')+1
    const projectId = location.slice(lastIndex, location.length)

    useEffect(()=> {
        async function fetchData() {
            const response = await getOneProject(projectId)
            setProject(response)
        }
        fetchData()
    }, [getOneProject, projectId])

    const mappedCategories = project && project.categories.map(category => <p key={category}> {category} </p>)


    return (
        <div>
            <h1> Project Details Page</h1>
            {
                project !== null &&
                <>
                    <div>
                        <h3> Listed Categories </h3>
                        { project.categories.length > 0 && mappedCategories }
                    </div>
                    <div>
                        {
                            project.imageUrls &&
                            <img 
                                src={project.imageUrls[0]} 
                                alt='project-images'
                            />
                        }
                        <h2> {project.projectTitle} </h2>
                        <h4> {project.projectLocation} </h4>
                        <p> {project.projectDescription} </p>
                        <Link to='/projects'> Return to Projects Page </Link>
                    </div>
                    <div>
                        <h3> Other Info </h3>
                        <p>
                            If there's anything else you want to include that I haven't put on here already it could go here
                        </p>
                    </div>
                </>
            }
        </div>
    )
}

export default ProjectDetails