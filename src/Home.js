import React, { Component } from 'react';
import SearchContainer from './SearchContainer';


class Home extends Component {
  render(){
    return (
      <div className="main-container">
        <h1 className="main-title">Charity Chooser</h1>
        <h3 className="sub-title">Your comprehensive resource to select a charitable organization!</h3>
        <SearchContainer />
        <br/><br/><br/><br/><br/>
      </div>
    )
  }
}

export default Home;
