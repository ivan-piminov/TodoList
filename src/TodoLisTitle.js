import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {DELETE_TODOLIST, deleteTodolistAC} from "./reducer";


class TodoLisTitle extends React.Component {

    onDelete = () => {
        this.props.deleteTodolist(this.props.id)
    };

    render = () => {
        return (
            <h3 className="todoList-header__title"> {this.props.title}
                <button onClick={this.onDelete}>X</button>
            </h3>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        deleteTodolist: (id) => {
            let action = deleteTodolistAC(id);
            dispatch(action)
        },
    };
};

const ConnectedTodoLisTitle = connect(null, mapDispatchToProps)(TodoLisTitle);
export default ConnectedTodoLisTitle;


