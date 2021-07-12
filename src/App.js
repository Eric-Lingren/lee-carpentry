// import {useState, useContext} from 'react'
import firebase, { FirebaseContext } from './firebase/FirebaseIndex'
import { Route, Switch } from 'react-router-dom'
import ProtectedRoute from './shared/ProtectedRoute'
import Homepage from './homepage/Homepage'
import AdminLogin from './admin/AdminLogin'
import AdminProjectHome from './admin/projects/AdminProjectHome'
import AdminProjectCreate from './admin/projects/AdminProjectCreate'
import AdminProjectEdit from './admin/projects/AdminProjectEdit'
import ProjectsHome from './projects/ProjectsHome'
import ProjectDetails from './projects/ProjectDetails'
import Navbar from './navbar/Navbar'
import Contact from './contact/Contact'
import Footer from './footer/Footer'


const App = () => {

  return (
    <FirebaseContext.Provider value={{ firebase }}>
      <Navbar />
      <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/projects/:id' component={ProjectDetails} />
          <Route path='/projects' component={ProjectsHome} />
          <Route path='/contact' component={Contact} />
          <ProtectedRoute path='/admin/projects/create' Component={AdminProjectCreate} />
          <ProtectedRoute path='/admin/projects/edit' Component={AdminProjectEdit} />
          <ProtectedRoute path='/admin/projects' Component={AdminProjectHome} />
          <Route path='/admin' component={AdminLogin} />
        </Switch>
      <Footer />
    </FirebaseContext.Provider>
  )
}


export default App




// GET

// function handleSnapshot(snapshot) {
//   const projects = snapshot.docs.map(doc => {
//     return { id: doc.id, ...doc.data() }
//   })
//   console.log(projects)
//   // setProjects(projects)
//   // setLoading(false)
// }


// function getMessages() {
//   let msg =  firebase.db.collection('messages').orderBy('created', 'desc').onSnapshot(handleSnapshot)
//   console.log(msg)
// }

// getMessages()






//  POST  

// const INITIAL_STATE = {
//   name: "",
//   email: "",
//   subject: "",
//   message: "",
// }

// function PageFour() {
//   const {firebase} = useContext(FirebaseContext)
//   const [values, setValues] = useState(INITIAL_STATE)
//   const [submitted, setSubmitted] = useState(false)
//   const [error, setError] = useState(null)

//   function handleCreateMessage(event) {
//     event.preventDefault()
//       try {
//           const { name, email, subject, message } = values
//           const newFeedback = {
//               name,
//               email,
//               subject,
//               message,
//               created: Date.now(),
//               isRead: false
//           }
//           firebase.db.collection('messages').add(newFeedback)
//           setSubmitted(true)
//       } catch(err) {
//           console.error('Error sending the message')
//           setError('There was a problem sending your message. Please try again.')
//       }
//   }
//   function handleChange(event) {
//       event.persist();
//       setValues(previousValues => ({
//           ...previousValues,
//           [event.target.name]: event.target.value
//       }))
//   }
//     return (
//       <div id="message" className='pageFour'>
//         <div className="pageFour__parallax">
//         <div className="pageFour__title">
//             <h1 className="pageFour__portfolio__header">Message</h1>
//         </div>  
//         {!submitted ? 
//           <form className="form" onSubmit={handleCreateMessage}>
//             <div className="form__group">
//               <input name="name" onChange={handleChange} value={values.name} type="text" className="fullName" placeholder="Your Name"></input>
//             </div>
//             <div className="form__group">
//               <input name="email" onChange={handleChange} value={values.email} type="email" className="email" placeholder="Your Email"></input>
//             </div>
//             <div className="form__group">
//               <input name="subject" onChange={handleChange} value={values.subject} type="subject" className="subject" placeholder="Subject"></input>
//             </div>
//             <div className="form__group">
//               <textarea name="message" onChange={handleChange} value={values.message} className="message" placeholder="Message"></textarea>
//             </div>
//             <div className="centered-btn-wrapper">
//                 <button type="submit" className="btn">Send</button>
//             </div>
//             {error && <div className="error">{error}</div>}
//           </form>
//           :
//           <div className="form-success-background">
//             <div className="success">Your message has been sent!</div>
//         </div>
//         }
//           </div>
//       </div>
//     );
//   }



//   const App = () => {
//     return (
  
//       <FirebaseContext.Provider value={{ firebase }}>
//         <div>
//           APP
//           <PageFour />
//         </div>
//       </FirebaseContext.Provider>
//     )
//   }
  
//   export default App
  

