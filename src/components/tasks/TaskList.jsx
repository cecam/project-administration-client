import {useContext} from 'react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'

import projectContext from '../../context/projects/projectContext'
import taskContext from '../../context/tasks/taskContext'

import Task from './Task'

const TaskList = () => {
    const tasksContext = useContext(taskContext)
    const {projectTasks} = tasksContext

    const projectsContext = useContext(projectContext)
    const {project, deleteProject} = projectsContext

    //if there's no selected project
    if(!project) return <h1>Select a Project</h1>

    const [currentProject] = project

    return (
        <>
            <h2>Project: {currentProject.name}</h2>
            <ul className="listado-tareas">
                {projectTasks.length === 0
                    ?
                        (<li className="tarea">There are not tasks yet</li>)
                    :
                        <TransitionGroup>
                            {projectTasks.map(task => (
                                <CSSTransition 
                                    key={task._id}
                                    timeout={200}
                                    classNames="tarea"    
                                >
                                    <Task 
                                        task={task}                                        
                                    />
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                        
                }   
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={() => deleteProject(currentProject._id)}
            >Delete project &times;</button>

        </>
    )
}

export default TaskList