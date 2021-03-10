import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Projects from './components/projects/Proyects';
import PrivateRoute from './components/routes/PrivateRoute'

import ProjectState from './context/projects/projectState'
import TaskState from './context/tasks/taskState'
import AlertState from './context/alerts/alertState'
import AuthState from './context/authentication/authState'
import authToken from './config/authToken'

const token = localStorage.getItem('token')
if(token){
  authToken(token)
}

function App() {
  return (
    <AuthState>
      <ProjectState>
        <TaskState>
          <AlertState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute exact path="/projects" component={Projects} />
              </Switch>
            </Router>
          </AlertState>
        </TaskState>
      </ProjectState>
    </AuthState>
  );
}

export default App;
