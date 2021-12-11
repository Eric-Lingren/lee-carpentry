import { useState, useEffect, useCallback } from 'react'
// import { GoogleReCaptchaProvider, GoogleReCaptcha, useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import sanitizeData from '../shared/utils/SanitizeData'
import { send } from 'emailjs-com'


const Contact = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isEmailRequired, setIsEmailRequired] = useState(true)
    const [phone, setPhone] = useState('')
    const [isPhoneRequired, setIsPhoneRequired] = useState(true)
    const [message, setMessage] = useState('')
    const [isSendingMessage, setIsSendingMessage] = useState(false)
    const [didSubmissionError, setDidSubmissionError] = useState(false)
    const [submissionMessage, setSubmissionMessage] = useState(null)


    const removeCaptcha = () => {
        const script = document.getElementById('captchaScript')
        const recaptchaElems = document.getElementsByClassName('grecaptcha-badge')
        if (script) script.remove()
        if (recaptchaElems.length) recaptchaElems[0].remove()
    }

    useEffect(() => {
        return () => resetState()
    }, [])

    useEffect(() => {
        return () => removeCaptcha()
    }, [])

    const submitContactForm = useCallback(() => {
        setIsSendingMessage(true)
        const isDataValid = () => {
            if(!isEmailRequired || !isPhoneRequired) return true
        }
        if(isDataValid){
            let msg = {name: name, email:email, phone:phone, message: message}
            send(
                process.env.REACT_APP_EMAILJS_SERVICE_ID,
                process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
                msg,
                process.env.REACT_APP_EMAILJS_USER_ID,
            )
            .then(() => {
                setDidSubmissionError(false)
                setIsSendingMessage(false)
                resetState()
                setSubmissionMessage('We have received your message and will reach out to you shortly.')
            })
            .catch(() => {
                setDidSubmissionError(true)
                setIsSendingMessage(false)
                resetState()
                setSubmissionMessage('Something broke while submitting your message. Please try again or give us a call at (385) 202-4334.')
            })
        }
    }, [email, isEmailRequired, isPhoneRequired, message, name, phone])


    const handleReCaptcha = useCallback( async() => {
        window.grecaptcha.ready(_ => {
            window.grecaptcha
            .execute(process.env.REACT_APP_GOOGLE_RECAPTCHA, { action: "contact" })
            .then(token => {
                submitContactForm(token)
            })
        })
    }, [ submitContactForm ] )


    useEffect(() => {
        // Add reCaptcha to page
        const script = document.createElement("script")
        script.id = 'captchaScript'
        script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.REACT_APP_GOOGLE_RECAPTCHA}`
        script.async = true
        document.body.appendChild(script)
    }, [])
    

    const onSubmit = useCallback(async(e) => {
        e.preventDefault()
        handleReCaptcha()
    }, [ handleReCaptcha, ]);
    

    const resetState = () => {
        setName('')
        setEmail('')
        setPhone('')
        setMessage('')
        setIsEmailRequired(true)
        setIsPhoneRequired(true)
    }

    const setRequiredField = (e) => {
        const { name } = e.target
        const value = sanitizeData(e.target.value)
        if(name === 'email'){
            setEmail(value)
            if(email.length > 0){
                setIsEmailRequired(false)
                setIsPhoneRequired(false)
            } else {
                setIsEmailRequired(true)
            }
        } 
        if(name === 'phone'){
            setPhone(value)
            if(phone.length > 0){
                setIsPhoneRequired(false)
                setIsEmailRequired(false)
            } else {
                setIsPhoneRequired(true)
            }
        } 
    }


    return (
        
        <div className='contact-wrapper'>
            <div className='contact-left-wrapper'>
                <h2 className='contact-quote'> If the women don't find you handsome, </h2>
                <h2 className='contact-quote'> they should at least find you handy. </h2>
                <div className='button-wrapper'>
                    <button className='btn btn-orange'>
                        <a className='contact-call' href="tel:+13852024334"> Call Now </a>
                    </button>
                </div>
            </div>
            <div className='contact-right-wrapper'>
                <form className='contact-form' onSubmit={onSubmit}>
                    <label className='form-label'> Name </label>
                    <input 
                        type='text'
                        value={name}
                        onChange = {e => setName(sanitizeData(e.target.value))}
                    />
                    <label className='form-label'> Email </label>
                    <input 
                        name='email'
                        type='email'
                        value={email}
                        required={isEmailRequired}
                        onChange = {e => setRequiredField(e)}
                    />
                    <label className='form-label'> Phone </label>
                    <input 
                        name='phone'
                        type='phone'
                        value={phone}
                        required={isPhoneRequired}
                        onChange = {e => setRequiredField(e)}
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
                            <div className="loader-wrapper">
                                <span className="loader"><span className="loader-inner"></span></span>
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