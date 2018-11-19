import React, { Component } from "react";
import "./HeroCard.scss"
import Speech from 'react-speech'
import Flippy, { FrontSide, BackSide } from 'react-flippy'

class HeroCard extends Component {

  constructor(props) {
    super(props)
     this.state = {
       ...props,
      }
  }


  handleClick(e) {
    e.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
}


  render() {

    const FlippyStyle = {
      width: '450px',
      height: '800px',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'sans-serif',
      fontSize: '30px',
      justifyContent: 'center'
    }
     {


    return (

      <Flippy
        flipDirection="horizontal"
        flipOnClick={false}
        isFlipped={false}
        ref={(r) => this.flippyHorizontal = r}
        style={FlippyStyle}>


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
            <button type="button" onClick={() => this.flippyHorizontal.toggle()}>Toggle Me!</button>
          </div>
        </FrontSide>

        <BackSide>
          <div className ="LetterBack">
            <div className="characterImage">
              <img src={this.state.letter.characters[1].image} />
              <Speech
                text={`${this.state.letter.letterChar} is for ${this.state.letter.characters[1].name}.`}
                textAsButton={true}
                rate=".95"
              voice="Google UK English Female" />
            </div>
            <button type="button" onClick={() => this.flippyHorizontal.toggle()}>Flip Me!</button>
          </div>
        </BackSide>
      </Flippy>
        )
        }
        }
        }

        export default HeroCard;
