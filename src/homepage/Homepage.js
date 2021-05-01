import Testimonials from '../testimonials/Testimonials'
import HomeImage from '../assets/homepage-steps.png'

const Homepage = () => {
    return (
        <>
            <div>
                <h2> Every house we frame is found guilty. </h2>
                <h2> Of being square plumb and true. </h2>
                <button> See some projects </button>
            </div>
            <img src={HomeImage} alt="home-construction" />
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