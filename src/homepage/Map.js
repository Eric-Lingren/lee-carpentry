import UtahOutline from '../assets/utah-outline.png'
const Map = () => {
    return (
        <div className='map-wrapper'>
                <img className='map-image' src={UtahOutline} />
                <div className='map-text-container'>
                    <h2 className='map-text'> All Inclusive Carpentry Services </h2>
                    <h2 className='map-text'> Across the Wasatch Front </h2>
                    <button className="btn btn-orange map-btn"> Contact Us </button>
                </div>
        </div>
    )
}

export default Map