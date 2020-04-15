import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";


class ToDoList extends React.Component {


    state = {
        tasks: [
        ],
        filterValue: "Active"
    };
    nextItemId = 0;

    componentDidMount() {
        this.restoreState()
    }

    saveState = () => {
        localStorage.setItem("our-state-"+this.props.id, JSON.stringify(this.state))
    };

    restoreState = () => {
        let stateAsString = localStorage.getItem("our-state-"+this.props.id);
        if (stateAsString) {
            let state = JSON.parse(stateAsString);
            this.setState(state, () => {
                this.state.tasks.forEach((task) => {
                    if (task.id >= this.nextItemId) {
                        this.nextItemId = task.id + 1
                    }
                })
            })
        }
    };

    addTask = (newTitle) => {
        let newItem = {
            title: newTitle,
            isDone: false,
            priority: "low",
            id: this.nextItemId
        };

        this.nextItemId++;
        let newTasks = [...this.state.tasks, newItem];
        this.setState({
            tasks: newTasks
        }, () => {
            this.saveState()
        });

    };
    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        }, () => {
            this.saveState()}
            )
    };

    changeTask = (taskId, newPropsObj) => {
        let tasksCopy = this.state.tasks.map(t => {
            if (t.id !== taskId) {
                return t;
            } else {
                return {...t, ...newPropsObj}
            }
        });
        this.setState({
            tasks: tasksCopy
        }, () => {
            this.saveState()})
    };

    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone: isDone})
    };

    changeTitle = (taskId, newTitle) => {
        this.changeTask(taskId, {title: newTitle})
    };

    render = () => {
        return (
                <div className="todoList">
                    <TodoListHeader addTask={this.addTask} title={this.props.title}/>
                    <TodoListTasks
                        changeStatus={this.changeStatus}
                        changeTitle={this.changeTitle}

                        tasks={this.state.tasks.filter(t => {
                            if (this.state.filterValue === "All") {
                                return true;
                            }
                            if (this.state.filterValue === "Completed") {
                                return t.isDone === true;
                            }
                            if (this.state.filterValue === "Active") {
                                return t.isDone === false;
                            }
                        })}/>
                    <TodoListFooter
                        filterValue={this.state.filterValue}
                        changeFilter={this.changeFilter}
                    />
                </div>
        );
    }
}

export default ToDoList;

