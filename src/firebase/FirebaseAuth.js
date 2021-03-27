import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import config from '../config/config' 

class Firebase {
    constructor() {
        app.initializeApp(config.firebaseConfig)
        this.auth = app.auth()
        this.db = app.firestore()
    }
}
const firebase = new Firebase()

export default firebase