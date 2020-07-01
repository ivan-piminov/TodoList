import React, {ChangeEvent, KeyboardEvent} from 'react';

type StateType = {
    error: boolean
    title: string
}
type OwnPropsType = {
    addItem: (newTitle: string) => void
}

class AddNewItemForm extends React.Component<OwnPropsType,StateType> {

    state:StateType = {
        error: false,
        title: ""
    };

    onKeyPress = (e:KeyboardEvent<HTMLInputElement>):void => {
        if (e.key === "Enter") {
            this.onAddItemButtonClick()
        }
    };
    onTitleChanged = (e: ChangeEvent<HTMLInputElement>):void => {
        this.setState({title: e.currentTarget.value})
    };


    onAddItemButtonClick = ():void => {
        let newTitle = this.state.title;
        if (newTitle !== "") {
            this.props.addItem(newTitle);
            this.setState({error: false, title: ""});
        } else {
            this.setState({error: true})
        }
    };

    render = () => {
        const inputClassName = this.state.error ? "error" : "";
        return (
            <div className="newItemForm">
                <input type="text" placeholder="New item name"
                       className={inputClassName}
                       onKeyPress={this.onKeyPress}
                       value={this.state.title}
                       onChange={this.onTitleChanged}
                />
                <button onClick={this.onAddItemButtonClick}>Add</button>
            </div>
        );
    };
}
export default AddNewItemForm;