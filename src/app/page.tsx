"use client";

import React from 'react';
import CardSlider from '../../components/CardSlider';

const HomePage: React.FC = () => {
  const cards = [
    {
      image: '/images/placeholder.jpg', // Ensure this path is correct
      title: 'Card 1',
      description: 'This is the description for card 1.',
    },
    {
      image: '/images/placeholder.jpg',
      title: 'Card 2',
      description: 'This is the description for card 2.',
    },
    {
      image: '/images/placeholder.jpg',
      title: 'Card 3',
      description: 'This is the description for card 3.',
    },
    {
      image: '/images/placeholder.jpg',
      title: 'Card 4',
      description: 'This is the description for card 4.',
    },
    {
      image: '/images/placeholder.jpg',
      title: 'Card 5',
      description: 'This is the description for card 5.',
    },
  ];

  return (
    <div className="container">
      <h1>Card Slider Example</h1>
      <CardSlider cards={cards} />
    </div>
  );
};

export default HomePage;
