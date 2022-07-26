import React from "react";

function Card({ image, alt, heading, buttonLabel, buttonLink }) {
  return (
    <div className="CardContainer_card">
      <img className="CardImg_card" src={image} alt={alt} />
      <h2 className="CardHeading_card">{heading}</h2>
    </div>
  );
}

export default Card;
