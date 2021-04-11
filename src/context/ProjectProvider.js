import React, { useState } from 'react'
import firebase from '../firebase/FirebaseIndex'
// import { useHistory } from 'react-router-dom'

export const ProjectContext = React.createContext()

const  ProjectContextProvider = (props) => {
    // let history = useHistory()
    const [ imageAsFile, setImageAsFile ] = useState('')
    // const [ imageUrl, setImageUrl ] = useState('')
    const [ projectTitle, setProjectTitle ] = useState('')
    const [ projectDescription, setProjectDescription ] = useState('')
    const [ projectLocation, setProjectLocation ] = useState('')
    const [ categoryText, setCategoryText ] = useState('')
    const [ allCategories, setAllCategories ] = useState([])

    // console.log(categoryText)


    const addCategory = (e) => {
        e.preventDefault()
        setAllCategories([...allCategories, categoryText])
        setCategoryText('')
    }

    const handleCreateNewProject = async (e) => {
        e.preventDefault()
        if(imageAsFile === '' ) {
            console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
        } else {
            const firebaseImageUrl = await uploadImage()
            submitProjectToFirebase(firebaseImageUrl)
        }
    }

    const uploadImage = async () => {
        const storageRef = firebase.storage.ref()
        const fileRef =  storageRef.child(imageAsFile.name)
        await fileRef.put(imageAsFile)
            .then(res => res)
            .catch(err => err)
        const imageUrl = await fileRef.getDownloadURL().then( url => url )
        return imageUrl
    }

    const submitProjectToFirebase = (firebaseImageUrl) => {
        try {
            const newProject = {
                projectTitle,
                projectDescription,
                projectLocation,
                categories: allCategories,
                imageUrls: [firebaseImageUrl],
                created: Date.now()
            }
            console.log(newProject)
            firebase.db.collection('projects').add(newProject)
            // setSubmitted(true)
        } catch(err) {
            console.error('Error creating project')
            // setError('There was a problem sending your message. Please try again.')
        }
    }


    const getAllProjects = async () => {
        let allProjects = []
        await firebase.db.collection('projects').orderBy('created', 'desc')
        .get()
        .then(querySnapshot => {
            const projects = querySnapshot.docs.map(doc => {
                return { id: doc.id, ...doc.data() }
            })
            allProjects = projects
        })
        return allProjects
    }



    return (
        <ProjectContext.Provider value={{
            setImageAsFile,
            projectTitle,
            setProjectTitle,
            projectDescription, 
            setProjectDescription,
            projectLocation, 
            setProjectLocation,
            categoryText,
            setCategoryText,
            addCategory, 
            allCategories,
            handleCreateNewProject,
            getAllProjects
        }}>
            {props.children}
        </ProjectContext.Provider>
    )
}

export default ProjectContextProvider