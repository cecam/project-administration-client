import {useContext, useEffect} from 'react'
import Project from './Project'

import projectContext from '../../context/projects/projectContext'
import AlertContext from '../../context/alerts/alertContext'

const ProjectList = () => {
    const projectsContext = useContext(projectContext)
    const {projects, message, getProjects} = projectsContext

    const alertContext = useContext(AlertContext)
    const { alert, showAlert } = alertContext
    
    useEffect(() => {
        if(message){
            showAlert(message.msg, message.category)
        }

        getProjects()
    }, [message])

    if (projects.length === 0) {
        return <p>No proyects yet</p>
    }

    return (
        <ul className="listado-proyectos">
            { alert ? <div className={`alerta ${alert.category}`}>{alert.msg}</div> : null}

            {
                projects.map(project => (
                    <Project project={project} key={project._id} />
                ))
            }
        </ul>
    )
}

export default ProjectList