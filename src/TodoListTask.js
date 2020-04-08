import React from 'react';
import './App.css';

class TodoListTask extends React.Component {
    state = {
        editMode: false
    };
    activateEdit = () => {
        this.setState({editMode: true})
    };
    deActivateEdit = () => {
        this.setState({editMode: false})
    };

    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task.id, e.currentTarget.checked);
    };
    onTitleChanged = (e) => {
        this.props.changeTitle(this.props.task.id, e.currentTarget.value);
    };
    render = () => {
        let taskIsDone = this.props.task.isDone
            ? "todoList-task done"
            : "todoList-task";
        return (
            <div className="todoList-tasks">
                <div className={taskIsDone}>
                    <input type="checkbox" checked={this.props.task.isDone}
                           onChange={this.onIsDoneChanged}
                           changeTitle={this.props.changeTitle}
                    />
                    <span>{this.props.task.id} - </span>
                    {this.state.editMode
                        ? <input value={this.props.task.title}
                                 autoFocus={true}
                                 onBlur={this.deActivateEdit}
                                 onChange={this.onTitleChanged}/>

                        : <span onClick={this.activateEdit}> {this.props.task.title}</span>
                    }
                    <span> priority {this.props.task.priority}</span>
                </div>
            </div>
        );
    }
}

export default TodoListTask;

