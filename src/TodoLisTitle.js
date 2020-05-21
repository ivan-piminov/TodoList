import React from 'react';
import './App.css';
import {connect} from "react-redux";
import {changeTodolistTitleAC, deleteTodolistAC} from "./reducer";
import {api} from "./api";
import {EditableSpan} from "./common/EditableSpan";


class TodoLisTitle extends React.Component {

    deleteTodoList = () => {
        api.deletetodoList(this.props.id)
            .then(res => {
                this.props.deleteTodolist(this.props.id)
            });
    };
    changeTitle = (title) => {
        api.updateTodolistTitle(title, this.props.id)
            .then(res => {
                this.props.changeTodolistTitle(title,this.props.id)
            });
    };

    render = () => {
        return (
            <>
                <EditableSpan value={this.props.title} onChange={this.changeTitle}/>
                <button onClick={this.deleteTodoList}>X</button>
            </>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        deleteTodolist: (id) => {
            let action = deleteTodolistAC(id);
            dispatch(action)
        },
        changeTodolistTitle: (title,todolistId) => {
            let action = changeTodolistTitleAC(title,todolistId);
            dispatch(action)
        }

    };
};

const ConnectedTodoLisTitle = connect(null, mapDispatchToProps)(TodoLisTitle);
export default ConnectedTodoLisTitle;


