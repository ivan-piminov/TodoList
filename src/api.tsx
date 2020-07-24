import axios from "axios";
import {TaskType, TodoType, UpadateTaskType} from "./types/entities";

const baseURL = `https://social-network.samuraijs.com/api/1.1/`;
const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {"API-KEY": "81fab503-698d-43e8-af57-37f0fdd7ac88"}
});

type CommonApiType<T> = {
    resultCode: number
    messages: Array<string>
    data: T
}

type LoadTasksType = {
    totalCount: number
    items: Array<TaskType>
    error: string
}

type UpdateTodolistTitleType = {
    resultCode: number
    data: {}
    messages: []
}

export const api = {
    loadTasks(tololistId: string) {
        return instance.get<LoadTasksType>(`todo-lists/${tololistId}/tasks`)
    },
    loadtodoLists() {
        return instance.get<Array<TodoType>>(`todo-lists`)
    },
    addTask(tololistId: string, taskTitle: string) {
        return instance.post<CommonApiType<{ item: TaskType }>>(`todo-lists/${tololistId}/tasks`,
            {title: taskTitle})
    },
    updateTask(tololistId: string, task: TaskType, delta: UpadateTaskType) {
        let data = {
            ...task,
            ...delta
        };
        return instance.put<CommonApiType<{ item: TaskType }>>(`todo-lists/${tololistId}/tasks/${task.id}`, data)
    },
    deletetodoList(tololistId: string) {
        return instance.delete<CommonApiType<{}>>(`todo-lists/` + tololistId)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<CommonApiType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },

    addtodoList(title: string) {
        return instance.post<CommonApiType<{ item: TodoType }>>(`todo-lists`,
            {title})
    },
    updateTodolistTitle(title: string, id: string) {
        return instance.put<UpdateTodolistTitleType>(`todo-lists/${id}`,
            {title})
    }
};