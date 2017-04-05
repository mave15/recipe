import React, { Component } from 'react';
import Collapse from 'react-collapse';
import BoxButtons from'./BoxButtons';

class Box extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            opened: false,
            buttonText: "+"
        };
        this.handleClick = this.handleClick.bind(this)
    };

    divStyle = {
        float: "right",
        marginTop: -2,
        marginRight: 10,
        border: 0,
        fontSize: 24,
        fontWeight: 800
    };

    handleClick() {
        this.setState(prevState => ({
            opened: !prevState.opened,
            buttonText: prevState.buttonText == "+" ? "-" : "+",
        }));
    }

    render() {

        let ingredients = this.props.item.ingredients.map((ingredient, key)=>{
            return(
                <li key={key}>{ingredient}</li>
            )
        });

        return (
            <div className="box-spacer">
                <div className="box">
                    <div className="box-header" onClick={this.handleClick}>{this.props.item.name}<div style={this.divStyle}>{this.state.buttonText}</div></div>
                    <Collapse isOpened={this.state.opened} springConfig={{stiffness: 380, damping: 40}} style={{borderTop: "1px solid black"}}>
                        <p style={{fontFamily: "Oswald", fontSize: 20, fontWeight: 800, textAlign: "center"}}>
                            Ingredients
                        </p>
                        <ul>
                            {ingredients}
                            &nbsp;
                        </ul>
                    </Collapse>
                    <BoxButtons delete={this.props.delete} edit={this.props.edit} index={this.props.index} key={this.props.index} isOpened={this.state.opened}/>
                </div>
            </div>
        );
    }
}

export default Box;