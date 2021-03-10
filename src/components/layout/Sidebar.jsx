import NewProject from '../projects/NewProject'
import ProjectList from '../projects/ProjectList'

const Sidebar = () => {
    return (
        <aside>
            <h1>MENT<span>Task</span></h1>
            <NewProject />

            <div className="proyectos">
                <h2>Your projects</h2>
                <ProjectList />
            </div>
        </aside>
    )
}

export default Sidebar