import React, { useState, useRef } from "react";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import Fade from "react-reveal/Fade";

const Hero = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;
  const timeout = useRef(null);

  const nextSlide = () => {
    if (timeout.current) clearTimeout(timeout.current);
    setCurrent((current + 1) % length);
  };
  const previousSlide = () => {
    if (timeout.current) clearTimeout(timeout.current);
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (slides.length === 0) return null;
  return (
    <section className="HeroSection_hero">
      <div className="HeroWrapper_hero">
        <div className="HeroSlide_hero">
          <div className="HeroSlider_hero">
            <img className="HeroImage_hero" src={slides[current].image} alt={slides[current].alt} />
            <div className="HeroContent_hero">
              <Fade right>
                <h1>{slides[current].title}</h1>
              </Fade>
            </div>
          </div>
        </div>
        <div className="SliderButtons_hero">
          <IoArrowBack className="arrowButtons_hero" onClick={previousSlide} />
          <IoArrowForward className="arrowButtons_hero" onClick={nextSlide} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
