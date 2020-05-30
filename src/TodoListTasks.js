import React from 'react';
import './App.css';
import TodoListTask from './TodoListTask'
import {deleteTaskThunkCreator} from "./reducer";
import {connect} from "react-redux";

class TodoListTasks extends React.Component {

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
            <div className="">
                {tasksElements}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTask: (todolistId ,taskId) => {
            let action = deleteTaskThunkCreator(todolistId ,taskId);
            dispatch(action)
        }
    };
};

const ConnectedTodoListTasks = connect(null, mapDispatchToProps)(TodoListTasks);
export default ConnectedTodoListTasks;


