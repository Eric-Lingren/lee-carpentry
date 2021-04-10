import { useContext, useState } from 'react'
import { ProjectContext } from '../../context/ProjectProvider'
import firebase, { FirebaseContext } from '../../firebase/FirebaseIndex'
import sanitizeData from '../../shared/utils/SanitizeData'

const AdminProjectCreate = () => {
    const { 
        handleCreateNewProject, 
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
        allCategories
    } = useContext(ProjectContext)


    const mappedCategories = allCategories.map( (category, i) => {
        return(
            <div key={i}>
                <p>{category}</p>
            </div>
        )
    })

    return(
        <div>
            <h1> Admin Project Create </h1>

            // Images
            // title
            // description
            // categories
            // location

            <form>
                <input 
                    type = 'file'
                    onChange = {(e) => setImageAsFile(e.target.files[0])}
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

        </div>
    )
}

export default AdminProjectCreate