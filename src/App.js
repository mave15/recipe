import React, { Component } from 'react';import ReactDOM from 'react-dom';
import Banner from './Banner';
import Box from './Box';

class App extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            type: "edit",
            index: 0,
            ingredients: [],
            items: JSON.parse(localStorage.items),
            name: "",
            visibility: "hidden",
        };
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.edit = this.edit.bind(this);
        this.submit = this.submit.bind(this);
    };

    addItem() {
        this.setState(prevState => ({
            type: "add",
            visibility: "visible",
        }));
    }

    componentWillMount(){
        let arr = [
            {name: "Pizza", ingredients:["Crust", "Sauce", "Cheese", "Pepperoni"]},
            {name: "Hamburger", ingredients:["Bun", " Meat", "Mustard", "Ketchup", "Pickle", "Onion", "Lettuce"]}
        ];
        if(!localStorage["items"]){
            localStorage.items = JSON.stringify(arr);
        }
    }

    deleteItem(event) {
        let index = event.currentTarget.id;
        let arr = this.state.items;
        arr.splice(index, 1);
        this.setState(prevState => ({
            items: arr
        }));
        localStorage.items = JSON.stringify(arr);
    };

    edit(event) {
        let newIndex = event.currentTarget.id;
        this.setState(prevState => ({
            index: newIndex,
            type: "edit",
            visibility: "visible",
        }));
        this.refs.name.value = this.state.items[newIndex].name;
        this.refs.ingredients.value = this.state.items[newIndex].ingredients.join(", ")
    }

    submit() {
        let arr = this.state.items;
        let newName = this.refs.name.value;
        if(this.refs.name.value == ""){
            newName = "Untitled"
        }
        let newIngredients = this.refs.ingredients.value.split(",");
        newIngredients = newIngredients.map((e)=>{
            if(e !== ""){
                return e.trim();
            }
            else{
                return "Missing Ingredient(s)";
            }
        });
        if(this.state.type == "add"){
            arr.push({name: newName, ingredients: newIngredients});
        }
        else{
            arr[this.state.index] = {name: newName, ingredients: newIngredients};
        }
        this.refs.name.value = "";
        this.refs.ingredients.value = "";
        this.setState(prevState => ({
            items: arr,
            visibility: "hidden",
        }));
        localStorage.items = JSON.stringify(arr);
    }

    render() {

        let boxArr = this.state.items.map((item, key)=>{
            return(
                <Box item={item} key={key} index={key} delete={this.deleteItem} edit={this.edit} />
            );
        });

        return (
            <div className="App">
                <div className="add">
                    <button className="add-button" style={{visibility: this.state.visibility=="visible"?"hidden":"visible"}} onClick={this.addItem}>Add Item</button>
                    <div className="form" style={{visibility: this.state.visibility}}>
                        <input type="text" id="name" placeholder="Name" ref="name"/>
                        <textarea id="ingredients" placeholder="List of ingredients separated by commas:
                         meat, potatoes, green beans" ref="ingredients"/>
                        <button className="save" onClick={this.submit}>Save</button>
                    </div>
                </div>
                <Banner />
                <div className="container">
                    {boxArr}
                </div>
            </div>
        );
    }
}

let arr = [
    {name: "Pizza", ingredients:["Crust", "Sauce", "Cheese", "Pepperoni"]},
    {name: "Hamburger", ingredients:["Bun", " Meat", "Mustard", "Ketchup", "Pickle", "Onion", "Lettuce"]},
    {name: "Philly Cheesesteak", ingredients:["Beef Steak", "Green Pepper", "Hoagie Roll", "Cheese"]}
];
if(!localStorage["items"]){
    localStorage.items = JSON.stringify(arr);
}


ReactDOM.render(<App />, document.getElementById('App'));