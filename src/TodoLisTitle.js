import React from 'react';
import './App.css';
import {connect} from "react-redux";
import {changeTodolistTitleCreator, deleteTodolistCreator} from "./reducer";
import {EditableSpan} from "./common/EditableSpan";

class TodoLisTitle extends React.Component {

    deleteTodoList = () => {
        this.props.deleteTodoList(this.props.id);
    };
    changeTitle = (title) => {
        this.props.changeTodolistTitle(title,this.props.id);
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
        deleteTodoList: (id) => {
            let thunk = deleteTodolistCreator(id);
            dispatch(thunk)
        },
        changeTodolistTitle: (title,todolistId) => {
            let thunk = changeTodolistTitleCreator(title,todolistId);
            dispatch(thunk)
        }

    };
};

const ConnectedTodoLisTitle = connect(null, mapDispatchToProps)(TodoLisTitle);
export default ConnectedTodoLisTitle;


