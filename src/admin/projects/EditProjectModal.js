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
        border: '4px solid #156477',
        backgroundColor: '#fefae0'
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

    const confirmDelete = (id) => {
        if(window.confirm(`Are you sure you would like permanently delete this project ${project.projectTitle}? It will be irrecoverable.`)) {
            deleteProject(id)
            window.alert(`${project.projectTitle} has been deleted. Please refresh the page.`)
        }
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
                    <FontAwesomeIcon 
                        style={{marginLeft: '10px', color: 'red'}}
                        icon={faTimesCircle} 
                        onClick={e => removeCategory(category)}
                    /> 
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
        <div className='project-edit-modal-wrapper'>
            <FontAwesomeIcon onClick={openModal} className='project-edit-button' icon={faEdit} />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                ariaHideApp={false}
                contentLabel="Example Modal"
            >
                
                <div className='project-edit-modal-close-btn-wrap'>
                    <FontAwesomeIcon 
                        onClick={closeModal}  
                        className='project-edit-modal-close-btn-icon'
                        icon={faTimesCircle}
                    />
                </div>
                
                <div className='modal-header-container'>
                    <h1 className='project-edit-modal-section-header'> Editing Project: {project.projectTitle}  </h1>
                </div>
                <div>
                    <div className='project-edit-modal-section-wrap'>
                        <h2 className='project-edit-modal-section-header'>
                            Title:
                        </h2>
                        <input
                            className='project-edit-modal-section-input'
                            type='text'
                            value={editTitle}
                            onChange={e => setEditTitle(sanitizeData(e.target.value))}
                        />
                    </div>
                    <div className='project-edit-modal-section-wrap'>
                        <h2 className='project-edit-modal-section-header'>
                            Description:
                        </h2>
                        <textarea
                            className='project-edit-modal-section-text-area'
                            value={editDescription}
                            onChange = {e => setEditDescription(sanitizeData(e.target.value))}
                        />
                    </div>
                    <div className='project-edit-modal-section-wrap'>
                        <h2 className='project-edit-modal-section-header'>
                            Location:
                        </h2>
                        <input
                            className='project-edit-modal-section-input'
                            type='text'
                            value={editLocation}
                            onChange={e => setEditLocation(sanitizeData(e.target.value))}
                        />
                    </div>
                    <div className='project-edit-modal-section-wrap'>
                        <h2 className='project-edit-modal-section-header'>
                            New Category:
                        </h2>
                        <input
                            className='project-edit-modal-section-input'
                            type='text'
                            value={newCategory}
                            onChange={e => setNewCategory(sanitizeData(e.target.value))}
                        />
                    </div>
                    <div className='project-edit-modal-section-btn-wrap'>
                        <button 
                            className='btn btn-orange'
                            onClick={addNewCategory}
                            > 
                            Add New Category 
                        </button>
                    </div>
                    
                    <h2 className='project-edit-modal-section-header'>
                        Remove Categories:
                    </h2>
                    {mappedCategories}
                    <h2 className='project-edit-modal-section-header'> 
                        Add Images: 
                    </h2>

                    <input 
                        type = 'file'
                        onChange = {(e) => addImage(e.target.files[0])}
                        />
                    <div className='project-edit-modal-image-container'>
                        { newImagesPreview }
                    </div>
                    <h2 className='project-edit-modal-section-header'> 
                        Remove Existing Images: 
                    </h2>
                    <div className='project-edit-modal-image-container'>
                        { mappedImagePreviews } 
                    </div>
                    <button 
                        className='btn btn-brown'
                        onClick={handleSubmitEdits}
                    >
                            Save All Edits
                    </button>
                    <div className='project-edit-modal-delete-wrapper'>
                        <h2 className='project-edit-modal-section-header'>
                            Delete Project:
                        </h2>
                        <FontAwesomeIcon 
                            onClick={() => confirmDelete(project.id)} 
                            className='project-edit-modal-delete-btn' 
                            icon={faTrash} 
                        />
                    </div>
                    {projectUpdateSuccess && <h2>Project Successfully Updated</h2>}
                    {projectUpdateSuccess === false && <h2>Project Failed To Update</h2>}
                </div>
            </Modal>
        </div>
    );
}

export default InfoModal