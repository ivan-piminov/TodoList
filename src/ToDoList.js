import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import axios from "axios";


class ToDoList extends React.Component {


    state = {
        filterValue: "All"
    };
    nextItemId = 0;

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.1//todo-lists/${this.props.id}/tasks`,
            {
                withCredentials: true,
                headers: {"API-KEY":"ffd426a2-955f-4438-aed5-116886d2fff8"}
            })
            .then(res => {
                this.props.setTasks(res.data.items,this.props.id);
            });

    }

    // saveState = () => {
    //     localStorage.setItem("our-state-"+this.props.id, JSON.stringify(this.state))
    // };

    // restoreState = () => {
    //     let stateAsString = localStorage.getItem("our-state-"+this.props.id);
    //     if (stateAsString) {
    //         let state = JSON.parse(stateAsString);
    //         this.setState(state, () => {
    //             this.state.tasks.forEach((task) => {
    //                 if (task.id >= this.nextItemId) {
    //                     this.nextItemId = task.id + 1
    //                 }
    //             })
    //         })
    //     }
    // };

    addTask = (newTask) => {
        // let newItem = {
        //     title: newTitle,
        //     isDone: false,
        //     priority: "low",
        //     id: this.nextItemId
        // };
        // this.nextItemId++;

        axios.post(`https://social-network.samuraijs.com/api/1.1//todo-lists/${this.props.id}/tasks`,
            {title: newTask},
            {
                withCredentials: true,
                headers: {"API-KEY":"ffd426a2-955f-4438-aed5-116886d2fff8"}
            })
            .then(res => {
                this.props.addTask(res.data.data.item,this.props.id);
            });

        // this.props.addTask(newTitle,this.props.id)
        // let newTasks = [...this.state.tasks, newItem];
        // this.setState({
        //     tasks: newTasks
        // }, () => {
        //     this.saveState()
        // });

    };
    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        })
            // () => {
            // this.saveState()}
            // )
    };

    changeTask = (task, newPropsObj) => {
        // let tasksCopy = this.props.tasks.map(t => {
        //     if (t.id !== taskId) {
        //         return t;
        //     } else {
        //         return {...t, ...newPropsObj}
        //     }
        // });
        // this.setState({
        //     tasks: tasksCopy
        // }, () => {
        //     this.saveState()})

        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${task.id}`,
            {
                ...task,
                ...newPropsObj
            },
            {
                withCredentials: true,
                headers: {"API-KEY":"ffd426a2-955f-4438-aed5-116886d2fff8"}
            })
            .then(res => {
                this.props.changeTask(task.id, newPropsObj, this.props.id)
            });

    };

    changeStatus = (task, isDone) => {
        this.changeTask(task, {status: isDone ? 2: 0})
    };

    changeTitle = (task, newTitle) => {
        this.changeTask(task, {title: newTitle})
    };

    render = () => {
        return (
                <div className="todoList">
                    <TodoListHeader id={this.props.id} addTask={this.addTask} title={this.props.title}/>
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

