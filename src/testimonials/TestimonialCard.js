

const TestimonialCard = ({ testimonial, isDisplayed }) => {

    return (
        <>
        { isDisplayed &&
            <div className='testimonial-card-container'>
                <p className='testimonial-card-customer-name'> {testimonial.customer} </p>
                <p className='testimonial-card-quote'> {testimonial.quote} </p>
            </div>
        }
        </>
    )
}

export default TestimonialCard