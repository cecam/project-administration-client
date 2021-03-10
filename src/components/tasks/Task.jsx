import {useContext} from 'react'
import taskContext from '../../context/tasks/taskContext'
import projectContext from '../../context/projects/projectContext'

const Task = ({task}) => {

    const tasksContext = useContext(taskContext)
    const {deleteTask, getProjectTasks, updateTask, setCurrentTask} = tasksContext

    const projectsContext = useContext(projectContext)
    const {project} = projectsContext

    const [currentProject] = project

    const handlerDeleteTaks = id => {
        deleteTask(id, currentProject._id)
        getProjectTasks(currentProject.id)
    }

    const handlerStatus = task => {
        task.status = !task.status

        updateTask(task)
    }

    const selectTask = task => {
        setCurrentTask(task)
    }

    return(
        <li className="tarea sombra">
            <p>{task.name}</p>
            <div className="estado">
                {task.status 
                    ?
                        (
                            <button 
                                type="button"
                                className="completo"
                                onClick={() => handlerStatus(task)}
                            >
                                Complete
                            </button>
                        )
                    :
                        (
                            <button 
                                type="button"
                                className="incompleto"
                                onClick={() => handlerStatus(task)}
                            >
                                Incomplete
                            </button>
                        )                    
                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => selectTask(task)}
                >Update</button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => handlerDeleteTaks(task._id)}
                >Delete</button>
            </div>
        </li>
    )
}

export default Task