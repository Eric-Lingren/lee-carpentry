import { NavLink } from 'react-router-dom'


const Footer = () => {

    return (
        <div className='footer-wrapper'>
            <button className='btn btn-brown'>
                <NavLink className='footer-quote-navlink' to='/contact'> Request a Free Quote </NavLink>
            </button>
        </div>
    )
}

export default Footer