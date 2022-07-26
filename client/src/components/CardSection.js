import React from "react";
import Card from "./Card";
import Fade from "react-reveal/Fade";

function CardSection({ itemOne, itemTwo, header }) {
  return (
    <section className="Section_cardSection">
      <h1>{header}</h1>
      <div className="Container_cardSection">
        <div className="ColumnLeft_cardSection">
          <Fade top>
            <Card image={itemOne.images[0]} alt={itemOne.title} buttonLabel="View details" buttonLink={`/homes/${itemOne._id}`} />
          </Fade>
        </div>
        <div className="ColumnLeft_cardSection">
          <Fade bottom>
            <Card image={itemTwo.images[0]} alt={itemTwo.title} buttonLabel="View details" buttonLink={`/homes/${itemTwo._id}`} />
          </Fade>
        </div>
      </div>
    </section>
  );
}

export default CardSection;
