import { Link } from 'react-router-dom'

const ProjectCard = ({project}) => {

    const mappedCategories = project.categories.map( category => <p key={category}> {category} </p>)

    return (
        // <div>
            <Link to={`/projects/${project.id}`}>
                <span>
                    <img 
                        src={project.imageUrls[0]} 
                        alt='project-thumbnail'
                    />
                    <h4>{project.projectTitle} </h4>
                    <p>{project.projectDescription} </p>
                    <p>{project.projectLocation} </p>
                    { project.categories.length > 0 && mappedCategories }
                </span>
            </Link>
        // </div>
    )
}

export default ProjectCard