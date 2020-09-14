import {api} from "../DAL/api";
import {TaskType, TodoType, UpadateTaskType} from "../types/entities";
import {Dispatch} from "redux";
import {InferActionTypes} from "./store";


type InitialStateType = {
    todolists: Array<TodoType>
    loading: boolean
}

const initialState: InitialStateType = {
    todolists: [],
    loading: false
};

const reducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "SET_TASKS":
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id !== action.todolistId) return tl;
                    else return {
                        ...tl,
                        tasks: action.tasks
                    }
                })
            };
        case "SET_TODOLISTS":
            return {
                ...state,
                todolists: action.todolists.map(tl => ({
                    ...tl,
                    loading: true,
                    tasks: []
                }))
            };

        case "ADD_TODOLIST":
            return {
                ...state,
                todolists: [{
                    ...action.newtodoList,
                    tasks: []
                },
                    ...state.todolists]
            };
        case "ADD_TASK":
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (action.todolistId === tl.id) {
                        return {
                            ...tl,
                            tasks: [action.newTask, ...tl.tasks]
                        }
                    } else return tl
                })
            };
        case "CHANGE_TASK":
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    let task = tl.tasks.find(t => t.id == action.taskId);
                    if (task == null) return tl;
                    else return {
                        ...tl,
                        tasks: tl.tasks.map(t => {
                                if (t.id != action.taskId) return t;
                                else return {
                                    ...t,
                                    ...action.delta
                                }
                            }
                        )
                    }
                })
            };
        case "DELETE_TODOLIST":
            return {
                ...state,
                todolists: state.todolists.filter(tl => tl.id != action.todolistId)
            };
        case "DELETE_TASK":
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id != action.todolistId) return tl;
                    else return {
                        ...tl,
                        tasks: tl.tasks.filter(t => t.id != action.taskId)
                    }
                })
            };
        case "UPDATE_TODOLIST_TITLE":
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                        if (tl.id != action.todolistId) {
                            return tl
                        } else return {
                            ...tl, title: action.title
                        }
                    }
                )
            };
        case "LOADING_TASKS":
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                        if (tl.id != action.todolistId) {
                            return tl
                        } else return {
                            ...tl, loading: action.isActive
                        }
                    }
                )
            };
        case "LOADING_TODOLISTS":
            return {
                ...state,
                loading: action.isActive
            }
    }
    return state;
};

export default reducer;


//Action creators

type ActionTypes = InferActionTypes<typeof actions>

export const actions = {
    addTodolistAC: (newtodoList: TodoType) => ({type: 'ADD_TODOLIST', newtodoList} as const),

    addTaskAC: (todolistId: string, newTask: TaskType) => ({type: 'ADD_TASK', todolistId, newTask} as const),

    changeTaskAC: (todolistId: string, taskId: string, newPropsObj: UpadateTaskType) => ({
        type: 'CHANGE_TASK',
        taskId: taskId,
        delta: newPropsObj
    } as const),

    deleteTodolistAC: (todolistId: string) => ({type: 'DELETE_TODOLIST', todolistId} as const),

    deleteTaskAC: (todolistId: string, taskId: string) => ({type: 'DELETE_TASK', taskId, todolistId} as const),

    setTodolistsAC: (todolists: Array<TodoType>) => ({type: 'SET_TODOLISTS', todolists} as const),

    setTasksAC: (tasks: Array<TaskType>, todolistId: string) => ({type: 'SET_TASKS', tasks, todolistId} as const),

    changeTodolistTitleAC: (title: string, todolistId: string) => ({
        type: 'UPDATE_TODOLIST_TITLE',
        title,
        todolistId
    } as const),

    loadingTodolistAC: (isActive: boolean) => ({type: 'LOADING_TODOLISTS', isActive} as const),

    loadingTasksAC: (isActive: boolean, todolistId: string) => ({type: 'LOADING_TASKS', isActive, todolistId} as const)
};


//Thunk creators
export const loadTodoLists = () => {
    return async (dispatch: Dispatch<ActionTypes>) => {
       dispatch(actions.loadingTodolistAC(true));
        let res = await  api.loadtodoLists();
                const action = actions.setTodolistsAC(res.data);
                dispatch(action);
                dispatch(actions.loadingTodolistAC(false));
    };
};

export const deleteTodolist = (todolistId: string) => {
    return async (dispatch: Dispatch<ActionTypes>) => {
        let res = await api.deletetodoList(todolistId);
                dispatch(actions.deleteTodolistAC(todolistId))
    };
};

export const loadTasks = (todolistId: string) => {
    return async (dispatch: Dispatch<ActionTypes>) => {
        dispatch(actions.loadingTasksAC(true, todolistId));
        let res = await  api.loadTasks(todolistId);
                dispatch(actions.setTasksAC(res.data.items, todolistId));
                dispatch(actions.loadingTasksAC(false, todolistId))
    }
};

export const addTodolist = (title: string) => {
    return async (dispatch: Dispatch) => {
        let res = await api.addtodoList(title);
                dispatch(actions.addTodolistAC(res.data.data.item));
    }
};

export const deleteTask = (todolistId: string, taskId: string) => {
    return async (dispatch: Dispatch<ActionTypes>) => {
        let res = await api.deleteTask(todolistId, taskId);
                dispatch(actions.deleteTaskAC(todolistId, taskId))
    }
};

export const addTask = (todolistId: string, title: string) => {
    return async (dispatch: Dispatch<ActionTypes>) => {
        let res = await api.addTask(todolistId, title);
                dispatch(actions.addTaskAC(todolistId, res.data.data.item));
    }
};

export const changeTask = (todolistId: string, taskId: string, task: TaskType, newPropsObj: UpadateTaskType) => {
    return async (dispatch: Dispatch<ActionTypes>) => {
        let res = await  api.updateTask(todolistId, task, newPropsObj);
                dispatch(actions.changeTaskAC(todolistId, taskId, newPropsObj))
    }
};

export const changeTodolistTitle = (title: string, todolistId: string) => {
    return async (dispatch: Dispatch<ActionTypes>) => {
        let res = await  api.updateTodolistTitle(title, todolistId);
                dispatch(actions.changeTodolistTitleAC(title, todolistId))
    }
};





