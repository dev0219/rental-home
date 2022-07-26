import React from "react";
import Slide from "react-reveal/Slide";
import { Link } from "react-router-dom";

function InfoSection({
  heading,
  paragraphOne,
  paragraphTwo,
  buttonLabel,
  buttonLink,
  image,
  reverse,
}) {
  return (
    <section className="Section_info">
      <div className="Container_info">
        <div className="ColumnLeft_info" style={{}}>
          <Slide right={!reverse} left={reverse}>
            <h1>{heading}</h1>
            <p>{paragraphOne}</p>
            <p>{paragraphTwo}</p>
          </Slide>
        </div>
        <div className="ColumnRight_info">
          <Slide right={reverse} left={!reverse}>
            <img src={image} alt="home" />
          </Slide>
        </div>
      </div>
    </section>
  );
}

export default InfoSection;
