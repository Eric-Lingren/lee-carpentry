import { useState, useEffect, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faEdit, faTimesCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import sanitizeData from '../../shared/utils/SanitizeData'
import { ProjectContext } from '../../context/ProjectProvider'
import Modal from 'react-modal'


const customStyles = {
    content : {
        marginRight: '0%',
        marginLeft: '0%',
        border: '4px solid #156477'
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    }
}



const InfoModal = ({ project }) => {
    const { 
        addImage, 
        allImagesAsFiles, 
        submitUpdateProject, 
        setProjectUpdateSuccess, 
        projectUpdateSuccess,
        deleteProject
    } = useContext(ProjectContext)
    const [ modalIsOpen, setIsOpen ] = useState(false)
    const [ editTitle, setEditTitle ] = useState(project.projectTitle)
    const [ editDescription, setEditDescription ] = useState(project.projectDescription)
    const [ editLocation, setEditLocation ] = useState(project.projectLocation)
    const [ newCategory, setNewCategory ] = useState('')
    const [ editAllCategories, setEditAllCategories ] = useState(project.categories)
    const [ editAllImages, setEditAllImages ] = useState(project.imageUrls)
    const [ imagesToRemove, setImagesToRemove ] = useState([])
    const openModal = () => setIsOpen(true)
    const closeModal = ()=> setIsOpen(false)

    useEffect(() => {
        if(projectUpdateSuccess !== null){
            setTimeout(() => {
                setProjectUpdateSuccess(null)
            }, 5000)
        }
    }, [projectUpdateSuccess, setProjectUpdateSuccess])

    const removeCategory = (removedItem) => {
        let newCategoriesArray = [...editAllCategories] 
        const index = newCategoriesArray.indexOf(removedItem)
        if (index > -1) newCategoriesArray.splice(index, 1)
        setEditAllCategories(newCategoriesArray)
    }

    const addNewCategory = () => {
        let updatedCategories = [...editAllCategories, newCategory] 
        setEditAllCategories(updatedCategories)
        setNewCategory('')
    }

    const removeImage = (removedImage) => {
        let newImagesArray = [...editAllImages] 
        const index = newImagesArray.indexOf(removedImage)
        if (index > -1) newImagesArray.splice(index, 1)
        setEditAllImages(newImagesArray)
        setImagesToRemove([...imagesToRemove, removedImage])
    }


    const handleSubmitEdits = () => {
        let updatedProject = {
            id: project.id,
            projectTitle: editTitle,
            projectDescription: editDescription,
            projectLocation: editLocation,
            categories: editAllCategories, 
            removeImages: imagesToRemove, 
            imageUrls: [...editAllImages]
        }
        submitUpdateProject(updatedProject)
    }

    const mappedCategories = editAllCategories.map( (category, i) => {
        return (
            <div key={i}>
                <p key={category}> 
                    {category} 
                    <FontAwesomeIcon icon={faTimesCircle} onClick={e => removeCategory(category)}/> 
                </p>
            </div>
        )
    })


    const mappedImagePreviews = editAllImages.map( (image, i) => {
        return (
            <div key={i}>
                <img alt='upload-preview' src={image} style={{width: '200px', height: 'auto', margin: '5px' }} />
                <FontAwesomeIcon icon={faTimesCircle} onClick={e => removeImage(image)}/> 
            </div>
        )
    })

    const newImagesPreview = allImagesAsFiles.map( (image, i) => {
        let file = URL.createObjectURL(image)
        return <img key={i} alt='upload-preview' src={file} style={{width: '200px', height: 'auto', margin: '5px' }} />
    })


    return (
        <div>
            <FontAwesomeIcon onClick={openModal} className='project-edit-button' icon={faEdit} />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                ariaHideApp={false}
                contentLabel="Example Modal"
            >
                
                <div>
                    <FontAwesomeIcon onClick={closeModal}  style={{fontSize: '24px'}} icon={faTimesCircle} />
                </div>
                <div>
                    <FontAwesomeIcon 
                        onClick={() => deleteProject(project.id)}  
                        style={{fontSize: '24px', margin: '20px', color: 'red'}} 
                        icon={faTrash} 
                    />
                </div>
                <div className='modal-header-container'>
                    <h1 className='modal-header'> Editing Project: {project.projectTitle}  </h1>
                </div>
                <div>
                    <h3>Title:</h3>
                    <input
                        type='text'
                        value={editTitle}
                        onChange={e => setEditTitle(sanitizeData(e.target.value))}
                    />

                    <h3>Description:</h3>
                    <textarea
                        rows={10} 
                        cols={25}
                        value={editDescription}
                        onChange = {e => setEditDescription(sanitizeData(e.target.value))}
                    />

                    <h3>Location:</h3>
                    <input
                        type='text'
                        value={editLocation}
                        onChange={e => setEditLocation(sanitizeData(e.target.value))}
                    />

                    <h3>Categories:</h3>
                    <input
                        type='text'
                        value={newCategory}
                        onChange={e => setNewCategory(sanitizeData(e.target.value))}
                    />
                    <button onClick={addNewCategory}> Add </button>
                    {mappedCategories}

                    <h3>Images:</h3>
                    <h4> Add New Images: </h4>
                    { newImagesPreview }
                    <input 
                        type = 'file'
                        onChange = {(e) => addImage(e.target.files[0])}
                    />
                    <h4> Remove Existing Images: </h4>
                    { mappedImagePreviews }
                    <button onClick={handleSubmitEdits}>Save All Edits</button>
                    {projectUpdateSuccess && <h2>Project Successfully Updated</h2>}
                    {projectUpdateSuccess === false && <h2>Project Failed To Update</h2>}
                </div>
            </Modal>
        </div>
    );
}

export default InfoModal