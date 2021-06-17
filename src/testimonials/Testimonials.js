import testimonialData from './testimonialData.json'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'

const Testimonials = () => {

    const mappedTestimonials = testimonialData.quotes.map( (testimonial, i) => {
        return(
            <div key={i}
                style={{
                    backgroundColor: '#DDA15E',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <div
                    style={{
                        height: '400px',
                        width: '80%',
                        justifyContent: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center'
                        
                    }}
                >
                    <p style={{ fontSize: '40px'}} > {testimonial.customer} </p>
                    <p style={{ fontSize: '32px', margin: '0px' }} > {testimonial.quote} </p>
                </div>
            </div>
        )
    })


    return (
        <div className='testimonials-wrap' >
            <h1 style={{ fontSize: '50px', color: '#606C38', fontWeight: 'normal', margin: '0px' }}> Testimonials </h1>
            <h2 style={{ fontSize: '36px', color: '#DDA15E', fontWeight: 'normal', margin: '0px', fontStyle: 'italic', marginBottom: '95px' }} > Don't just take our word for it </h2>
            <div className='carousel-container-layout-testimonials'>
                <Carousel 
                    autoPlay 
                    infiniteLoop 
                    useKeyboardArrows
                    showThumbs={false}
                    showStatus={false}
                    showArrows
                >
                    {mappedTestimonials}
                </Carousel>
            </div>
        </div>
    )
}

export default Testimonials