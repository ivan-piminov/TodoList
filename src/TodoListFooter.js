import React from 'react';
import './App.css';

class TodoListFooter extends React.Component {
    render = () => {
        return (
            <div className="">
                <div className="todoList-footer">
                    <button>All</button>
                    <button>Completed</button>
                    <button>Active</button>
                </div>
            </div>
        );
    }
}

export default TodoListFooter;

