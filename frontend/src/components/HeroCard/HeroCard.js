import React, { Component } from "react";
import "./HeroCard.scss"
import Speech from 'react-speech'

class HeroCard extends Component {

  constructor(props) {
    super(props)
     this.state = {
       ...props,

      }
    ;
  }



  componentWillReceiveProps(props){
    this.setState(
      props
      )
    }


  render() {
     {


    return (
        <div className ="Letter_Front" key="front">
          <div className="characterImage">
            <img src={this.state.letter.characters[0].image} />
            <Speech
              text={`${this.state.letter.letterChar} is for ${this.state.letter.characters[0].name}.`}
              textAsButton={true}
              rate=".95"
            voice="Google UK English Female" />
          </div>
        </div>


    )
  }
}
}
export default HeroCard;
