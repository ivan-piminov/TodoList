import React from "react";

export class EditableSpan extends React.Component {
    state = {
        editMode: false
    };
    activateEdit = () => {
        this.setState({editMode: true})
    };
    deActivateEdit = (e) => {
        this.props.onChange(e.currentTarget.value);
        this.setState({editMode: false})
    };


    render = () => {
        return (
            <>
                {this.state.editMode
                    ? <input defaultValue={this.props.value}
                             autoFocus={true}
                             onBlur={this.deActivateEdit}
                    />
                    : <span onClick={this.activateEdit}> {this.props.value}</span>
                }
            </>
        );
    }
}