import React from 'react';
import './App.css';
import axios from "axios";

class TodoListTask extends React.Component {
    state = {
        editMode: false
    };
    activateEdit = () => {
        this.setState({editMode: true})
    };
    deActivateEdit = (e) => {
        this.props.changeTitle(this.props.task, e.currentTarget.value);
        this.setState({editMode: false})
    };

    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task, e.currentTarget.checked);
    };
    onTitleChanged = (e) => {
        this.props.changeTitle(this.props.task, e.currentTarget.value);
    };

    deleteTask=()=>{

        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.todolistId}/tasks/${this.props.task.id}`,
            {
                withCredentials: true,
                headers: {"API-KEY":"ffd426a2-955f-4438-aed5-116886d2fff8"}
            })
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
                    <span>{this.props.task.id} - </span>
                    {this.state.editMode
                        ? <input defaultValue={this.props.task.title}
                                 autoFocus={true}
                                 onBlur={this.deActivateEdit}
                                 // onChange={this.onTitleChanged}
                        />

                        : <span onClick={this.activateEdit}> {this.props.task.title}</span>
                    }
                    <span> priority {this.props.task.priority} <button onClick={()=>{this.deleteTask(this.props.task.id,this.props.todolistId)}}>X</button></span>
                </div>
            </div>
        );
    }
}

export default TodoListTask;

