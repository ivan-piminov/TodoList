
export const ADD_TODOLIST = 'todolist/reducer/ADD-TODOLIST';
export const ADD_TASK = 'todolist/reducer/ADD-TASK';
export const CHANGE_TASK = 'todolist/reducer/CHANGE-TASK';
export const DELETE_TODOLIST = 'todolist/reducer/DELETE-TODOLIST';
export const DELETE_TASK = 'todolist/reducer/DELETE-TASK';

const initialState = {
    todolists: [
        {
            "title": "important", "id": 0, tasks: [
                {"title": "аааа", "isDone": false, "priority": "low", "id": 0},
                {"title": "ббб", "isDone": false, "priority": "low", "id": 1}]
        },
        {
            "title": "not important", "id": 1, tasks: [
                {"title": "вввв", "isDone": false, "priority": "low", "id": 2},
                {"title": "ггг", "isDone": false, "priority": "low", "id": 3}]
        }]
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_TODOLIST:
            let newTodoList = {
                title: action.title,
                id: (new Date()).getTime(),
                tasks: []
            };
            return {
                ...state,
                todolists: [newTodoList, ...state.todolists]
            };
        case ADD_TASK:
            let newTask = {
                title: action.newText,
                isDone: false,
                priority: "low",
                id: (new Date()).getTime()
            };
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (action.todolistId == tl.id) {
                        return {
                            ...tl,
                            tasks: [newTask, ...tl.tasks]
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
            }
    }
    return state;
};

export default reducer;

export const addTodolistAC = (title)=> {
    return {
        type: ADD_TODOLIST,
        title: title
    };
};
export const addTaskAC = (newTitle, todolistId)=> {
    return {
        type: ADD_TASK,
        newText: newTitle,
        todolistId: todolistId
    };
};
export const changeTaskAC = (taskId, newPropsObj)=> {
    return {
        type: CHANGE_TASK,
        taskId: taskId,
        delta: newPropsObj
    };
};
export const deleteTodolistAC = (id)=> {
    return {
        type: DELETE_TODOLIST,
        id: id
    };
};
export const deleteTask = (taskId,todolistId)=> {
    return {
        type: DELETE_TASK,
        taskId,
        todolistId
    };
};

