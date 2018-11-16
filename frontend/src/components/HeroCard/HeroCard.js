import React, { Component } from "react";
import "./HeroCard.scss"
import Speech from 'react-speech'
import Flippy, { FrontSide, BackSide } from 'react-flippy'

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


  render() {
     {


    return (

      <Flippy
        flipOnHover={false}
        flipOnClick={true}
        flipDirection="horizontal"
      ref={(r) => this.flippy = r}>

        <FrontSide>
          <div className ="LetterFront">
            <div className="characterImage">
              <img src={this.state.letter.characters[0].image} />
              <Speech
                text={`${this.state.letter.letterChar} is for ${this.state.letter.characters[0].name}.`}
                textAsButton={true}
                rate=".95"
              voice="Google UK English Female" />
            </div>
          </div>
        </FrontSide>

        <BackSide>
          <div className ="LetterBack">
            <div className="characterImage">
              <img src={this.state.letter.characters[0].image} />
              <Speech
                text={`${this.state.letter.letterChar} is for ${this.state.letter.characters[0].name}.`}
                textAsButton={true}
                rate=".95"
              voice="Google UK English Female" />
            </div>
          </div>
        </BackSide>
      </Flippy>
        )
        }
        }
        }

        export default HeroCard;
