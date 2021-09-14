import { useState } from 'react'
import sanitizeData from '../shared/utils/SanitizeData'
import { send } from 'emailjs-com'


const Contact = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [isSendingMessage, setIsSendingMessage] = useState(false)
    const [didSubmissionError, setDidSubmissionError] = useState(false)
    const [submissionMessage, setSubmissionMessage] = useState(null)

    const submitContactForm = (e) => {
        e.preventDefault()
        setIsSendingMessage(true)
        let msg = {name: name, email:email, message: message}
        send(
            process.env.REACT_APP_EMAILJS_SERVICE_ID,
            process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
            // 'service_sw1fdow',
            // 'template_ua64w4r',
            msg,
            // 'user_JDZ3MfFYGQmygHTv4Rgra'
            process.env.REACT_APP_EMAILJS_USER_ID,
        )
        .then((response) => {
            setDidSubmissionError(false)
            setIsSendingMessage(false)
            resetState()
            setSubmissionMessage('We have received your message and will reach out within 72 hours.')
        })
        .catch((err) => {
            setDidSubmissionError(true)
            setIsSendingMessage(false)
            resetState()
            setSubmissionMessage('Something broke while submitting your message. Pleasey try again or give us a call at (123) 456-7890.')
        })
    }

    const resetState = () => {
        setName('')
        setEmail('')
        setMessage('')
    }


    return (
        <div className='contact-wrapper'>
            <div className='contact-left-wrapper'>
                <h2 className='contact-quote'> If the women don't find you handsome, </h2>
                <h2 className='contact-quote'> they should at least find you handy. </h2>
                <div className='button-wrapper'>
                    <button className='btn btn-orange'>
                        <a className='contact-call' href="tel:+18017077067"> Call Now </a>
                    </button>
                </div>
            </div>
            <div className='contact-right-wrapper'>
                <form className='contact-form' onSubmit={submitContactForm}>
                    <label className='form-label'> Name </label>
                    <input 
                        type='text'
                        value={name}
                        onChange = {e => setName(sanitizeData(e.target.value))}
                    />
                    <label className='form-label'> Email </label>
                    <input 
                        type='email'
                        value={email}
                        onChange = {e => setEmail(sanitizeData(e.target.value))}
                    />
                    <label className='form-label'> Message </label>
                    <textarea
                        value={message}
                        onChange = {e => setMessage(sanitizeData(e.target.value))}
                    />
                    <div className='button-wrapper contact-form-btn-wrap'>
                        { 
                            isSendingMessage 
                            ?
                            <div class="loader-wrapper">
                                <span class="loader"><span class="loader-inner"></span></span>
                            </div>
                            :
                            <button className='btn btn-green'>
                                Send 
                            </button>
                        }
                    </div>
                </form>
                <div className='contact-message-wrapper'>
                    <h3 
                        className={didSubmissionError ? 'contact-message-fail' : 'contact-message-success'}
                    > 
                        {submissionMessage} 
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default Contact