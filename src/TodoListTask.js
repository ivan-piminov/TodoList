import React from 'react';
import './App.css';
import {api} from "./api";
import {EditableSpan} from "./common/EditableSpan";

class TodoListTask extends React.Component {
    // state = {
    //     editMode: false
    // };
    // activateEdit = () => {
    //     this.setState({editMode: true})
    // };
    // deActivateEdit = (e) => {
    //     this.props.changeTitle(this.props.task, e.currentTarget.value);
    //     this.setState({editMode: false})
    // };

    updateTaskTitle = (value) => {
        this.props.changeTitle(this.props.task, value);
     };

    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task, e.currentTarget.checked);
    };
    // onTitleChanged = (e) => {
    //     this.props.changeTitle(this.props.task, e.currentTarget.value);
    // };

    deleteTask=()=>{
        api.deleteTask(this.props.todolistId,this.props.task.id)
            .then(res => {
                this.props.deleteTask(this.props.task.id,this.props.todolistId)
            });
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
                    <span> priority {this.props.task.priority} <button onClick={()=>{this.deleteTask(this.props.task.id,this.props.todolistId)}}>X</button></span>
                </div>
            </div>
        );
    }
}

export default TodoListTask;

