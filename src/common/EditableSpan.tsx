import React, {ChangeEvent} from "react";

type StateType = {
    editMode: boolean
}
type OwnPropsType = {
    value: string
    onChange: (value: string) => void
}

export class EditableSpan extends React.Component<OwnPropsType, StateType> {
    state: StateType = {
        editMode: false
    };
    activateEdit = (): void => {
        this.setState({editMode: true})
    };
    deActivateEdit = (e: ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(e.currentTarget.value);
        this.setState({editMode: false})
    };

    render = () => {
        return (
            <span className='mt-1' >
                {this.state.editMode
                    ? <input defaultValue={this.props.value}
                             autoFocus={true}
                             onBlur={this.deActivateEdit}
                    />
                    : <span onClick={this.activateEdit} style={{paddingTop:"3px", fontWeight:'bold'}}> {this.props.value}</span>
                }
            </span>
        );
    }
}