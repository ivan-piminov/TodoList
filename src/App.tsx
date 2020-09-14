import React from 'react';
import './App.css';
import ToDoList from "./ToDoList/ToDoList";
import AddNewItemForm from "./AddNewItemForm/AddNewItemForm";
import {connect} from "react-redux";
import {
    addTask,
    addTodolist,
    changeTask,
    loadTasks,
    loadTodoLists
} from "./BLL/reducer";
import {TaskType, TodoType, UpadateTaskType} from "./types/entities";
import {AppStateType} from "./BLL/store";
import background from './Back.jpg'

const back = {
    backgroundImage: 'url(' + background + ')',
    backgroundSize: "cover",
    minHeight: '100vh'
};


type OwnPropsType = {
    todolists: Array<TodoType>
}

type MapDispatchPropsType = {
    loadTodoLists: () => void
    addTodolist: (title: string) => void
    addTask: (todolistId: string, title: string) => void
    changeTask: (todolistId: string, taskId: string, task: TaskType, newPropsObj: UpadateTaskType) => void
    loadTasks: (todolistId: string) => void

}

type MapStatePropsType = {
    todolists: Array<TodoType>
    loading: boolean
}

type PropsType = OwnPropsType & MapDispatchPropsType & MapStatePropsType

class App extends React.Component<PropsType> {

    componentDidMount() {
        this.props.loadTodoLists()
    }

    addToDoList = (title: string): void => {
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
            loadTasks={this.props.loadTasks}

        />);
        return (
            <div style={back} className="container-fluid">
                <div>
                    <AddNewItemForm addItem={this.addToDoList}/>
                </div>
                <div className=" d-flex justify-content-around flex-wrap">
                    {this.props.loading
                        ? <div className="spinner-border text-light" role="status" style={{marginTop: '15px'}}>
                            <span className="sr-only">Loading...</span>
                        </div>
                        : todolists}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        todolists: state.todolist.todolists,
        loading: state.todolist.loading
    }
};

const ConnectedApp = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    addTask,
    changeTask,
    loadTodoLists,
    loadTasks,
    addTodolist
})(App);
export default ConnectedApp;

