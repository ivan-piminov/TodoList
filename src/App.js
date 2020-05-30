import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {
    addTaskThunkCreator,
    addTodolistThunkCreator,
    changeTaskThunkCreator,
    loadTasksThunkCreator,
    loadTodolistThunkCreator
} from "./reducer";

class App extends React.Component {

    componentDidMount() {
        this.props.loadtodoLists()
    }

    addToDoList = (title) => {
        this.props.addTodolist(title);
    };

    render = () => {
        let todolists = this.props.todolists.map(tl => <ToDoList
            todolist={tl}
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tl.tasks}
            addTask={this.props.addTask}
            changeTask={this.props.changeTask}
            setTasks={this.props.setTasks}
            loadTasks={this.props.loadTasks}
        />);
        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.addToDoList}/>
                </div>
                <div className="App">
                    {this.props.loading
                        ?<span>...Loading</span>
                    :todolists}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todolists: state.todolists,
        loading: state.loading
    }
};
const mapDispatchToProps = (dispatch) => {
    return {

        addTask: (todolistId,taskTitle) => {
            let thunk = addTaskThunkCreator(todolistId,taskTitle);
            dispatch(thunk)
        },

        changeTask: (todolistId,task, newPropsObj) => {
            let thunk = changeTaskThunkCreator(todolistId,task, newPropsObj);
            dispatch(thunk)
        },
        loadtodoLists:()=>{
            dispatch(loadTodolistThunkCreator())
        },
        loadTasks:(todolistId)=>{
            let thunk = loadTasksThunkCreator(todolistId);
            dispatch(thunk)
        },
        addTodolist:(title)=>{
            let thunk = addTodolistThunkCreator(title);
            dispatch(thunk)
        }
    };
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;

