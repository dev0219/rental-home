import { useState } from "react";
import { BsDot } from "react-icons/bs";
import { FaBed, FaBath } from "react-icons/fa";
import { GiResize } from "react-icons/gi";
import {
  IoArrowBackOutline,
} from "react-icons/io5";

function HomeDetails({ home, back }) {

  if (!home) {
    return (
      <div className="Container_homeDet">
        <div className="Header_homeDet">
          <IoArrowBackOutline className="BackButton_homeDet" onClick={back} />
        </div>
        <h1>No Home found</h1>
      </div>
    );
  }
  return (
    <div className="Container_homeDet">
      <div className="Header_homeDet">
        <div className="HeaderFirstSection_homeDet">
          <IoArrowBackOutline className="BackButton_homeDet" onClick={back} />
          <div>
            <ul>
              <li className="home-price">${home.price}</li>
              <li>
                <BsDot />
              </li>
              <li> {home.type}</li>
              <li>
                <BsDot />
              </li>
              <li className="time"> {home.date.substr(0,10)}</li>
            </ul>
            <span className="home-address">{home.address}</span>
          </div>
        </div>
        <div className="HeaderSecondSection_homeDet">
          <ul>
            <li>
              <FaBed /> {home.rooms} Bed
            </li>
            <li>
              <FaBath /> {home.washrooms} Bath
            </li>
            <li>
              <GiResize /> {home.size} FT²
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HomeDetails;
