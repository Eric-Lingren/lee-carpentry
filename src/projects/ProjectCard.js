
const ProjectCard = ({project}) => {

    const mappedCategories = project.categories.map( category => <p key={category}> {category} </p>)

    return (
        <div>
            <h2>Card</h2>
            <img 
                src={project.imageUrls[0]} 
                alt='project-thumbnail'
            />
            <h4>{project.projectTitle} </h4>
            <p>{project.projectDescription} </p>
            <p>{project.projectLocation} </p>
            { project.categories.length > 0 && mappedCategories }
        </div>
    )
}

export default ProjectCard