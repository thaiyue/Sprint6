import React, { Component } from "react";
import HeroCard from "../HeroCard"
import "./HeroList.scss"
// const APIKEY = `9e51a696b1806dcbcd5554c3c5e838e4`
// const query = `1009368`
// const URL = `https://gateway.marvel.com:443/v1/public/characters/${query}?apikey=9e51a696b1806dcbcd5554c3c5e838e4`
const letterURL = "https://comicbookfinal.herokuapp.com/letters/"

class HeroList extends Component {

  state ={
    letters: []
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
    const background = "https://www.desktopbackground.org/p/2010/09/01/73267_amazon-com-roommates-jl1175m-marvel-comic-book-covers-prepasted_1000x571_h.jpg"
    const styleAbcWrapper={backgroundImage: `url(${background})`,
        backgroundSize: '25%',
        backgroundRepeat: 'repeat',
        display: 'flex'
}





    if (this.state.letters.length > 0)  {

    return (
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
