import React from 'react';
import './App.css';
import TodoListTask from './TodoListTask'

class TodoListTasks extends React.Component {
    render = () => {

        let tasksElements = this.props.tasks.map(task => {
            return <TodoListTask
                changeStatus={this.props.changeStatus}
                tasks={task}
            />
        });

        return (
            <div className="">
                {tasksElements}
            </div>
        );
    }
}

export default TodoListTasks;

