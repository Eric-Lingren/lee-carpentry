import { useContext, useEffect } from 'react'
import { ProjectContext } from '../../context/ProjectProvider'
import sanitizeData from '../../shared/utils/SanitizeData'

const AdminProjectCreate = () => {
    const { 
        handleCreateNewProject, 
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
        uploadSuccess,
        setUploadSuccess,
        allImagesAsFiles
    } = useContext(ProjectContext)


    useEffect(() => {
        if(uploadSuccess !== null){
            setTimeout(() => {
                setUploadSuccess(null)
            }, 5000)
        }
    }, [uploadSuccess, setUploadSuccess])


    const mappedCategories = allCategories.map( (category, i) => {
        return(
            <div key={i}>
                <p>{category}</p>
            </div>
        )
    })


    const mappedImagePreviews = allImagesAsFiles.map( (image, i) => {
        let file = URL.createObjectURL(image)
        return <img key={i} alt='upload-preview' src={file} style={{width: '200px', height: 'auto', margin: '5px' }} />
    })


    return(
        <div>
            <h1> Admin Project Create </h1>
            {mappedImagePreviews}
            <form>
                <input 
                    type = 'file'
                    onChange = {(e) => addImage(e.target.files[0])}
                />
                <label>Title:</label>
                <input
                    type = 'text'
                    placeholder = 'Title'
                    value = {projectTitle}
                    onChange = {e => setProjectTitle(sanitizeData(e.target.value))}
                />
                <label>Description:</label>
                <textarea
                    rows={10} 
                    cols={25}
                    placeholder = 'Description'
                    value = {projectDescription}
                    onChange = {e => setProjectDescription(sanitizeData(e.target.value))}
                />
                <label>Location:</label>
                <input
                    type = 'text'
                    placeholder = 'Location'
                    value = {projectLocation}
                    onChange = {e => setProjectLocation(sanitizeData(e.target.value))}
                />
                <label>Categories:</label>
                <input
                    type = 'text'
                    placeholder = 'Category'
                    value = {categoryText}
                    onChange = {e => setCategoryText(sanitizeData(e.target.value))}
                />
                { allCategories.length > 0 && mappedCategories }
                <button onClick={addCategory}> Add Category </button>
                <button onClick={handleCreateNewProject}> Create Project </button>
            </form>
            {uploadSuccess && <h2>Project Successfully Uploaded</h2>}
            {uploadSuccess === false && <h2>Project Failed To Upload</h2>}

        </div>
    )
}

export default AdminProjectCreate