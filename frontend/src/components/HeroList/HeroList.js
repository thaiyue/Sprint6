import React, { Component } from "react";
import HeroCard from "../HeroCard"
import "./HeroList.scss"
import Speech from 'react-speech'

const letterURL = "https://comicbookfinal.herokuapp.com/letters/"
class HeroList extends Component {

  state ={
    letters: [],

  }

  getCharacters = () => {
    fetch(letterURL)
      .then(response => response.json())
      .then(json => {
        this.setState({
          letters:json
        })
      })
  }

  componentDidMount(){
    this.getCharacters()
  }




  render() {
    const {hasCapture} = this.state
    const background = "https://www.desktopbackground.org/p/2010/09/01/73267_amazon-com-roommates-jl1175m-marvel-comic-book-covers-prepasted_1000x571_h.jpg"
    const styleAbcWrapper={backgroundImage: `url(${background})`,
        backgroundSize: '25%',
        backgroundRepeat: 'repeat',
        display: 'flex'
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
        fontSize: '9.0em',
        cursor: 'url(gauntlet.cur),auto',
        pointerEvents: 'none',
        outline: 'none',
        backgroundColor: 'white',
        border: 'none',
        color: 'white'
        },
      }
    }

    let textstyleFront2 = {
        play: {
        hover: {
        backgroundColor: 'black',
        color:'white'
        },
      button: {
        paddingTop:'4',
        fontFamily: 'Badoom',
        fontSize: '7.0em',
        cursor: 'url(gauntlet.cur),auto',
        pointerEvents: 'none',
        outline: 'none',
        backgroundColor: 'white',
        border: 'none',
        color: 'white'
        },
      }
    }



    if (this.state.letters.length > 0)  {

    return (
      <div className = "stansContainer">
        <div className ="heroSplash">
          <div className ="heroWelcome">
            <Speech onRef={ref => (this.speech = ref)}
              styles={textstyleFront}
              text={`Hey there true believers!`}
              textAsButton={true}
              displayText={`Hey there true believers!`}
              rate=".95"
            voice="Daniel" />
          </div>
        </div>
        <div className ="heroSplash1">
          <div className ="heroWelcome1">
            <Speech onRef={ref => (this.speech = ref)}
              styles={textstyleFront}
              text={`Welcome to the Marvel ABCs!`}
              textAsButton={true}
              displayText={`Welcome to the Marvel ABCs!`}
              rate=".95"
            voice="Daniel" />
          </div>
        </div>
        <div className ="heroSplash2">
          <div className ="heroWelcome2">
            <Speech onRef={ref => (this.speech = ref)}
              styles={textstyleFront2}
              text={`Each card has multiple heroes that you can listen to!`}
              textAsButton={true}
              displayText={`Each card has multiple heroes that you can listen to!`}
              rate=".95"
            voice="Daniel" />
          </div>
        </div>
        <div className ="heroSplash3">
          <div className ="heroWelcome3">
            <Speech onRef={ref => (this.speech = ref)}
              styles={textstyleFront2}
              text={`Click on the boxes to hear more!`}
              textAsButton={true}
              displayText={`Click on the boxes to hear more!`}
              rate=".95"
            voice="Daniel" />
          </div>
        </div>
        <div className = "stansBox">
          <img src ="stanLee.png" />
        </div>
        <div className="abcWrapper" style={styleAbcWrapper}>

          <div className="abcList">

            {this.state.letters
              .sort((a,b)=>(a.letterChar<b.letterChar) ? -1 : ((b.letterChar<a.letterChar) ? 1 : 0))
              .map((letters,index) =>
                <div className="cardContainer">
                  <HeroCard
                    letter={letters}/>
                </div>)}
          </div>
        </div>
      </div>
    )
  } else {
    return (
  <div className="abcList">
    <p>loading</p>
  </div>
)
}
}
}
export default HeroList;
