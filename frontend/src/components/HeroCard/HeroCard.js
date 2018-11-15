import React, { Component } from "react";
import "./HeroCard.scss"
import Speech from 'react-speech'

class HeroCard extends Component {



  render() {
    console.log(this.props)
    // const Character = ({}) => {
    return (

      <div className ="singleLetterComponent">
        <div className="characterImage">
          <img src ={this.props.letter.image} />
          <Speech
            text={`${this.props.letter.letterChar} is for ${this.props.letter.name}`}
            textAsButton={true}
            rate=".95"
          voice="Google UK English Female" />
        </div>
      </div>
    )
  }
}
// }
export default HeroCard;
