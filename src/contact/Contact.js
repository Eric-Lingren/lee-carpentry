
const Contact = () => {

    return (
        <div>
            <h1> Contact Page </h1>

            <div>
                <div>
                    <h2> If the women don't find you handsome </h2>
                    <h2> they should at least find you handy. </h2>
                    <button>Call Now </button>
                </div>
                <div>
                    <form>
                        <label> Name </label>
                        <input 
                            type='text'
                        />
                        <label> Email </label>
                        <input 
                            type='email'
                        />
                        <label> Message </label>
                        <textarea
                            rows={10} 
                            cols={25}
                        />
                        <button> Send </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact