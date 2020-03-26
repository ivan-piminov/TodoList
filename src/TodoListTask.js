import React from 'react';
import './App.css';

class TodoListTask extends React.Component {
    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.tasks, e.currentTarget.checked);
    };
    render = () => {
        return (
            <div className="todoList-tasks">
                <div className="todoList-task">
                    <input type="checkbox" checked={this.props.tasks.isDone}
                           onChange={this.onIsDoneChanged}
                    />
                    <span>{this.props.tasks.title}, prriority {this.props.tasks.priority}</span>
                </div>
            </div>
        );
    }
}

export default TodoListTask;

