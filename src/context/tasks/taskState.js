import React, {useReducer} from 'react'

import TaskContext from './taskContext'
import TaskReducer from './taskReducer'

import axiosClient from '../../config/axios'

import {
    PROJECT_TASKS,
    ADD_TASK,
    VALIDATE_TASK,
    DELETE_TASK,
    CURRENT_TASK,
    UPDATE_TASK
} from '../../types'

const TaskState = props => {
    const initialState = {
        projectTasks: [],
        errorTask: false,
        currentTask : null
    }

    const [state, dispatch] = useReducer(TaskReducer, initialState)

    const getProjectTasks = async project => {
        try {
            const response = await axiosClient.get('/api/tasks', {params: {project}})

            dispatch({
                type: PROJECT_TASKS,
                payload: response.data.tasks
            })
        } catch (error) {
            console.log(error);
        }
    }

    const addTask = async task => {
        try {
            const response = await axiosClient.post('/api/tasks', task)
            dispatch({
                type: ADD_TASK,
                payload: response.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    const validateTask = () => {
        dispatch({
            type: VALIDATE_TASK
        })
    }

    const deleteTask = async (taskID, project) => {
        try {
            await axiosClient.delete(`/api/tasks/${taskID}`, {params: {project}})
            dispatch({
                type: DELETE_TASK,
                payload: taskID
            })
        } catch (error) {
            console.log(error);
        }
    }

    const setCurrentTask = task => {
        dispatch({
            type: CURRENT_TASK,
            payload: task
        })
    }

    const updateTask = async task => {
        try {
            const response = await axiosClient.put(`/api/tasks/${task._id}`, task)
            dispatch({
                type: UPDATE_TASK,
                payload: response.data.task
            })
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <TaskContext.Provider
            value={{
                projectTasks: state.projectTasks,
                errorTask: state.errorTask,
                currentTask: state.currentTask,
                getProjectTasks,
                addTask,
                validateTask,
                deleteTask,
                setCurrentTask,
                updateTask
            }}
        >
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState