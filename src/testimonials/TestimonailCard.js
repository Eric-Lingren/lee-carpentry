

const TestimonialCard = ({ testimonial, isDisplayed }) => {

    return (
        <>
        { isDisplayed &&
            <div 
                style={{
                    backgroundColor: '#DDA15E',
                    color: 'white',
                    display: 'flex',
                    height: '450px',
                    width: '800px',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    padding: '0 100px 100px 100px'
                }}
            >
                <p style={{ fontSize: '40px'}} > {testimonial.customer} </p>
                <p style={{ fontSize: '32px', margin: '0px' }} > {testimonial.quote} </p>
            </div>
        }
        </>
    )
}

export default TestimonialCard