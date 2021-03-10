import { useState, useContext, useEffect } from 'react'
import {Link} from 'react-router-dom'

import AlertContext from '../../context/alerts/alertContext'
import AuthContext from '../../context/authentication/authContext'

const Register = (props) => {

    const alertContext = useContext(AlertContext)
    const {alert, showAlert} = alertContext

    const authContext = useContext(AuthContext)
    const { createUser, message, authenticated } = authContext

    useEffect(() => {
        if(authenticated) props.history.push('/projects')

        if(message) showAlert(message.msg, message.category)
    }, [message, authenticated, props.history])

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const {
        name,
        email, 
        password,
        confirmPassword
    } = user

    const onChangeInput = e => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const submitForm = e => {
        e.preventDefault()
        
        if(name.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
            showAlert('All fields are required', 'alerta-error')
            return
        }

        if(password.length <6) {
            showAlert('The password have to be at least 6 characters long', 'alerta-error')
            return
        }

        if(password !== confirmPassword) {
            showAlert('The passwords are differents', 'alerta-error')
            return
        }

        createUser({
            name,
            email,
            password
        })
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
                <h1>Create a new account</h1>

                <form
                    onSubmit={submitForm}
                >
                    <div className="campo-form">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Write your name"
                            value={name}
                            onChange={onChangeInput}
                        />
                    </div>
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
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <input 
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Repeat your password"
                            value={confirmPassword}
                            onChange={onChangeInput}
                        />
                    </div>
                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Register"    
                        />
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">
                    Already have an account
                </Link>
            </div>
        </div>
    )
}

export default Register