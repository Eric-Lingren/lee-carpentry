import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

import config from '../config/config' 

class Firebase {
    constructor() {
        firebase.initializeApp(config.firebaseConfig)
        this.auth = firebase.auth()
        this.db = firebase.firestore()
        this.storage = firebase.storage()
    }
}
const firebaseConstructor = new Firebase()

export default firebaseConstructor