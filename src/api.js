import axios from "axios";

const baseURL =  `https://social-network.samuraijs.com/api/1.1/`;
const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {"API-KEY": "ffd426a2-955f-4438-aed5-116886d2fff8"}
});

export const api = {
    loadTasks(tololistId) {
        return instance.get(`todo-lists/${tololistId}/tasks`)
    },
    loadtodoLists() {
        return instance.get(`todo-lists`)
    },
    addTask(taskTitle,tololistId){
        return instance.post(`todo-lists/${tololistId}/tasks`,
            {title: taskTitle})
    },
    updateTask(tololistId,task, delta) {
         return instance.put(`todo-lists/${tololistId}/tasks/${task.id}`,
            {
                ...task,
                ...delta
            })
    },
    deletetodoList(tololistId) {
        return  instance.delete(`todo-lists/`+tololistId)
    },
    deleteTask (todolistId,taskId) {
        return instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
    },

    addtodoList(title) {
        return  instance.post(`todo-lists`,
            {title})
    },
    updateTodolistTitle(title, id) {
        return  instance.put(`todo-lists/${id}`,
            {title})
    }
};