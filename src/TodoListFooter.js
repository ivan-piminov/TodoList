import React from 'react';
import './App.css';

class TodoListFooter extends React.Component {
    render = () => {
        let ClassForALL = this.props.filterValue === "All" ? 'filter-active' : "";
        let ClassForCompleted = this.props.filterValue === "Completed" ? 'filter-active' : "";
        let ClassForActive = this.props.filterValue === "Active" ? 'filter-active' : "";
        return (
            <div className="">
                <div className="todoList-footer">

                    <button className={ClassForALL}
                            onClick={() => {
                                this.props.changeFilter("All")
                            }}
                    >All
                    </button>

                    <button className={ClassForCompleted}
                            onClick={() => {
                                this.props.changeFilter("Completed")
                            }}
                    >Completed
                    </button>

                    <button className={ClassForActive}
                            onClick={() => {
                                this.props.changeFilter("Active")
                            }}
                    >Active
                    </button>
                </div>
            </div>
        );
    }
}

export default TodoListFooter;

