import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {ADD_TASK, ADD_TODOLIST, addTaskAC, addTodolistAC, CHANGE_TASK, changeTaskAC} from "./reducer";

class App extends React.Component {
    // state={
    //     todolists: []
    // }

    componentDidMount() {
        // this.restoreState()
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
        this.props.addTodolist(title);

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
            let action  = addTodolistAC(title);
            dispatch(action)
        },

        addTask: (newTitle, todolistId) => {
            let action= addTaskAC(newTitle, todolistId);
            dispatch(action)
        },

        changeTask: (taskId, newPropsObj) => {
            let action= changeTaskAC(taskId, newPropsObj);
            dispatch(action)
        }

    };
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;

