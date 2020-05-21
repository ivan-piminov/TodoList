import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTaskAC, addTodolistAC, changeTaskAC, setTasksAC, setTodolistsAC} from "./reducer";
import {api} from "./api";
import {EditableSpan} from "./common/EditableSpan";

class App extends React.Component {

    componentDidMount() {
        // this.restoreState()

        // const todoLists = [
        //     {
        //         "title": "important", "id": 0, tasks: [
        //             {"title": "аааа", "isDone": false, "priority": "low", "id": 0},
        //             {"title": "ббб", "isDone": false, "priority": "low", "id": 1}]
        //     },
        //     {
        //         "title": "not important", "id": 1, tasks: [
        //             {"title": "вввв", "isDone": false, "priority": "low", "id": 2},
        //             {"title": "ггг", "isDone": false, "priority": "low", "id": 3}]
        //     }
        // ];
        api.loadtodoLists()
            .then(res => {
                this.props.setTodolists(res.data)
            });

    }

    // saveState = () => {
    //     let stateAsString = JSON.stringify(this.state);
    //     localStorage.setItem("todolists", stateAsString)
    // };

    // restoreState = () => {
    //     let stateAsString = localStorage.getItem("todolists");
    //     if (stateAsString) {
    //         let state = JSON.parse(stateAsString);
    //         this.setState(state, () => {
    //             this.state.todolists.forEach((task) => {
    //                 if (task.id >= this.nextTaskId) {
    //                     this.nextTaskId = task.id + 1
    //                 }
    //             })
    //         })
    //     }
    // };

    // nextTodoListId = 2;


    addToDoList = (title) => {
        // let newTodoList = {
        //     title: title,
        //     id: this.nextTodoList,
        //     tasks:[]
        // };
        api.addtodoList(title)
            .then(res => {
                this.props.addTodolist(res.data.data.item);
            });

        // this.nextTodoListId++;

        // this.setState({
        //     todolists: [...this.state.todolists, newTodoList]
        // }, () => {
        //     this.saveState()
        // });
    };


    render = () => {
        let todolists = this.props.todolists.map(tl => <ToDoList
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tl.tasks}
            addTask={this.props.addTask}
            changeTask={this.props.changeTask}
            setTasks={this.props.setTasks}
        />);
        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.addToDoList}/>
                </div>
                <div className="App">
                    {todolists}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todolists: state.todolists
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        addTodolist: (title) => {
            let action = addTodolistAC(title);
            dispatch(action)
        },

        addTask: (newTask, todolistId) => {
            let action = addTaskAC(newTask, todolistId);
            dispatch(action)
        },

        changeTask: (taskId, newPropsObj) => {
            let action = changeTaskAC(taskId, newPropsObj);
            dispatch(action)
        },
        setTodolists: (todoLists) => {
            let action = setTodolistsAC(todoLists);
            dispatch(action);
        },
        setTasks: (tasks, todolistId) => {
            let action = setTasksAC(tasks, todolistId);
            dispatch(action);
        }


    };
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;

