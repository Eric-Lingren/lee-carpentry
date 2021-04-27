import React, { useState } from 'react'
import firebase from '../firebase/FirebaseIndex'

export const ProjectContext = React.createContext()

const  ProjectContextProvider = (props) => {
    const [ allImagesAsFiles, setAllImagesAsFiles ] = useState([])
    const [ projectTitle, setProjectTitle ] = useState('')
    const [ projectDescription, setProjectDescription ] = useState('')
    const [ projectLocation, setProjectLocation ] = useState('')
    const [ categoryText, setCategoryText ] = useState('')
    const [ allCategories, setAllCategories ] = useState([])
    const [ uploadSuccess, setUploadSuccess ] = useState(null)
    const [ projectUpdateSuccess, setProjectUpdateSuccess ] = useState(null)


    const addCategory = (e) => {
        e.preventDefault()
        setAllCategories([...allCategories, categoryText])
        setCategoryText('')
    }


    const addImage = (imageValue) => {
        setAllImagesAsFiles([...allImagesAsFiles, imageValue])
    }


    const handleCreateNewProject = async (e) => {
        e.preventDefault()

        let imageUrls = await handleImageUploads()
        setAllImagesAsFiles([])
        submitProjectToFirebase(imageUrls)
        // let firebaseImagePromises = []
        // allImagesAsFiles.forEach(image => {
        //     firebaseImagePromises.push(uploadImageAsPromise(image))
        // })

        // Promise.all(firebaseImagePromises)
        // .then( urls => {
        //     console.log(urls)
        //     submitProjectToFirebase(urls)
        // })
        // .catch((error) => {
        //     console.log(error)
        // })
    }

    const handleImageUploads = async () => {
        let firebaseImagePromises = []
        allImagesAsFiles.forEach(image => {
            firebaseImagePromises.push(uploadImageAsPromise(image))
        })
        return Promise.all(firebaseImagePromises)
        .then( urls => urls )
        .catch(err => err)
    }


    const uploadImageAsPromise = async (image) => {
        const storageRef = firebase.storage.ref()
        const fileRef =  storageRef.child(image.name)
        const metadata = { contentType: 'image/jpeg' }

        await fileRef.put(image, metadata)
            .then(res => res)
            .catch(err => err)
        const imageUrl = await fileRef.getDownloadURL().then( url => url )
        return imageUrl
    }


    const submitProjectToFirebase = (firebaseImageUrls) => {
        try {
            const newProject = {
                projectTitle,
                projectDescription,
                projectLocation,
                categories: allCategories,
                imageUrls: firebaseImageUrls,
                created: Date.now()
            }
            firebase.db.collection('projects').add(newProject)
            setUploadSuccess(true)
        } catch(err) {
            console.error(err)
            setUploadSuccess(false)
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


    const getOneProject = async (projectId) => {
        let selectedProject = {}
        await firebase.db.collection('projects')
        .doc(projectId)
        .get()
        .then(doc => selectedProject = doc.data() )
        return selectedProject
    }


    const submitUpdateProject = async (updatedProject) => {
        if(updatedProject.removeImages.length){
            await beginImageDeletion(updatedProject.removeImages)
        }
        if(allImagesAsFiles.length){
            let imageUrls = await handleImageUploads()
            updatedProject['imageUrls'] = [...updatedProject['imageUrls'], ...imageUrls]
        }
        let updateResult = await sendProjectUpdatesToFirebase(updatedProject)
        if(updateResult === true){
            setProjectUpdateSuccess(true)
        } else {
            setProjectUpdateSuccess(false)
        }
    }



    const beginImageDeletion = async (stagedDeletions) => {
        let firebaseImageRemovalPromises = []
        stagedDeletions.forEach(imageUrl => {
            firebaseImageRemovalPromises.push(removeFirebaseImageAsPromise(imageUrl))
        })
        return Promise.all(firebaseImageRemovalPromises)
        .then( res => console.log(res))
        .catch(err => console.log(err))
    }


    const removeFirebaseImageAsPromise = async (imageUrl) => {
        let fileName = extractFileNameFromFirebaseUrl(imageUrl)
        const storageRef = firebase.storage.ref()
        let imageRef = storageRef.child(fileName)
        return await imageRef.delete()
            .then(() => true )
            .catch(err => err)
    }


    const extractFileNameFromFirebaseUrl = (url) => {
        let domain = 'https://firebasestorage.googleapis.com/v0/b/nik-construction.appspot.com/o/'
        let searchValue = '?alt='
        let newStr = url.replace(domain, '') // Removes the domain
        let fileEndIndex = newStr.indexOf(searchValue, 0) // Finds the end index of the file name
        let dirtyFileName = newStr.slice(0, fileEndIndex) // Returns the file name
        let outputFileName = dirtyFileName.replace(/%20/g, " ") // Convert html enncoded spaces into string spaces
        return outputFileName
    }


    const sendProjectUpdatesToFirebase = async (updatedProject) => {
        let projectRef = firebase.db.collection("projects").doc(updatedProject.id)

        delete updatedProject['removeImages']
        delete updatedProject['id']
        console.log(updatedProject)

        return projectRef.update(updatedProject)
        .then(() => true)
        .catch(err => err)
    }


    const deleteProject = (projectId) => {
        firebase.db.collection('projects')
            .doc(projectId)
            .delete()
            .then(() => {
                console.log("Document successfully deleted!")
            }).catch((error) => {
                console.error("Error removing project: ", error)
            })
    }


    return (
        <ProjectContext.Provider value={{
            addImage,
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
            getAllProjects,
            getOneProject,
            uploadSuccess,
            setUploadSuccess,
            allImagesAsFiles,
            submitUpdateProject,
            projectUpdateSuccess,
            setProjectUpdateSuccess,
            deleteProject
        }}>
            {props.children}
        </ProjectContext.Provider>
    )
}

export default ProjectContextProvider