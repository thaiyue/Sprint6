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
          <img src ={`${this.props.characters[0].thumbnail.path}.${this.props.characters[0].thumbnail.extension}`} />
          <Speech
            text={`${this.props.letter} is for ${this.props.characters[0].name}`}
            textAsButton={true}
            rate=".95"
            displayText={`${this.props.letter} is for ${this.props.characters[0].name}`}
          voice="Google UK English Female" />
        </div>
      </div>
    )
  }
}
// }
export default HeroCard;
