import React from 'react';
import '../App.css';
import TodoListTask from '../ToDoListTask/TodoListTask'
import {deleteTask} from "../BLL/reducer";
import {connect} from "react-redux";
import {TaskType, UpadateTaskType} from "../types/entities";
import {AppStateType} from "../BLL//store";

type OwnPropsType = {
    tasks: Array<TaskType>
    changeStatus: (task: TaskType, taskId: string, isDone: boolean) => void
    changeTitle: (task: TaskType, taskId: string, newTitle: string) => void
    todolistId: string
}

type MapDispatchPropsType = {
    deleteTask: (todolistId: string, taskId: string) => void
}

class TodoListTasks extends React.Component <OwnPropsType & MapDispatchPropsType> {

    render = () => {

        let tasksElements = this.props.tasks.map(task => {
            return <TodoListTask
                changeStatus={this.props.changeStatus}
                changeTitle={this.props.changeTitle}
                deleteTask={this.props.deleteTask}
                todolistId={this.props.todolistId}
                task={task}/>
        });

        return (
            <div style={{margin: "0 0 0 5px"}}>
                {tasksElements}
            </div>
        );
    }
}

const ConnectedTodoListTasks = connect<{}, MapDispatchPropsType, OwnPropsType, AppStateType>(null, {deleteTask})(TodoListTasks);
export default ConnectedTodoListTasks;

