import Sidebar from '../layout/Sidebar'
import { useContext, useEffect } from 'react'

import NavBar from '../layout/NavBar'
import TaskForm from '../tasks/TaskForm'
import TaskList from '../tasks/TaskList'

import AuthContext from '../../context/authentication/authContext'


const Projects = () => {
    const authContext = useContext(AuthContext)
    const { getUser } = authContext

    useEffect(() => {
        getUser()
    }, [])
    return(
        <div className="contenedor-app">
            <Sidebar />
            <div className="seccion-principal">
                <NavBar />
                <main>
                    <TaskForm />
                    <div className="contenedor-tareas">
                        <TaskList />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Projects