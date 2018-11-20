import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import HeroList from "./HeroList";
import WebFont from 'webfontloader'

class App extends Component {


  render() {
    return (
      <div className="app">
        <HeroList />
      </div>
    )
  }

}

export default App
