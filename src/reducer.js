import {api} from "./api";

export const ADD_TODOLIST = 'todolist/reducer/ADD-TODOLIST';
export const ADD_TASK = 'todolist/reducer/ADD-TASK';
export const CHANGE_TASK = 'todolist/reducer/CHANGE-TASK';
export const DELETE_TODOLIST = 'todolist/reducer/DELETE-TODOLIST';
export const DELETE_TASK = 'todolist/reducer/DELETE-TASK';
export const SET_TODOLISTS = 'todolist/reducer/SET-TODOLISTS';
export const SET_TASKS = 'todolist/reducer/SET-TASKS';
export const UPDATE_TODOLIST_TITLE = 'todolist/reducer/UPDATE-TODOLIST-TITLE';
export const LOADING_TODOLISTS = 'todolist/reducer/LOADING_TODOLISTS';
export const LOADING_TASKS = 'todolist/reducer/LOADING_TASKS';

const initialState = {
    todolists: [
        // {
        //     "title": "important", "id": 0, tasks: [
        //         {"title": "аааа", "isDone": false, "priority": "low", "id": 0},
        //         {"title": "ббб", "isDone": false, "priority": "low", "id": 1}]
        // },
        // {
        //     "title": "not important", "id": 1, tasks: [
        //         {"title": "вввв", "isDone": false, "priority": "low", "id": 2},
        //         {"title": "ггг", "isDone": false, "priority": "low", "id": 3}]
        // }
    ],
    loading: false
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_TASKS:
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
        case SET_TODOLISTS:
            return {
                ...state,
                todolists: action.todolists.map(tl => ({...tl,
                    loading:true,
                    tasks: []}))
            };

        case ADD_TODOLIST:
            return {
                ...state,
                todolists: [{
                    ...action.title,
                    tasks: []
                },
                    ...state.todolists]
            };
        case ADD_TASK:

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
        case CHANGE_TASK:

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
        case DELETE_TODOLIST:
            return {
                ...state,
                todolists: state.todolists.filter(tl => tl.id != action.id)
            };
        case DELETE_TASK:
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
        case UPDATE_TODOLIST_TITLE:
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
        case LOADING_TASKS:
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
        case LOADING_TODOLISTS:
            return {
                ...state,
                loading: action.isActive
            }
    }
    return state;
};

export default reducer;

 const addTodolistAC = (title) => {
    return {
        type: ADD_TODOLIST,
        title: title
    };
};
export const addTaskAC = (todolistId,newTask) => {
    return {
        type: ADD_TASK,
        todolistId: todolistId,
        newTask: newTask
    };
};
export const changeTaskAC = (todolistId, taskId ,newPropsObj) => {
    return {
        type: CHANGE_TASK,
        taskId: taskId,
        delta: newPropsObj
    };
};
export const deleteTodolistAC = (id) => {
    return {
        type: DELETE_TODOLIST,
        id: id
    };
};
export const deleteTaskAC = (todolistId ,taskId) => {
    return {
        type: DELETE_TASK,
        taskId,
        todolistId
    };
};
 const setTodolistsAC = (todolists) => {
    return {
        type: SET_TODOLISTS,
        todolists
    }
};
 const setTasksAC = (tasks, todolistId) => {
    return {
        type: SET_TASKS,
        tasks,
        todolistId
    }
};
export const changeTodolistTitleAC = (title, todolistId) => {
    return {
        type: UPDATE_TODOLIST_TITLE,
        title,
        todolistId
    }
};
export const loadingTodolistAC = (isActive) => {
    return {
        type: LOADING_TODOLISTS,
        isActive
    }
};
export const loadingTasksAC = (isActive,todolistId) => {
    return {
        type: LOADING_TASKS,
        isActive,
        todolistId
    }
};
export const loadTodolistThunkCreator =()=>{
    return(dispatch)=>{
        dispatch(loadingTodolistAC(true));
        api.loadtodoLists()
            .then(res => {
                const action=setTodolistsAC(res.data);
                dispatch(action)
                dispatch(loadingTodolistAC(false));
            });
    };
};
export const deleteTodolistCreator =(id)=>{
    return(dispatch)=>{
        api.deletetodoList(id)
            .then(res => {
                dispatch(deleteTodolistAC(id))
            });
    };
};
export const loadTasksThunkCreator= (todolistId) => {
   return (dispatch)=> {
       dispatch(loadingTasksAC(true,todolistId));
       api.loadTasks(todolistId)
           .then(res => {
               dispatch(setTasksAC(res.data.items, todolistId));
               dispatch(loadingTasksAC(false,todolistId))
           });
   }
};
export const addTodolistThunkCreator= (title) => {
   return (dispatch)=> {
       api.addtodoList(title)
           .then(res => {
               dispatch(addTodolistAC(res.data.data.item));
           });
   }
};
export const deleteTaskThunkCreator= (todolistId ,taskId) => {
   return (dispatch)=> {
       api.deleteTask(todolistId,taskId)
           .then(res => {
               dispatch(deleteTaskAC(todolistId ,taskId))
           });
   }
};
export const addTaskThunkCreator= (todolistId,newTask) => {
   return (dispatch)=> {
       api.addTask(todolistId,newTask)
           .then(res => {
               dispatch(addTaskAC(todolistId,res.data.data.item));
           });
   }
};
export const changeTaskThunkCreator= (todolistId,task, newPropsObj) => {
   return (dispatch)=> {
       api.updateTask(todolistId, task, newPropsObj)
           .then(res => {
               dispatch(changeTaskAC(todolistId,task.id,newPropsObj))
           });
   }
};
export const changeTodolistTitleCreator= (title,todolistId) => {
   return (dispatch)=> {
       api.updateTodolistTitle(title,todolistId)
           .then(res => {
               dispatch(changeTodolistTitleAC(title,todolistId))
           });
   }
};




