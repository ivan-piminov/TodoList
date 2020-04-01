import React from 'react';
import './App.css';

class TodoListTask extends React.Component {
    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.tasks, e.currentTarget.checked);
    };
    render = () => {
        let taskIsDone = this.props.tasks.isDone
            ? "todoList-task done"
            : "todoList-task";
        return (
            <div className="todoList-tasks">
                <div className={taskIsDone}>
                    <input type="checkbox" checked={this.props.tasks.isDone}
                           onChange={this.onIsDoneChanged}
                    />
                    <span>{this.props.tasks.title}, priority {this.props.tasks.priority}</span>
                </div>
            </div>
        );
    }
}

export default TodoListTask;

