import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoLisTitle from "./TodoLisTitle";

type OwnPropsType = {
    id: string
    title: string
    addTask: (taskTitle: string) => void
}

class TodoListHeader extends React.Component<OwnPropsType> {

    render = () => {

        return (
            <div className="">
                <div className="todoList-header">
                    <TodoLisTitle id={this.props.id} title={this.props.title}/>
                    <AddNewItemForm addItem={this.props.addTask}/>
                </div>
            </div>
        );
    }
}

export default TodoListHeader;

