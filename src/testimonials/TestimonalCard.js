
const TestimonialCard  = ({testimonial}) => {

    return (
        <div>
            <h3> {testimonial.name} </h3>
            <p> {testimonial.quote} </p>
        </div>
    )
}

export default TestimonialCard