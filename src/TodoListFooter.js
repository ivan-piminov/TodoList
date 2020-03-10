import React from 'react';
import './App.css';

class TodoListFooter extends React.Component {
    render = () => {
        let ClassForALL = this.props.filterValue  === "ALL" ? 'filter-active':"";
        let ClassForCompleted = this.props.filterValue  === "Completed" ? 'filter-active':"";
        let ClassForActive = this.props.filterValue  === "Active" ? 'filter-active':"";
        return (
            <div className="">
                <div className="todoList-footer">
                    <button className = {ClassForALL} >All</button>
                    <button className = {ClassForCompleted}>Completed</button>
                    <button className = {ClassForActive}>Active</button>
                </div>
            </div>
        );
    }
}

export default TodoListFooter;

