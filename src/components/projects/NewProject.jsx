import {useState, useContext} from 'react'
import projectContext from '../../context/projects/projectContext'

const NewProject = () => {

    const projectsContext = useContext(projectContext)
    const {form, showForm, addProject, errorForm, showError, getProjects} = projectsContext

    const [project, setProject] = useState({
        name: ''
    })

    const {name} = project

    const onChangeProject = e => {
        setProject({
            ...project,
            [e.target.name] : e.target.value
        })
    }

    const onSubmitProject = e => {
        e.preventDefault()

        if(name === ''){
            showError()
            return
        }

        addProject(project)

        getProjects()

        setProject({
            name: ''
        })
    }

    return (
        <>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={() => showForm()}
            >New Project</button>

            {
                form 
                ?
                    (
                        <form
                            className="formulario-nuevo-proyecto"
                            onSubmit={onSubmitProject}
                        >
                            <input 
                                type="text"
                                className="input-text"
                                placeholder="Name of the new project"    
                                name="name"
                                value={name}
                                onChange={onChangeProject}
                            />
                            <input 
                                type="submit"
                                className="btn btn-primario btn-block"
                                value="Add project"
                            />
                        </form>

                    )
                : null
            }
            {errorForm ? <p className="mensaje error">The name is necesary</p>  : null}
        </>
    )
}

export default NewProject