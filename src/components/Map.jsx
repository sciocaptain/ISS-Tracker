import React from "react";
import GoogleMapReact from "google-map-react";
import UFO from "../assets/ufoimage.png";

const ISS_URL = "https://api.wheretheiss.at/v1/satellites/25544";
const MAP_KEY = "I do not have a valid api key anymore";

const img = <img src={UFO} alt="iss" height="30px" />;

const SpaceStation = ({ img }) => <div>{img}</div>;

class Map extends React.Component {
  //Initial State Coordinates and Zoom
  state = {
    center: {
      lat: 0,
      lng: 0
    },
    zoom: 1
  };

  //Is run everytime the class
  componentDidMount() {
    this.getCoordinates();
    this.interval = setInterval(this.getCoordinates, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getCoordinates = () => {
    fetch(ISS_URL)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          center: {
            lat: data.latitude,
            lng: data.longitude
          }
        })
      );
  };

  render() {
    console.log("LAT:", this.state.center.lat);
    console.log("LNG:", this.state.center.lng);
    return (
      <div>
        <p>Latitude: {this.state.center.lat}</p>
        <p>Longitude: {this.state.center.lng}</p>
        <div className="map" style={{ height: "100vh", width: "100%" }}>
          <GoogleMapReact
            className="map"
            bootstrapURLKeys={{ key: MAP_KEY }}
            center={this.state.center}
            zoom={this.state.zoom}
          >
            <SpaceStation
              lat={this.state.center.lat}
              lng={this.state.center.lng}
              img={img}
            />
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default Map;
