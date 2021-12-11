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