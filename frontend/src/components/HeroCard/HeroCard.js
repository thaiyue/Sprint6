import React, { Component } from "react";
import "./HeroCard.scss"
import Speech from 'react-speech'

class HeroCard extends Component {

  constructor(props) {
    super()
     this.state = {
       ...props
      }
  }



  render() {
    return (

      <div className ="singleLetterComponent">
        <div className="characterImage">
          <img src ={`${this.props.characters[0].thumbnail.path}.${this.props.characters[0].thumbnail.extension}`} />
          <Speech
            text={`I is for ${this.props.characters[0].name}`}
            textAsButton={true}
            rate=".95"
            displayText={`I is for ${this.props.characters[0].name}`}
          voice="Google UK English Female" />
        </div>
      </div>
    )
  }
}

export default HeroCard;
