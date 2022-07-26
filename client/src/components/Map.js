import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { DispatchContext } from "../context/GlobalContext";
import { useTheme } from "styled-components";
import { mapStyles } from "../globalStyles";
import MapInfoWindow from "./MapInfoWindow";
import GoogleMapReact from "google-map-react";
import { ImLocation } from "react-icons/im";


const MapContainer = (home) => {
  const theme = useTheme();
  const history = useHistory();
  const dispatch = useContext(DispatchContext);
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState({});
  const [mapStyle, setMapStyle] = useState(mapStyles.dark);
  const homes = home.data;
  const location = {
    lng: homes.length === 0 ? 52.189 : homes[0].position.lng,
    lat: homes.length === 0 ? 52.189 : homes[0].position.lat,
  };

  useEffect(() => {
    setMapStyle(theme.name === "dark" ? mapStyles.dark : mapStyles.light);
  }, [theme]);

  

  const markerClicked = (home) => {
    setSelectedPlace(home);
    setShowInfoWindow(true);
    dispatch({ type: "SET_SELECTEDITEM", payload: home });
  };

  const closeInfoWindow = () => {
    setSelectedPlace(null);
    setShowInfoWindow(false);
    dispatch({ type: "REMOVE_SELECTEDITEM" });
  };

  const createMapOptions = () => ({
    styles: mapStyle
  })
  return (
    <div key={mapStyle} style={{ width: "100%", height: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API }}
        defaultCenter={location}
        defaultZoom={12}
        onClick={closeInfoWindow}
        options={createMapOptions}
      >
        {homes.map((home) => (
          <div className="MapMarker"
            onClick={() => markerClicked(home)}
            lat={home.position.lat}
            lng={home.position.lng}
            key={home._id}
          >
            {showInfoWindow && selectedPlace._id === home._id && (
              <MapInfoWindow
                selectedPlace={selectedPlace}
                history={history}
                closeInfoWindow={closeInfoWindow}
              />
            )}
            <ImLocation />
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default MapContainer;
