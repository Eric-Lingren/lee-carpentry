import { Link } from 'react-router-dom'
import EditProjectModal from '../admin/projects/EditProjectModal'


const ProjectCard = ({project, canEdit}) => {

    const mappedCategories = project.categories.map( (category, i) => {
        let tag = `${category}`
        if(i !== project.categories.length - 1) tag = `${tag},`
        return(
            <span className='project-card-tags' key={category}> {tag} </span>
        )
    })


    return (
        <div className='project-card-link-wrapper'>
            <Link to={`/projects/${project.id}`} className='project-links'>
            {/* <Link to={`/projects/${project.id}`} className='project-card-link-wrapper'> */}
                <img 
                    src={project.imageUrls[0]} 
                    alt='project-thumbnail'
                    className='project-thumbnail-image'
                />
                <h4 className='project-card-title'>{project.projectTitle} </h4>
                <p className='project-card-description truncated'>{project.projectDescription} </p>
                <div className='project-card-categories-wrapper'>
                    { project.categories.length > 0 && mappedCategories }
                </div>
            </Link>
            <div className='project-card-edit-container'>
                <p className='project-card-location'>{project.projectLocation} </p>
                { canEdit && <EditProjectModal project={project}/> }
            </div>
        </div>
    )
}

export default ProjectCard