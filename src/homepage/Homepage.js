import { useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ProjectContext } from '../context/ProjectProvider'
import Testimonials from '../testimonials/Testimonials'
import HomeImage from '../assets/homepage-steps.png'

const Homepage = () => {
    const { getHomeCarouselProjects, homeCarouselProjects } = useContext(ProjectContext)


    useEffect(() => {
        getHomeCarouselProjects()
    }, [])

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
            <div>
                <h2> From Form, Frame and Finish to </h2>
                <h2> Timbers, Trex, and Treehouses. </h2>
                <button> View Project </button>
            </div>
            <div>
                <div> Map Here </div>
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