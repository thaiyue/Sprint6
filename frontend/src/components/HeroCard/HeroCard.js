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
       resume: false
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


  render() {

    const FlippyStyle = {
      width: '388px',
      height: '600px',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'sans-serif',
      fontSize: '30px',
      justifyContent: 'center',
      paddingBottom: '3rem'
    }

    let textstyle = {
  play: {
    hover: {
      backgroundColor: 'black',
      color:'white'
    },
    button: {
      padding:'4',
      fontFamily: 'Badoom',
      fontSize: '1.0em',
      cursor: 'pointer',
      pointerEvents: 'none',
      outline: 'none',
      backgroundColor: 'white',
      border: 'none',
      color: 'white'
    },
}}

const { letter, currentIndex } = this.state
const image = letter.characters[currentIndex].image
const name = letter.characters[currentIndex].name

    return (

      <Flippy
        flipDirection="horizontal"
        flipOnClick={false}
        isFlipped={false}
        ref={(r) => this.flippyHorizontal = r}
        style={FlippyStyle}>



        <FrontSide
          style={{backgroundColor: '#175852' }}>
          <div className ="letterFront">
            <div className ="letterBanner">
              <p>{letter.letterChar} IS FOR</p>
            </div>
            <div className="characterBanner">
              <h2>{name}</h2>
            </div>
            <div className="leftLogo">
              <h2>{letter.letterChar}</h2>
            </div>
            <div className="characterFrontImage">
              <img src={image} onClick={() => this.flippyHorizontal.toggle()}/>
              <Speech onRef={ref => (this.speech = ref)}
                styles={textstyle}
                text={`${letter.letterChar} is for ${name}. Now let's see if you'll keep talking for the rest of the day. Oh say can you see, by the dawn's early light. What so proudly we hailed at the twilight's last gleaming. Who's broads stripes and bright stars, through the perilous fight. Oer the ramparts we watched were so gallantly streaming. And the rockets red glare! The bombs bursting in air! Gave proof through the night, that our flag was still there. Oh say does that star spangle, banner yet wave. Oer the land of the free! And the home of the brave.`}
                textAsButton={true}
                displayText={`${letter.letterChar} is for ${name}.`}
                rate=".95"
              voice="Google UK English Female" />
            </div>
          </div>
        </FrontSide>

        <BackSide
          style={{ height: '600px',backgroundColor: '#175852' }}>
          <div className ="letterBack">
            <div className="characterBackImage">
              <img src={image} onClick={() => this.flippyHorizontal.toggle()} />
              <Speech
                text={`${letter.letterChar} is for ${name}.`}
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
