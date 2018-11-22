import React, { Component } from "react"
import "./HeroPickerItem.scss"

class HeroPickerItem extends Component {

  constructor(props) {
    super(props)
     this.state = {
       ...props,
      }
  }

  handleClick = (e) =>{
    this.props.handleCharacterSelection(this.props.index)
  }

    render()
    {
      return (

        <div className ="heroPickerRow">
          <div className="heroImageContainer" onClick={this.handleClick} >
            <h3>{this.state.name}</h3>
            <img src = {this.state.image} />
          </div>
        </div>
      )
    }
}
export default HeroPickerItem
