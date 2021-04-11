import testimonialData from './testimonailsData.json'
import TestimonialCard from './TestimonalCard'

const Testimonials = () => {
    let data = testimonialData.testimonailData

    const mappedTestimonails = data.map( (testimonial, i) => <TestimonialCard key={i} testimonial={testimonial} /> )
    return (
        <div>
            <h1> Testimonials </h1>
            <h2> Don't just take our word for it </h2>
            { mappedTestimonails }
        </div>
    )
}

export default Testimonials