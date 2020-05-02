import React from 'react'


class AddNewItemForm extends React.Component {

    state = {
        error: false,
        title: ""
    };

    onKeyPress = (e) => {
        if (e.key === "Enter") {
            this.onAddItemButtonClick()
        }
    };
    onTitleChanged = (e) => {
        this.setState({title: e.currentTarget.value})
    };


    onAddItemButtonClick = () => {

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