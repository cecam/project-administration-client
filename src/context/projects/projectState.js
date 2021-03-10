import React, { useReducer } from 'react'

import projectContext from './projectContext'
import projectReducer from './projectReducer'

import {
    PROJECT_FORM,
    GET_PROJECTS,
    ADD_PROJECT,
    VALIDATE_FORM,
    CURRENT_PROJECT,
    DELETE_PROJECT,
    PROJECT_ERROR
} from '../../types'

import axiosClient from '../../config/axios'
import axios from 'axios'

const ProjectState = props => {

    const initialState = {
        form : false,
        projects : [],
        errorForm :false,
        project: null,
        message: null
    }

    const [state, dispatch] = useReducer(projectReducer, initialState)

    const showForm = () => {
        dispatch({
            type: PROJECT_FORM
        })
    }

    const getProjects = async () => {
        try {
            const response = await axiosClient.get('/api/projects')
            dispatch({
                type: GET_PROJECTS,
                payload: response.data.projects
            })
        } catch (error) {
            const alert = {
                msg: 'There was an error',
                category: 'alerta-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }
    }

    const addProject = async project => {
        try {
            const response = await axiosClient.post('/api/projects', project)
            dispatch({
                type: ADD_PROJECT,
                payload: response.data
            })
            
        } catch (error) {
            const alert = {
                msg: 'There was an error',
                category: 'alerta-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }
    }

    const showError = () => {
        dispatch({
            type: VALIDATE_FORM
        })
    }

    const currentProject = projectID => {
        dispatch({
            type : CURRENT_PROJECT,
            payload: projectID
        })
    }

    const deleteProject = async projectID => {
        try {
            await axiosClient.delete(`/api/projects/${projectID}`)
            dispatch({
                type: DELETE_PROJECT,
                payload: projectID
            })
        } catch (error) {
            const alert = {
                msg: 'There was an error',
                category: 'alerta-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }
    }

    return (
        <projectContext.Provider
            value={{
                projects: state.projects,
                form : state.form,
                errorForm: state.errorForm,
                project: state.project,
                message: state.message,
                showForm,
                getProjects,
                addProject,
                showError,
                currentProject,
                deleteProject
            }}
        >
            {props.children}
        </projectContext.Provider>
    )
}

export default ProjectState
