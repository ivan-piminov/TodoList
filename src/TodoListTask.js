import React from 'react';
import './App.css';
import {EditableSpan} from "./common/EditableSpan";

class TodoListTask extends React.Component {

    updateTaskTitle = (value) => {
        this.props.changeTitle(this.props.task, value);
     };

    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task, e.currentTarget.checked);
    };

    deleteTask=(todolistId ,taskId)=>{
        this.props.deleteTask(todolistId ,taskId);
    };

    render = () => {
        let isDone = this.props.task.status===2;
        let taskIsDone = isDone
            ? "todoList-task done"
            : "todoList-task";
        return (
            <div className="todoList-tasks">
                <div className={taskIsDone}>
                    <input type="checkbox" checked={isDone}
                           onChange={this.onIsDoneChanged}
                           changeTitle={this.props.changeTitle}
                    />
                    <EditableSpan value={this.props.task.title} onChange={this.updateTaskTitle}/>
                    <span> priority {this.props.task.priority} <button onClick={()=>{this.deleteTask(this.props.todolistId,this.props.task.id)}}>X</button></span>
                </div>
            </div>
        );
    }
}

export default TodoListTask;

