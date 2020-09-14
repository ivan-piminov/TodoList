import React from 'react';
import '../App.css';
import {connect} from "react-redux";
import {changeTodolistTitle, deleteTodolist} from "../BLL/reducer";
import {EditableSpan} from "../common/EditableSpan";
import {AppStateType} from "../BLL/store";

type OwnPropsType = {
    id: string
    title: string
}

type MapDispatchPropsType = {
    deleteTodolist: (id: string) => void;
    changeTodolistTitle: (title: string, id: string) => void;
}

class TodoLisTitle extends React.Component<OwnPropsType & MapDispatchPropsType> {

    deleteTodoList = (): void => {
        this.props.deleteTodolist(this.props.id);
    };
    changeTitle = (title: string): void => {
        this.props.changeTodolistTitle(title, this.props.id);
    };

    render = () => {
        return (
            <div className='input-group d-flex justify-content-between pl-3'>
                <EditableSpan value={this.props.title} onChange={this.changeTitle}/>
                <button onClick={this.deleteTodoList} className="btn btn-danger btn-sm ml-1" >X</button>
            </div>
        );
    }
}

const ConnectedTodoLisTitle = connect<{}, MapDispatchPropsType, OwnPropsType, AppStateType>(null, {
    deleteTodolist,
    changeTodolistTitle
})(TodoLisTitle);
export default ConnectedTodoLisTitle;


