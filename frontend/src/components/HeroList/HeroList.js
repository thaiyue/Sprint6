import React, { Component } from "react";
import HeroCard from "../HeroCard"
// const APIKEY = `9e51a696b1806dcbcd5554c3c5e838e4`
// const query = `1009368`
// const URL = `https://gateway.marvel.com:443/v1/public/characters/${query}?apikey=9e51a696b1806dcbcd5554c3c5e838e4`
const characterAUrl = "http://localhost:8080/letters/A"

class HeroList extends Component {

  state ={
    characters: [],
    letter: []
  }

  getCharacters = () => {
    fetch(characterAUrl)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        this.setState({
          characters: json.characters.data.results,
          letter: json.letter.letterChar
        })
      })
  }

  componentDidMount(){
    this.getCharacters()
  }



  render() {
    console.log(this.state.characters)
    if (this.state.characters.length > 0)  {
    return (
      <div className="abcList">
        <div className="cardContainer">
          <HeroCard
            characters={this.state.characters}
            letter={this.state.letter}/>
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
