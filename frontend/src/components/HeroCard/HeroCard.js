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

    // let timer = null;
    // let reading = false;
    //
    // const readText = function(text) {
    //
    //     if (!reading) {
    //         speechSynthesis.cancel();
    //         if (timer) {
    //             clearInterval(timer);
    //         }
    //         let msg = new SpeechSynthesisUtterance();
    //         let voices = window.speechSynthesis.getVoices();
    //         msg.voice = voices[82];
    //         msg.voiceURI = 'native';
    //         msg.volume = 1; // 0 to 1
    //         msg.rate = 1.0; // 0.1 to 10
    //         msg.pitch = 1; //0 to 2
    //         msg.text = text;
    //         msg.lang = 'zh-TW';
    //
    //         msg.onerror = function(e) {
    //             speechSynthesis.cancel();
    //             reading = false;
    //             clearInterval(timer);
    //         };
    //
    //         msg.onpause = function(e) {
    //             console.log('onpause in ' + e.elapsedTime + ' seconds.');
    //         }
    //
    //         msg.onend = function(e) {
    //             console.log('onend in ' + e.elapsedTime + ' seconds.');
    //             reading = false;
    //             clearInterval(timer);
    //         };
    //
    //         speechSynthesis.onerror = function(e) {
    //             console.log('speechSynthesis onerror in ' + e.elapsedTime + ' seconds.');
    //             speechSynthesis.cancel();
    //             reading = false;
    //             clearInterval(timer);
    //         };
    //
    //         speechSynthesis.speak(msg);
    //
    //         timer = setInterval(function(){
    //             if (speechSynthesis.paused) {
    //                 console.log("#continue")
    //                 speechSynthesis.resume();
    //             }
    //
    //         }, 100);
    //
    //         reading = true;
    //
    //     }
    // }

    // var myTimeout;
    //  function myTimer() {
    //      window.speechSynthesis.pause();
    //      window.speechSynthesis.resume();
    //      myTimeout = setTimeout(myTimer, 10000);
    //  }
    //  ...
    //      window.speechSynthesis.cancel();
    //      myTimeout = setTimeout(myTimer, 10000);
    //      var toSpeak = "some text";
    //      var utt = new SpeechSynthesisUtterance(toSpeak);
    //      ...
    //      utt.onend =  function() { clearTimeout(myTimeout); }
    //      window.speechSynthesis.speak(utt);
    //  ...

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
                text={`${this.state.letter.letterChar} is for ${this.state.letter.characters[0].name}. Now let's see if you'll keep talking for the rest of the day. Oh say can you see, by the dawn's early light. What so proudly we hailed at the twilight's last gleaming. Who's broads stripes and bright stars, through the perilous fight. Oer the ramparts we watched were so gallantly streaming. And the rockets red glare! The bombs bursting in air! Gave proof through the night, that our flag was still there. Oh say does that star spangle, banner yet wave. Oer the land of the free! And the home of the brave.`}
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
