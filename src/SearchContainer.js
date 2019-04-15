import React, { Component } from 'react';
import Search from './Search';

class SearchContainer extends Component {
  state = {
      query: ''
    }

  onSearchInput = e => {
    this.setState({
      query: e.target.value
    })
  }

  onSubmitQuery = e => {
    e.preventDefault();
    console.log(this.state.query)
    this.setState({
      query: ''
    })
  }

  render(){
    return (
      <Search
        handleSearchInput={ e => this.onSearchInput(e) }
        handleSubmitQuery={ e => this.onSubmitQuery(e) }
        query={this.state.query}
      />
    )
  }
}

export default SearchContainer