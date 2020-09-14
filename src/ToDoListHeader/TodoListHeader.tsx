import React from 'react';
import '../App.css';
import AddNewItemForm from "../AddNewItemForm/AddNewItemForm";
import TodoLisTitle from "../ToDoListTitle/TodoLisTitle";

type OwnPropsType = {
    id: string
    title: string
    addTask: (taskTitle: string) => void
}

class TodoListHeader extends React.Component<OwnPropsType> {

    render = () => {

        return (
            <div >
                <TodoLisTitle id={this.props.id} title={this.props.title}/>
                <AddNewItemForm addItem={this.props.addTask}/>
            </div>
        );
    }
}

export default TodoListHeader;

