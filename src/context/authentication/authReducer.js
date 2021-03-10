import { 
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    GET_USER,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT

 } from '../../types'


export default (state, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                authenticated : true,
                token: action.payload.token,
                message: null
            }
        case REGISTER_ERROR:
            return {
                ...state,
                token: null,
                user: null,
                authenticated: null,
                message: action.payload,
                loading: false
            }
        case LOGIN_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                message: action.payload
            }
        case GET_USER:
            return {
                ...state,
                user: action.payload.user,
                authenticated: true,
                loading: false
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                authenticated : true,
                token: action.payload.token,
                message: null,
                loading: false
            }
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                user: null,
                authenticated: null,
                message: action.payload
            }
        default:
            return state
    }
}