import React from 'react';
import './App.css';

type StateType = {
    isHidden:boolean
}

type OwnPropsType = {
    changeFilter:(filterValue:string)=>void
    filterValue:string
}


class TodoListFooter extends React.Component<OwnPropsType,StateType> {
    state = {
        isHidden: false
    };

    onAllFilterClick = ():void=> {this.props.changeFilter("All")};
    onCompletedFilterClick = ():void => { this.props.changeFilter("Completed")};
    onActiveFilterClick = ():void => { this.props.changeFilter("Active")};
    onShowFiltersClick = ():void => {this.setState ({isHidden: false})};
    onHideFiltersClick = ():void => {this.setState ({isHidden: true})};


    render = () => {
        let ClassForALL = this.props.filterValue === "All" ? 'filter-active' : "";
        let ClassForCompleted = this.props.filterValue === "Completed" ? 'filter-active' : "";
        let ClassForActive = this.props.filterValue === "Active" ? 'filter-active' : "";

        return (
            <div className="">
                <div className="todoList-footer">
                    {!this.state.isHidden && <div>
                    <button className={ClassForALL}
                            onClick={this.onAllFilterClick}
                    >All
                    </button>

                    <button className={ClassForCompleted}
                            onClick={this.onCompletedFilterClick}
                    >Completed
                    </button>

                    <button className={ClassForActive}
                            onClick={this.onActiveFilterClick}
                    >Active
                    </button>
                    </div>}
                        {!this.state.isHidden && <span onClick={this.onHideFiltersClick}> hide </span>}
                        {this.state.isHidden && <span onClick={this.onShowFiltersClick}> show </span>}
                </div>
            </div>
        );
    }
}

export default TodoListFooter;

