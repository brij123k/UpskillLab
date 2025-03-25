import React from 'react';
import Mentorship from './Mentorship';
import MentorshipImage from '../../assets/MentorshipImage.jpg';
import EvaluationImage from '../../assets/EvaluationImage.jpg';
import SupportImage from '../../assets/SupportImage.png';

const CardsContainer = () => {
  const cardsData = [
    {
      imageSrc: MentorshipImage,
      title: 'Dedicated Mentorship',
      description: 'Get dedicated mentorship on every step of learning throughout the PG programs.',
    },
    {
      imageSrc: EvaluationImage,
      title: 'Personalized Evaluation',
      description: 'Get personalized evaluation on every assignment and project by domain experts.',
    },
    {
      imageSrc: SupportImage,
      title: '360° Career Support',
      description: 'Our Data Science PG Program offers 100 percent Placement Assurance.',
    },
  ];

  return (
    <div className="w-full max-w-[1530px] h-auto py-10 px-5 md:px-10 lg:px-20 mx-auto flex flex-col md:flex-row justify-between gap-8 md:gap-4">
      {cardsData.map((card, index) => (
        <Mentorship 
          key={index}
          imageSrc={card.imageSrc} 
          title={card.title} 
          description={card.description} 
        />
      ))}
    </div>
  );
};

export default CardsContainer;
