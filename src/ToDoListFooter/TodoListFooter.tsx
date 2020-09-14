import React from 'react';
import '../App.css';

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
        let ClassForALL = this.props.filterValue === "All" ? 'active btn btn-outline-info btn-sm' : "btn btn-outline-info btn-sm";
        let ClassForCompleted = this.props.filterValue === "Completed" ? 'active btn btn-outline-info btn-sm' : "btn btn-outline-info btn-sm ml-1";
        let ClassForActive = this.props.filterValue === "Active" ? 'active btn btn-outline-info btn-sm' : "btn btn-outline-info btn-sm ml-1";

        return (
                <div className="d-flex justify-content-center">
                    {!this.state.isHidden && <div>
                    <button  className={ClassForALL }
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
                        {!this.state.isHidden && <span  onClick={this.onHideFiltersClick} className="btn btn-outline-info btn-sm ml-1"> hide </span>}
                        {this.state.isHidden && <span onClick={this.onShowFiltersClick} className="btn btn-outline-info btn-sm ml-1"> show </span>}
                </div>
        );
    }
}

export default TodoListFooter;

