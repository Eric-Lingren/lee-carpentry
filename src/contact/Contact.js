
const Contact = () => {

    return (
        <div className='contact-wrapper'>
            <div className='contact-left-wrapper'>
                <h2 className='contact-quote'> If the women don't find you handsome </h2>
                <h2 className='contact-quote'> they should at least find you handy. </h2>
                <div className='button-wrapper'>
                    <button className='btn btn-orange'>
                        <a className='contact-call' href="tel:+18017077067"> Call Now </a>
                    </button>
                </div>
            </div>
            <div className='contact-right-wrapper'>
                <form className='contact-form'>
                    <label className='form-label'> Name </label>
                    <input 
                        type='text'
                    />
                    <label className='form-label'> Email </label>
                    <input 
                        type='email'
                    />
                    <label className='form-label'> Message </label>
                    <textarea
                    />
                    <div className='button-wrapper contact-form-btn-wrap'>
                        <button className='btn btn-green'>
                            Send 
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Contact