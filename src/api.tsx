import axios from "axios";
import {TaskType, TodoType, UpadateTaskType} from "./types/entities";

const baseURL = `https://social-network.samuraijs.com/api/1.1/`;
const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {"API-KEY": "de397352-5e3e-4a18-9ed2-383661a8969f"}
});


type UpdateTaskType = {
    resultCode: number
    messages: Array<string>
    data: {
        item: TaskType
    }
}
type DeleteTodolistType = {
    resultCode: number
    messages: Array<string>
    data: {}
}
type CreateTodoType = {
    resultCode: number
    messages: Array<string>
    data: {
        item: TodoType
    }
}

type LoadTasksType = {
    items: Array<TaskType>
    totalCount: number
    error: string
}


type AddTaskType = {
    resultCode: number
    messages: Array<string>
    data: {
        item: TaskType
    }
}

type DeleteTaskType = {
    resultCode: number
    messages: Array<string>
    data: {}
}



type UpdateTodolistTitleType = {
    data: {}
    messages: []
    resultCode: number
}


export const api = {
    loadTasks(tololistId: string) {
        return instance.get<LoadTasksType>(`todo-lists/${tololistId}/tasks`)
    },
    loadtodoLists() {
        return instance.get<Array<TodoType>>(`todo-lists`)
    },
    addTask(tololistId: string, taskTitle: string) {
        return instance.post<AddTaskType>(`todo-lists/${tololistId}/tasks`,
            {title: taskTitle})
    },
    updateTask(tololistId: string, task: TaskType, delta: UpadateTaskType) {
        let data = {
            ...task,
            ...delta
        };
        return instance.put<UpdateTaskType>(`todo-lists/${tololistId}/tasks/${task.id}`, data)
    },
    deletetodoList(tololistId: string) {
        return instance.delete<DeleteTodolistType>(`todo-lists/` + tololistId)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<DeleteTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },

    addtodoList(title: string) {
        return instance.post<CreateTodoType>(`todo-lists`,
            {title})
    },
    updateTodolistTitle(title: string, id: string) {
        return instance.put<UpdateTodolistTitleType>(`todo-lists/${id}`,
            {title})
    }
};