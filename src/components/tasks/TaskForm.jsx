import {useContext, useState, useEffect} from 'react'
import projectContext from '../../context/projects/projectContext'
import taskContext from '../../context/tasks/taskContext'

const TaskForm = () => {
    const projectsContext = useContext(projectContext)
    const {project} = projectsContext

    const tasksContext = useContext(taskContext)
    const {errorTask, currentTask, addTask, validateTask, getProjectTasks, updateTask} = tasksContext

    useEffect(() => {
        if(currentTask != null){
            setTask(currentTask)
        } else {
            setTask({
                name: ''
            })
        }
    },[currentTask])

    const [task, setTask] = useState({
        name: '',
    })

    const handleInputChange = e => {
        setTask({
            ...task,
            [e.target.name] : e.target.value
        })
    }

    //if there's no selected project
    if(!project) return null

    const [currentProject] = project

    const createTask = e => {
        e.preventDefault()

        if(task.name.trim() === ''){
            validateTask()
            return
        }

        if(currentTask != null) {
            updateTask(task)
        } else {
            task.project = currentProject._id
            addTask(task)
        }


        getProjectTasks(currentProject._id)

        setTask({
            name: '',
        })
    }

    return (
        <div className="formulario">
            <form
                onSubmit={createTask}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"    
                        placeholder="Task name"
                        onChange={handleInputChange}
                        value={task.name}
                        name="name"
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-block"
                        value={currentTask ? 'Update task' : 'Add task'}
                    />
                </div>
            </form>
            {errorTask ? <p className="mensaje error">The name is required</p> : null}
        </div>
    )
}

export default TaskForm