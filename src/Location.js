import React from 'react';
import './Location.css';

class Location extends React.Component {
  constructor(props){
    super(props);
  }


  render() {
    return(
      <div id="location">
      <form onSubmit={this.props.handleSubmit}>
        <input type="text" name="placename" placeholder="please input location" value={this.props.place} onChange={this.props.onChange} /><input type="submit" value="submit"  />
      </form>

      </div>
    )
  }

}

export default Location;


//<p>Latitude: { this.props.latitude }</p>
//<p>Longitude: { this.props.longitude }</p>
