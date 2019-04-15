import React, { Component } from 'react';
import $ from 'jquery'

class Search extends Component {
  state = {
      submitted: false,
      categories: [],
      charities: [],
      selectedCharity: {},
    };

  componentDidMount() {
    $.ajax({
      method: 'post',
      url: 'https://data.orghunter.com/v1/categories?user_key=3bf0ab40cbe750cb184fef3e0e504c16'
    })
    .done((response) => {
      this.setState({
        categories: response.data
      })
    })
    .fail((err) => {
      console.log(err)
    })
  };

  callApi = () => {
    this.setState({submitted: true});
    $.ajax({
      method: 'post',
      url: 'https://data.orghunter.com/v1/charitysearch?user_key=3bf0ab40cbe750cb184fef3e0e504c16&category=' + this.state.selectedCategory + '&state=' + this.state.selectedState
    })
    .done((response) => {
      console.log(response)
      this.setState({
        charities: response.data
      })
    })
    .fail((err) => {
      console.log(err)
    })
  }

  login = () => {
    this.setState({submitted: true})
    $.ajax({
      method: 'post',
      url: 'https://ancient-shelf-55619.herokuapp.com/login',
      data: { user: {"login": this.state.selectedLogin, "password": this.state.selectedPassword}}
    })
    .done((response) => {
      this.setState({
        user: response.data
      })
    })
    .fail((err) => {
      console.log(err)
    })
  }

  saveData = (e, charityName) => {
    this.setState({submitted: true});
    $.ajax({
      method: 'post',
      url: 'https://ancient-shelf-55619.herokuapp.com/charities',
      data: {"charity": {"charity_name": charityName}} // Some data here
    })
    .done((response) => {
    })
    .fail((err) => {
      console.log(err)
    })
  }

  handleLoginChange = e => {
    this.setState({selectedLogin: e.target.value});
  }

  handlePasswordChange = e => {
    this.setState({selectedPassword: e.target.value});
  }

  handleSelectedCategoryChange = e => {
    this.setState({selectedCategory: e.target.value});
  }

  handleSelectedStateChange = e => {
    this.setState({selectedState: e.target.value});
  }

  getDetails = (e, ein) => {
    $.ajax({
      method: 'get',
      url: `https://data.orghunter.com/v1/charitybasic?user_key=3bf0ab40cbe750cb184fef3e0e504c16&ein=${ein}`
    })
    .done((response) => {
      console.log(response)
      this.setState({
        selectedCharity: response.data
      })
    })
  }

  render(){
    let charities = this.state.charities.map((charity) => {
      return (
        <button onClick={e => this.getDetails(e, charity.ein)}>{charity.charityName}</button>
      )
    })
    let categories = this.state.categories.map((category) => {
      return(
        <option value={category.categoryId}>{category.categoryDesc}</option>
      )
    })
    // let user = function (){
    //   return(
    //     <p>{this.state.user}</p>
    //   )
    // }
    return (
      <div className="searchBox">
        <input type="text" placeholder="Enter Username" onChange={this.handleLoginChange}></input>
        <br/>
        <input type="text" placeholder="Enter Password" onChange={this.handlePasswordChange}></input>
        <br/>
        <button onClick={e => this.login()}>Login</button>
        <br/><br/><br/>
        <select onChange={this.handleSelectedCategoryChange}>
          {categories}
        </select>
        <select onChange={this.handleSelectedStateChange}>
          <option value=""></option>
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AS">American Samoa</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="DC">District Of Columbia</option>
          <option value="FM">Federated States Of Micronesia</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="GU">Guam</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MH">Marshall Islands</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="MP">Northern Mariana Islands</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PW">Palau</option>
          <option value="PA">Pennsylvania</option>
          <option value="PR">Puerto Rico</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VI">Virgin Islands</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>
        <button onClick={e => this.callApi(e)}>Search</button>
        <div>
          {charities}
        </div>
        <div>
          <h2 className="charity-header">Name: {this.state.selectedCharity.name}</h2>
          <h3 className="charity-type">Charity Type: {this.state.selectedCharity.nteeClass}</h3>
          <p className="charity-address">Address: <br></br> {this.state.selectedCharity.street}</p>
          <p className="charity-address">{this.state.selectedCharity.city}</p>
          <p className="charity-adress">{this.state.selectedCharity.state} {this.state.selectedCharity.zipCode}</p>
          <button onClick={e => this.saveData(e, this.state.selectedCharity.name)}>Save Charity</button>
        </div>
      </div>
    )
  }
}

export default Search