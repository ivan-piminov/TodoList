import React from 'react';
import './App.css';

class TodoListFooter extends React.Component {
    state = {
        isHidden: false
    };

    onAllFilterClick = () => {this.props.changeFilter("All")};
    onCompletedFilterClick = () => { this.props.changeFilter("Completed")};
    onActiveFilterClick = () => { this.props.changeFilter("Active")};
    onShowFiltersClick = () => {this.setState ({isHidden: false})};
    onHideFiltersClick = () => {this.setState ({isHidden: true})};


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

