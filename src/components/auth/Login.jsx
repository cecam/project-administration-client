import { useState, useContext, useEffect } from 'react'
import {Link} from 'react-router-dom'

import AlertContext from '../../context/alerts/alertContext'
import AuthContext from '../../context/authentication/authContext'

const Login = (props) => {
    const alertContext = useContext(AlertContext)
    const {alert, showAlert} = alertContext

    const authContext = useContext(AuthContext)
    const { login, message, authenticated } = authContext

    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const {email, password} = user

    useEffect(() => {
        if(authenticated) props.history.push('/projects')

        if(message) showAlert(message.msg, message.category)
    }, [message, authenticated, props.history])

    const onChangeInput = e => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const submitForm = e => {
        e.preventDefault()

        if(email.trim() === '' || password.trim() === '') {
            showAlert('All fields are required', 'alerta-error')
            return
        }

        login({email, password})
    }

    return (
        <div className="form-usuario">
            { alert 
                ? 
                    (
                        <div className={`alerta ${alert.category}`}>{alert.msg}</div>
                    ) 
                : 
                    null
            }
            <div className="contenedor-form sombra-dark">
                <h1>Login</h1>

                <form
                    onSubmit={submitForm}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Write your email"
                            value={email}
                            onChange={onChangeInput}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Write your password"
                            value={password}
                            onChange={onChangeInput}
                        />
                    </div>
                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Login"    
                        />
                    </div>
                </form>
                <Link to={'/register'} className="enlace-cuenta">
                    Create a new account
                </Link>
            </div>
        </div>
    )
}

export default Login