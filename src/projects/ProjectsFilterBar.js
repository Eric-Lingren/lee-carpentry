import { useState } from 'react' 

const ProjectsFilterBar = ({ setFilteredProjects }) => {
    const [activeIndex, setActiveIndex] = useState(0)


    const handleClick = (i, name) => {
        setActiveIndex(i)
        // setSelctedFilter(name.toLowerCase())
        setFilteredProjects(name.toLowerCase())
    }

    // console.log(selectedFilter)

    const clickableOptions = [
        { name: 'All' },
        { name: 'Framing' },
        { name: 'Carpentry' },
        { name: 'Decks' },
        { name: 'Landscaping' },
    ]

    const filters = clickableOptions.map( (clickable, i) => {
        return (
            <span 
                key={ clickable.name }
                name={ clickable.name }
                className={activeIndex === i ? 'projects-filter-text selected' : 'projects-filter-text' }
                index={ i }
                onClick={() => handleClick(i, clickable.name ) }
            > 
                {clickable.name} 
            </span>
        )
    })

    return (
        <div className='projecs-filter-bar-wrapper'>
            { filters }
        </div>
    )
}

export default ProjectsFilterBar