import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";



class ToDoList extends React.Component {

    state = {
        filterValue: "All"
    };
    componentDidMount() {
        this.props.loadTasks(this.props.id);
    }


    addTask = (taskTitle) => {
        this.props.addTask(this.props.id,taskTitle);
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        })

    };

    changeTask = (task, newPropsObj) => {
        this.props.changeTask(this.props.id, task, newPropsObj);

    };

    changeStatus = (task, isDone) => {
        this.changeTask(task, {status: isDone ? 2 : 0})
    };

    changeTitle = (task, newTitle) => {
        this.changeTask(task, {title: newTitle})
    };

    render = () => {
        return (
            <div className="todoList">
                <TodoListHeader id={this.props.id} addTask={this.addTask} title={this.props.title}/>
                {this.props.todolist.loading ? <span>...Loading</span>:
                <TodoListTasks
                    changeStatus={this.changeStatus}
                    changeTitle={this.changeTitle}
                    todolistId={this.props.id}

                    tasks={this.props.tasks.filter(t => {
                        if (this.state.filterValue === "All") {
                            return true;
                        }
                        if (this.state.filterValue === "Completed") {
                            return t.status === 2;
                        }
                        if (this.state.filterValue === "Active") {
                            return t.status !== 2;
                        }
                    })}/>}
                <TodoListFooter
                    filterValue={this.state.filterValue}
                    changeFilter={this.changeFilter}
                />
            </div>
        );
    }
}

export default ToDoList;

