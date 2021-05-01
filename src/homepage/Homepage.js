import { useEffect, useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ProjectContext } from '../context/ProjectProvider'
import Testimonials from '../testimonials/Testimonials'
import HomeImage from '../assets/homepage-steps.png'

const Homepage = () => {
    const { getHomeCarouselProjects, homeCarouselProjects } = useContext(ProjectContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getHomeCarouselProjects()
    }, [])

    useEffect(() => {
        homeCarouselProjects.length && setIsLoading(false)
        return () => setIsLoading(true)
    }, [homeCarouselProjects])

    console.log(homeCarouselProjects)

    return (
        <>
            <section className="home-hero-section">
                <div className="home-hero-text">
                    <h2> Every house we frame is found guilty. </h2>
                    <h2> Of being square plumb and true. </h2>
                    <NavLink className="button-wrapper" to="/projects">
                        <button className="btn btn-orange"> See some projects </button>
                    </NavLink>
                </div>
                <img src={HomeImage} alt="home-construction" />
            </section>
            {isLoading ? <div>loading</div> :
                <div>
                    <img src={homeCarouselProjects[0].imageUrls[0]} alt="project" />
                    <h2> From Form, Frame and Finish to </h2>
                    <h2> Timbers, Trex, and Treehouses. </h2>
                    <NavLink to={`/projects/${homeCarouselProjects[0].id}`}>
                        <button className="btn btn-cream"> View Project </button>
                    </NavLink>
                </div>
            }  
            <div>
                <div> Utah Map Here </div>
                <div>
                    <h2> All Inclusive Carpentry Services </h2>
                    <h2> Across the Wasatch Front </h2>
                    <button> Contact Us </button>
                </div>
            </div>
            <Testimonials />
        </>
    )
}

export default Homepage