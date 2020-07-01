import React, {ChangeEvent} from 'react';
import './App.css';
import {EditableSpan} from "./common/EditableSpan";
import {TaskType, UpadateTaskType} from "./types/entities";

type OwnPropsType = {
    changeTitle:(task:TaskType,taskId:string, newTitle:string)=>void
    task:TaskType
    changeStatus:(task:TaskType,taskId:string, isDone:boolean)=>void
    deleteTask:(todolistId:string ,taskId:string)=>void
    todolistId:string

}

class TodoListTask extends React.Component <OwnPropsType>{

    updateTaskTitle = (value:string):void => {
        this.props.changeTitle(this.props.task,  this.props.task.id, value);
     };

    onIsDoneChanged = (e:ChangeEvent<HTMLInputElement>):void => {
        this.props.changeStatus(this.props.task, this.props.task.id, e.currentTarget.checked);
    };

    deleteTask=(todolistId:string ,taskId:string)=>{
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
                    />
                    <EditableSpan value={this.props.task.title} onChange={this.updateTaskTitle}/>
                    <span> priority {this.props.task.priority} <button onClick={()=>{this.deleteTask(this.props.todolistId,this.props.task.id)}}>X</button></span>
                </div>
            </div>
        );
    }
}
export default TodoListTask;

