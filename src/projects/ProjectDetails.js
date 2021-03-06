import { useEffect, useState, useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ProjectContext } from '../context/ProjectProvider'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import { useCurrentWidth } from '../shared/CustomHooks/useCurrentWidth'



const ProjectDetails = () => {
    const { getOneProject } = useContext(ProjectContext)
    const [ project, setProject ] = useState(null)
    const location = useLocation().pathname
    const lastIndex = location.lastIndexOf('/')+1
    const projectId = location.slice(lastIndex, location.length)
    const currentWindowWidth = useCurrentWidth()
    console.log(currentWindowWidth)
    useEffect(()=> {
        async function fetchData() {
            const response = await getOneProject(projectId)
            setProject(response)
        }
        fetchData()
    }, [getOneProject, projectId])

    const mappedCategories = project && project.categories.map(category => <p className='project-details-categories' key={category}> {category} </p>)

    const mappedProjectImages = project && project.imageUrls.map( (imageUrl, i) => {
        return (
            <img 
                key={i}
                src={imageUrl} 
                alt="project" 
                className='project-details-image'
                // style={{ width: "100%", height: "700px" }}
            />
        )
    })


    return (
        <div className='project-details-outer-wrapper'>
            {
                project !== null &&
                <div className='project-details-wrapper'>
                    {
                        currentWindowWidth > 768 &&
                        <div className='project-details-left-wrapper'>
                            <h3 className='project-details-sub-header'> Categories </h3>
                            <div className='project-details-categories-wrapper'>
                                { project.categories.length > 0 && mappedCategories }
                            </div>
                        </div>
                    }
                    <div className='project-details-center-wrapper'>
                        {
                            project.imageUrls &&
                            <Carousel 
                                autoPlay 
                                infiniteLoop 
                                useKeyboardArrows
                                showThumbs={false}
                                showStatus={false}
                            >
                                {mappedProjectImages}
                            </Carousel>
                        }
                        <div className='project-details-title-container'>
                            <h2 className='project-details-title'> {project.projectTitle} </h2>
                            <h4 className='project-details-location'> {project.projectLocation} </h4>
                        </div>
                        <p className='project-details-description'> {project.projectDescription} </p>
                    </div>
                    <div className='project-details-right-wrapper'>
                        {/* <h3 className='project-details-sub-header'> Other Info </h3>
                        <p className='project-details-other-info-text'>
                            If there's anything else you want to include that I haven't put on here already it could go here
                        </p> */}
                    </div>
                    {
                        currentWindowWidth <= 768 &&
                        <div className='project-details-left-wrapper'>
                            <h3 className='project-details-sub-header'> Categories </h3>
                            <div className='project-details-categories-wrapper'>
                                { project.categories.length > 0 && mappedCategories }
                            </div>
                        </div>
                    }
                </div>
            }
            <NavLink to='/projects' className='project-details-link'> Return to Projects Page </NavLink>
        </div>
    )
}

export default ProjectDetails