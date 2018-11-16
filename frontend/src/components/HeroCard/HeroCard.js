import React, { Component } from "react";
import "./HeroCard.scss"
import Speech from 'react-speech'
import FlipCard from 'react-flipcard'

class HeroCard extends Component {

  constructor(props) {
    super(props)
     this.state = {
       ...props
      }
  }


  componentWillReceiveProps(props){
    this.setState(
      props
      )
    }

    getInitialState() {
    return {
      isFlipped: false
    };
  }

  showBack() {
    this.setState({
      isFlipped: true
    });
  }

  showFront() {
    this.setState({
      isFlipped: false
    });
  }

  handleOnFlip(flipped) {
    if (flipped) {
      this.refs.backButton.getDOMNode().focus();
    }
  }

  handleKeyDown(e) {
    if (this.state.isFlipped && e.keyCode === 27) {
      this.showFront();
    }
  }


  render() {
     {


    return (
      <FlipCard
        disabled={true}
        flipped={this.state.isFlipped}
        onFlip={this.handleOnFlip}
        onKeyDown={this.handleKeyDown}
      >

        <div className ="frontCard">
          <div className="characterImage">
            <img src={this.state.letter.characters[0].image} />
            <Speech
              text={`${this.state.letter.letterChar} is for ${this.state.letter.characters[0].name}.`}
              textAsButton={true}
              rate=".95"
            voice="Google UK English Female" />
            <button type="button" onClick={this.showBack}>Show back</button>
          </div>
        </div>

        <div className ="backCard">
          <div className="characterImage">
            <img src={this.state.letter.characters[0].image} />
            <Speech
              text={`${this.state.letter.letterChar} is for ${this.state.letter.characters[0].name}.`}
              textAsButton={true}
              rate=".95"
            voice="Google UK English Female" />
            <button type="button" ref="backButton" onClick={this.showFront}>Show front</button>          </div>
        </div>

      </FlipCard>
    )
  }
}
}
export default HeroCard;
