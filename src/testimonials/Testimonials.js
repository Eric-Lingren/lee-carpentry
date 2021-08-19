import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import testimonialData from './testimonialData.json'
import TestimonailCard from './TestimonialCard'

const Testimonials = () => {
    const [testimonialIndexShown, setTestimonailIndexShown] = useState(0)

    const showNextTestimonail = () => {
        let nextIndex = testimonialIndexShown + 1
        if( nextIndex > testimonialData.quotes.length - 1) nextIndex = 0 
        setTestimonailIndexShown(nextIndex)
    }
    
    const showPreviousTestimonail = () => {
        let nextIndex = testimonialIndexShown - 1
        if( nextIndex < 0 ) nextIndex = testimonialData.quotes.length - 1
        setTestimonailIndexShown(nextIndex)

    }

    const mappedTestimonials = testimonialData.quotes.map( (testimonial, i) => {
        let isDisplayed = false
        if(i === testimonialIndexShown) isDisplayed = true
        return(
            <TestimonailCard 
                key={i}
                testimonial={testimonial}
                isDisplayed={isDisplayed}
            />
        )
    })


    return (
        <div className='testimonials-wrap'>
            <h1 className='testimonials-header'> 
                Testimonials 
            </h1>
            <h2 className='testimonials-subheader'> 
                Don't just take our word for it 
            </h2>
            <div className='testimonail-container'>
                <FontAwesomeIcon 
                    className='testimonial-arrow-left' 
                    icon={faArrowAltCircleLeft}
                    onClick={showPreviousTestimonail}
                    /> 
                {mappedTestimonials}
                <FontAwesomeIcon 
                    className='testimonial-arrow-right' 
                    icon={faArrowAltCircleRight}
                    onClick={showNextTestimonail}
                /> 
            </div>
        </div>
    )
}

export default Testimonials

