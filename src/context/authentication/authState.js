import React, {useReducer} from 'react'
import AuthContext from './authContext'
import AuthReducer from './authReducer'
import axiosClient from '../../config/axios'
import authToken from '../../config/authToken'

import { 
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    GET_USER,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT

 } from '../../types'

 const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: null,
        user: null,
        message: null,
        loading: true
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState)

    const createUser = async data => {
        try {
            const response = await axiosClient.post('/api/users', data)

            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data
            })

            getUser()
        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type: REGISTER_ERROR,
                payload: alert
            })
        }
    }

    const login = async data => {
        try {
            const response = await axiosClient.post('/api/auth', data)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            })

            getUser()
        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type: REGISTER_ERROR,
                payload: alert
            })
        }
    }

    const getUser = async () => {
        const token = localStorage.getItem('token')
        if(token) {
            authToken(token)
        }

        try {
            const response = await axiosClient.get('/api/auth')
            dispatch({
                type: GET_USER,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    const logout = () => {
        dispatch({
            type: LOGOUT
        })
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                loading: state.loading,
                createUser,
                login,
                getUser,
                logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
 }

 export default AuthState