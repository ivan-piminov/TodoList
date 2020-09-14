import React from 'react';
import '../App.css';
import TodoListHeader from "../ToDoListHeader/TodoListHeader";
import TodoListTasks from "../ToDoListTasks/TodoListTasks";
import TodoListFooter from "../ToDoListFooter/TodoListFooter";
import {TaskType, TodoType, UpadateTaskType} from "../types/entities";


type StateType = {
    filterValue: string
}

type OwnPropsType = {
    id: string
    loadTasks: (id: string) => void
    addTask: (id: string, taskTitle: string) => void
    changeTask: (id: string, taskId: string, task: TaskType, newPropsObj: UpadateTaskType) => void
    title: string
    todolist: TodoType
    tasks: Array<TaskType>
}


class ToDoList extends React.Component<OwnPropsType, StateType> {

    state: StateType = {
        filterValue: "All"
    };

    componentDidMount() {
        this.props.loadTasks(this.props.id);
    }

    addTask = (taskTitle: string): void => {
        this.props.addTask(this.props.id, taskTitle);
    };

    changeFilter = (newFilterValue: string): void => {
        this.setState({
            filterValue: newFilterValue
        })
    };

    changeTask = (task: TaskType, taskId: string, newPropsObj: UpadateTaskType) => {
        this.props.changeTask(this.props.id, taskId, task, newPropsObj);
    };

    changeStatus = (task: TaskType, taskId: string, isDone: boolean) => {

        this.changeTask(task, taskId, {status: isDone ? 2 : 0})
    };

    changeTitle = (task: TaskType, taskId: string, newTitle: string) => {
        this.changeTask(task, taskId, {title: newTitle})
    };

    render = () => {
        return (
            <div className="todoList mt-3 ml-3 " style={{border: "2px solid black", background: "white"}}>
                <TodoListHeader id={this.props.id} addTask={this.addTask} title={this.props.title}/>
                {this.props.todolist.loading ?
                    <div className="spinner-border text-primary" role="status" style={{marginLeft: "45%"}}>
                        <span className="sr-only">Loading...</span></div>
                    : <TodoListTasks
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

