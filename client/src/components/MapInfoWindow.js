import { useEffect, useState } from "react";

import {
  IoChevronForward,
  IoChevronBack,
  IoCloseCircleSharp,
} from "react-icons/io5";
import { BsDot } from "react-icons/bs";

function MapInfoWindow({ selectedPlace, history, closeInfoWindow }) {
  let [selectedImg, setSelectedImg] = useState(0);
  return (
    <div className="InfoWindowContent_mapInfo">
      <IoCloseCircleSharp className="CloseBtn_mapInfo arrowStyles_homeDet" onClick={closeInfoWindow} />
      <div className="InfoWindowImgContainer_mapInfo">
        <img
          src={selectedPlace.image ? selectedPlace.image[selectedImg].substr(14) : ""}
          alt={selectedPlace.type}
        />
      </div>

      <h3>{selectedPlace.title}</h3>
      <span>${selectedPlace.price}</span>
      <span>
        {selectedPlace.type} <BsDot /> {selectedPlace.date.substr(0,10)}
      </span>
      <span>
        {selectedPlace.rooms} BED <BsDot /> {selectedPlace.washrooms} BATH{" "}
        <BsDot /> {selectedPlace.size}FT²
      </span>
      <span>PETS : {selectedPlace.pets ? " allowed" : " not allowed"}</span>
    </div>
  );
}

export default MapInfoWindow;
