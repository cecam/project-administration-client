import { useContext } from 'react'
import projectContext from '../../context/projects/projectContext'
import taskContext from '../../context/tasks/taskContext'

const Project = ({project}) => {
    const tasksContext = useContext(taskContext)
    const {getProjectTasks} = tasksContext


    const projectsContext = useContext(projectContext)
    const {currentProject} = projectsContext

    const selectProject = id => {
        currentProject(id)
        getProjectTasks(id)
    }

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => selectProject(project._id)}
            >{project.name}</button>  
        </li>
    )
}

export default Project