import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {DELETE_TODOLIST, deleteTodolistAC} from "./reducer";
import axios from "axios";


class TodoLisTitle extends React.Component {

    onDelete = () => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/`+this.props.id,
            {
                withCredentials: true,
                headers: {"API-KEY":"ffd426a2-955f-4438-aed5-116886d2fff8"}
            })
            .then(res => {
                this.props.deleteTodolist(this.props.id)
            });
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


