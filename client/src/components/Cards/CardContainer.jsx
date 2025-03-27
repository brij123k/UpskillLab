import React from 'react';
import Mentorship from './Mentorship';
import MentorshipImage from '../../assets/MentorshipImage.jpg';
import EvaluationImage from '../../assets/EvaluationImage.jpg';
import SupportImage from '../../assets/SupportImage.png';

const CardsContainer = () => {
  const cardsData = [
    {
      imageSrc: "images/hero_card1.jpeg",
      title: 'Dedicated Mentorship',
      description: 'Get dedicated mentorship on every step of learning throughout the PG programs.',
    },
    {
      imageSrc: "images/hero_card2.jpeg",
      title: 'Personalized Evaluation',
      description: 'Get personalized evaluation on every assignment and project by domain experts.',
    },
    {
      imageSrc: "images/hero_card3.png",
      title: '360° Career Support',
      description: 'Our Data Science PG Program offers 100 percent Placement Assurance.',
    },
  ];

  
  return (
    <div className='relative py-6'>
      <img src="/images/bulbLogo.png" className='absolute w-16 h-16 -rotate-25 z-100' />
      <div className="w-full py-18 md:p-15 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3   gap-16  relative ">
        {cardsData.map((card, index) => (
          <Mentorship
            key={index}
            imageSrc={card.imageSrc}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
};

export default CardsContainer;
