import React from 'react';
import Slider from 'react-slick';

type CardSliderProps = {
  cards: { image: string; title: string; description: string }[];
};

const CardSlider: React.FC<CardSliderProps> = ({ cards }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-wrapper">
      <Slider {...settings}>
        {cards.map((card, index) => (
          <div key={index} className="card">
            <img src={card.image} alt={card.title} />
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardSlider;
