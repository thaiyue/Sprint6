import React, { Component } from "react";
import "./HeroCard.scss"
import Speech from 'react-speech'
import Flipcard from '@kennethormandy/react-flipcard'
// import '@kennethormandy/react-flipcard/dist/Flipcard.css'

class HeroCard extends Component {

  constructor(props) {
    super(props)
     this.state = {
       ...props,
        flipped: false
      }
  }


  componentWillReceiveProps(props){
    this.setState(
      props
      )
    }


  render() {
     {


    return (
      <div>
        <Flipcard flipped={this.state.flipped}>

          <div className ="Front">
            <div className="characterImage">
              <img src={this.state.letter.characters[0].image} />
              <Speech
                text={`${this.state.letter.letterChar} is for ${this.state.letter.characters[0].name}.`}
                textAsButton={true}
                rate=".95"
              voice="Google UK English Female" />
            </div>
            <div>
              <button onClick={e => this.setState({ flipped: !this.state.flipped })}>
                Flip
              </button>
            </div>
          </div>

            <div className ="Back">
              <div className="characterImage">
                <img src={this.state.letter.characters[0].image} />
                <Speech
                  text={`${this.state.letter.letterChar} is for ${this.state.letter.characters[0].name}.`}
                  textAsButton={true}
                  rate=".95"
                voice="Google UK English Female" />
              </div>
              <div>
                <button onClick={e => this.setState({ flipped: !this.state.flipped })}>
                  Flip
                </button>
              </div>
            </div>
            </Flipcard>
          </div>

        )
  }
}
}
export default HeroCard;
