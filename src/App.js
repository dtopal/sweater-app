import React from 'react';
import './App.css';
import Location from './Location';
import Display from './Display';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      placeInput: '',
      locationName: '',
      userInput: false,
      temp: null, //temp in K , TC = TK - 273.15, TF = TK * 9/5 - 459.67
      weather: '',
      weatherID: null,
      errorLocation: false
    }
    this.handleLocChange = this.handleLocChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  componentDidMount() {
    if (this.state.userInput === false) {
      //console.log('no user input');

      navigator.geolocation.getCurrentPosition( (position) => {
        //console.log('got position');
        //console.log(position);
        fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&APPID=' + process.env.REACT_APP_WEATHER_KEY)
          .then(response => response.json())
          .then(data => {
            console.log(data.name);
            this.setState({
              placeInput: data.name,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              temp: data.main.temp,
              weather: data.weather[0].main,
              weatherID: data.weather[0].id,
              errorLocation: false
            });
            //console.log(Math.round(data.main.temp - 273.15) + ' C');
          });
      }, (error) => console.log(error), { enableHighAccuracy: true });
    }
  };


  handleLocChange(event) {
    this.setState({
      placeInput: event.target.value
    });
  };

  handleSubmit(event) {
    console.log(this.state.placeInput);
    event.preventDefault();

    var placeName = this.state.placeInput;
    //open weather map api weather?q=London
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + placeName + '&APPID=' + process.env.REACT_APP_WEATHER_KEY)
      .then(response => {
        if (!response.ok && response.statusText === "Not Found" && placeName.includes(',')) {
          var stateLetters = placeName.split(',')[1].trim().toLowerCase();
          if (Object.keys(stateNames).includes(stateLetters)){
            var currPlace = placeName.split(',')[0] + ', ' + stateNames[stateLetters];
            return fetch('https://api.openweathermap.org/data/2.5/weather?q=' + currPlace + '&APPID=' + process.env.REACT_APP_WEATHER_KEY);
          }
        }
        return response;
      })
      .then(response => {
        if (!response.ok) {
          this.setState({
            errorLocation: true
          });
          throw response;
        }

        return response.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          locationName: placeName,
          userInput: true,
          latitude: data.coord.lat,
          longitude: data.coord.lon,
          temp: data.main.temp,
          weather: data.weather[0].main,
          weatherID: data.weather[0].id,
          errorLocation: false
        })
      })
  }

  render() {
    return (
      <div id="app">
        < Location latitude={this.state.latitude} longitude={this.state.longitude} place={this.state.placeInput} onChange={this.handleLocChange} handleSubmit={this.handleSubmit} error={this.state.errorLocation}/>
        < Display userInput={this.state.userInput} tempK={this.state.temp} weather={this.state.weather} />
      </div>
  )};
}

var stateNames = {
  'al': 'alabama', 'ak': 'alaska', 'az': 'arizona', 'ar': 'arkansas',
  'ca': 'california', 'co': 'colorado', 'ct': 'connecticut', 'de': 'delaware',
  'fl': 'florida', 'ga': 'georgia', 'hi': 'hawaii', 'id': 'idaho', 'il': 'illinois',
  'in': 'indiana', 'ia': 'iowa', 'ks': 'kansas', 'ky': 'kentucky', 'la': 'louisiana',
  'me': 'maine', 'md': 'maryland', 'ma': 'massachusetts', 'mi': 'michigan',
  'mn': 'minnestoa', 'ms': 'mississippi', 'mo': 'missouri', 'mt': 'montana',
  'ne': 'nebraska', 'nv': 'nevada', 'nh': 'new hampshire', 'nj': 'new jersey',
  'nm': 'new mexico', 'ny': 'new york', 'nc': 'north carolina', 'nd': 'north dakota',
  'oh': 'ohio', 'ok': 'oklahoma', 'or': 'oregon', 'pa': 'pennsylvania', 'ri': 'rhode island',
  'sc': 'south carolina', 'sd': 'south dakota', 'tn': 'tennessee', 'tx': 'texas',
  'ut': 'utah', 'vt': 'vermont', 'va': 'virginia', 'wa': 'washington', 'wv': 'west virginia',
  'wi': 'wisconsin', 'wy': 'wyoming'
};

export default App;
