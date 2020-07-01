import React from 'react';
import './App.css';
import {connect} from "react-redux";
import {changeTodolistTitle, deleteTodolist} from "./reducer";
import {EditableSpan} from "./common/EditableSpan";
import {AppStateType} from "./store";

type OwnPropsType = {
    id: string
    title:string
}

type MapDispatchPropsType = {
    deleteTodolist: (id:string) => void;
    changeTodolistTitle: (title: string,id:string) => void;
}


class TodoLisTitle extends React.Component<OwnPropsType & MapDispatchPropsType> {

    deleteTodoList = ():void => {
        this.props.deleteTodolist(this.props.id);
    };
    changeTitle = (title:string):void => {
        this.props.changeTodolistTitle(title, this.props.id);
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


// const mapDispatchToProps = (dispatch) => {
//     return {
//         deleteTodoList: (id:string) => {
//             let thunk = deleteTodolistCreator(id);
//             dispatch(thunk)
//         },
//         changeTodolistTitle: (title:string,todolistId:string) => {
//             let thunk = changeTodolistTitleCreator(title,todolistId);
//             dispatch(thunk)
//         }
//
//     };
// };

const ConnectedTodoLisTitle = connect<{}, MapDispatchPropsType, OwnPropsType, AppStateType>(null, {
    deleteTodolist,
    changeTodolistTitle
})(TodoLisTitle);
export default ConnectedTodoLisTitle;


