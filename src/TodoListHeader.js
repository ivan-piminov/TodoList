import React from 'react';
import './App.css';

class TodoListHeader extends React.Component {


    newTaskTitleRef = React.createRef()


    onAddTaskButtonClick = () => {
        let newTitle = this.newTaskTitleRef.current.value;
        this.newTaskTitleRef.current.value = "";
        this.props.addTask(newTitle)
    }
    render = () => {
        return (
            <div className="">
                <div className="todoList-header">
                    <h3 className="todoList-header__title">What to Learn</h3>
                    <div className="todoList-newTaskForm">
                        <input type="text" placeholder="New task name" ref={this.newTaskTitleRef}/>
                        <button onClick={this.onAddTaskButtonClick}>Add</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default TodoListHeader;

