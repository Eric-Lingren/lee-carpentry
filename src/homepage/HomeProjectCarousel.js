import { useEffect, useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ProjectContext } from '../context/ProjectProvider'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'


const HomeProjectCarousel = () => {
    const { getHomeCarouselProjects, homeCarouselProjects } = useContext(ProjectContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getHomeCarouselProjects()
    }, [getHomeCarouselProjects])

    useEffect(() => {
        homeCarouselProjects.length && setIsLoading(false)
        return () => setIsLoading(true)
    }, [homeCarouselProjects])


    const mappedCarouselImages = homeCarouselProjects.length && homeCarouselProjects.map( (project, i) => {
        return(
            <div key={i} style={{ position: "relative" }}>
                <img 
                    src={project.imageUrls[0]} 
                    alt="project" 
                    style={{ width: "100%", height: "100%" }}
                />
                <div
                    style={{
                        position: "absolute",
                        left: "25%",
                        top: "30%",
                        color: "white",
                    }}
                >
                    <p className='carousel-text' > From Form, Frame and Finish to </p>
                    <p className='carousel-text' > Timbers, Trex, and Treehouses. </p>
                    <NavLink to={`/projects/${project.id}`}>
                        <button className="btn btn-cream"> View Project </button>
                    </NavLink>
                </div>
            </div>
        )
    })


    return (
        <>
        {isLoading ? <div>loading</div> :
            <div className='carousel-container-layout'>
                <Carousel 
                    autoPlay 
                    infiniteLoop 
                    useKeyboardArrows
                    showThumbs={false}
                    showStatus={false}
                >
                    {mappedCarouselImages}
                </Carousel>
            </div>
        }  
        </>
    )
}

export default HomeProjectCarousel