import {createStore} from "redux";

const initialState = {
    todolists: [
        {
            "title": "1", "id": 0, tasks: [{"title": "аааа", "isDone": false, "priority": "low", "id": 0},
                {"title": "ббб", "isDone": false, "priority": "low", "id": 1}]
        },
        {
            "title": "2", "id": 1, tasks: [{"title": "вввв", "isDone": false, "priority": "low", "id": 2},
                {"title": "ггг", "isDone": false, "priority": "low", "id": 3}]
        }]
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case "ADD-TODOLIST":
            let newTodoList = {
                title: action.title,
                id: (new Date()).getTime(),
                tasks: []
            };
            return {
                ...state,
                todolists: [newTodoList, ...state.todolists]
            };
        case "ADD-TASK":
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
            }
        case "CHANGE-TASK":

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
            }
        case "DELETE-TODOLIST":
            return {
                ...state,
                todolists: state.todolists.filter(tl => tl.id != action.id)
            }
        case "DELETE-TASK":
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

const store = createStore(reducer);
export default store;

