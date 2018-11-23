import React, { Component } from "react";
import "./HeroCard.scss"
import Speech from 'react-speech'
import Flippy, { FrontSide, BackSide } from 'react-flippy'
import HeroPickerItem from './HeroPickerItem'


class HeroCard extends Component {

  constructor(props) {
    super(props)
     this.state = {
       ...props,
       currentIndex: 0,
       pause: false,
       resume: false,
       isMouseInside: false
      }
  }

  componentDidMount(){
    this.timer = setInterval(this.pause(), 5000)
    this.timer2 = setInterval(this.resume(), 5020)
  }

  componentWillUnmount(){
    clearInterval(this.timer)
    clearInterval(this.timer2)
  }


  handleClick(e) {
    e.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
}

pause = () => {
  console.log("pause1", this.speech)
  if(this.speech){
    console.log("pause2")
    this.speech.speechSynthesis.pause()
  }
}
resume = () => {
  if(this.speech){
    console.log("resume")
    this.speech.speechSynthesis.resume()
  }
}

handleCharacterSelection = (index) => {
  this.setState({currentIndex: index});
  this.flippyHorizontal.toggle()
}

mouseEnter = () => {
  this.setState({ isMouseInside: true });
}

mouseLeave = () => {
  this.setState({ isMouseInside: false });
}

  render() {

    const FlippyStyle = {
      width: '41vw',
      height: '100vh',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'sans-serif',
      fontSize: '30px',
      justifyContent: 'center',
      paddingBottom: '3rem',
      backgroundColor: 'black'
    }

    let textstyleFront = {
        play: {
        hover: {
        backgroundColor: 'black',
        color:'white'
        },
      button: {
        padding:'4',
        fontFamily: 'Badoom',
        fontSize: '1.0em',
        cursor: 'url(gauntlet.cur),auto',
        pointerEvents: 'none',
        outline: 'none',
        backgroundColor: 'white',
        border: 'none',
        color: 'white'
        },
      }
    }

    let textstyleBack = {
        play: {
        hover: {
        backgroundColor: 'black',
        color:'white'
        },
      button: {
        padding:'4',
        fontFamily: 'Badoom ',
        fontSize: '1.0em',
        cursor: 'url(gauntlet.cur),auto',
        pointerEvents: 'none',
        outline: 'none',
        backgroundColor: 'white',
        border: 'none',
        color: 'white',
        width:'60%'
        },
      }
    }

const { letter, currentIndex } = this.state
const image = letter.characters[currentIndex].image
const name = letter.characters[currentIndex].name
const description = letter.characters[currentIndex].description
    return (

      <Flippy
        flipDirection="horizontal"
        flipOnClick={false}
        isFlipped={false}
        ref={(r) => this.flippyHorizontal = r}
        style={FlippyStyle}>



        <FrontSide>
          <div className ="letterFront">
            <div className ="letterBanner">
              <p>{letter.letterChar} IS FOR</p>
            </div>
            <div className="characterBanner">
              <h2>{name}</h2>
            </div>
            <div className="leftLogo">
              <p>Nov 2019</p>
              <h2>{letter.letterChar}</h2>
            </div>
            <div className="characterFrontImage" style={{ cursor: 'url(shield.cur),auto' }}>
              <img src={image} onClick={() => this.flippyHorizontal.toggle()}/>
              <Speech onRef={ref => (this.speech = ref)}
                styles={textstyleFront}
                text={`${letter.letterChar} is for ${name}.`}
                textAsButton={true}
                displayText={`${letter.letterChar} is for ${name}.`}
                rate=".95"
              voice="Google UK English Female" />
            </div>
          </div>
        </FrontSide>

        <BackSide>
          <div className ="letterBack">
            <div className="characterBanner">
              <h2>{name}</h2>
            </div>
            <div className="characterBackImage">
              <img src={image} onClick={() => this.flippyHorizontal.toggle()} style={{ cursor: 'url(shield.cur),auto' }}/>
              <div className="characterDescriptionBox">
              </div>
              <Speech
                text={`${description}`}
                styles={textstyleBack}
                textAsButton={true}
                rate=".95"
              voice="Google UK English Female" />
              <div className="characterSelector">
                {letter.characters
                  .map((characters, index)=>
                    <div className="individualCharacterPicker">
                      <HeroPickerItem
                        key={index}
                        index={index}
                        handleCharacterSelection= {this.handleCharacterSelection}
                        name={characters.name}
                        image={characters.image}
                      />
                    </div>)}
              </div>
            </div>
          </div>
        </BackSide>
      </Flippy>
        )
        }
        }

        export default HeroCard;
