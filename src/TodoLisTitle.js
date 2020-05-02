import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";


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
            const action = {
                type: "DELETE-TODOLIST",
                id: id
            };
            dispatch(action)
        },
    };
};

const ConnectedTodoLisTitle = connect(null, mapDispatchToProps)(TodoLisTitle);
export default ConnectedTodoLisTitle;


