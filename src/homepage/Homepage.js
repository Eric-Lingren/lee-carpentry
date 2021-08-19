import { NavLink } from 'react-router-dom'
import Testimonials from '../testimonials/Testimonials'
import HomeImage from '../assets/homepage-steps.png'
import HomeProjectCarousel from './HomeProjectCarousel'
import Map from './Map'


const Homepage = () => {

    return (
        <>
            <section className="home-hero-section">
                <div className="home-hero-overlay">
                    <div className="home-hero-text">
                        <h2> Every house we frame is found guilty. </h2>
                        <h2> Of being square plumb and true. </h2>
                        <NavLink className="button-wrapper" to="/projects">
                            <button className="btn btn-orange"> See Some Projects </button>
                        </NavLink>
                    </div>
                </div>
                <img src={HomeImage} alt="home-construction" />
            </section>

            {/* <HomeProjectCarousel /> */}
            <Map />
            <Testimonials />
        </>
    )
}

export default Homepage