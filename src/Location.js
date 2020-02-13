import React from 'react';
import './Location.css';

class Location extends React.Component {
  constructor(props){
    super(props);
  }


  render() {

    var visibility;
    if (this.props.error) {
      visibility = "visible";
    } else {
      visibility = "hidden";
    }

    return(
      <div id="location">
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <input type="text" name="placename" placeholder="please input location" value={this.props.place} onChange={this.props.onChange} /><input type="submit" value="submit"  />
        </form>
      </div>
      <div id="error" class={visibility}>
      <p>ERROR: location not found</p>
      </div>

      </div>
    )
  }

}

export default Location;


//<p>Latitude: { this.props.latitude }</p>
//<p>Longitude: { this.props.longitude }</p>
