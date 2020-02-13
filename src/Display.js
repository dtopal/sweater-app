import React from 'react';
import './Display.css';

class Display extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      sweaterTemp: 293, //20 in degrees C
    }
  };

  render() {
    console.log(this.state.sweaterTemp);

    var answer = {
      title: 'YES',
      message: 'You should wear a sweater.'
    }
    if (this.props.tempK > this.state.sweaterTemp) {
      answer.title = 'NO';
      answer.message = 'You should not wear a sweater.'
    }

    return(
      <div id="display">
        <div id="answer">
          <h1>{answer.title}</h1>
          <p>{answer.message}</p>
        </div>
        <div id="weather">
          <div>{Math.round(this.props.tempK - 273.15) + '°C'}</div>
          <div>{this.props.weather}</div>
        </div>
      </div>
    )
  };
};

export default Display;
