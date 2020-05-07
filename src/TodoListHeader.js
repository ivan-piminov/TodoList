import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoLisTitle from "./TodoLisTitle";


class TodoListHeader extends React.Component {

    render = () => {

        return (
            <div className="">
                <div className="todoList-header">
                    <TodoLisTitle id = {this.props.id} title={this.props.title}/>
                    <AddNewItemForm addItem = {this.props.addTask}/>
                </div>
            </div>
        );
    }
}

export default TodoListHeader;

