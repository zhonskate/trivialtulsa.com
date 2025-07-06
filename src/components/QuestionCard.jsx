import { useState } from 'react';
import './QuestionCard.css';

const QuestionCard = ({ question, category, answer, onNext, showNext = false }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const getCategoryColor = (category) => {
    const colors = {
      'Geography': '#4CAF50',
      'Sports': '#FF9800',
      'History': '#9C27B0',
      'Entertainment': '#E91E63',
      'Science': '#2196F3',
      'Art': '#795548'
    };
    return colors[category] || '#607D8B';
  };

  return (
    <div className="question-card-container">
      <div className={`question-card ${isFlipped ? 'flipped' : ''}`}>
        <div className="card-front" style={{ borderColor: getCategoryColor(category) }}>
          <div className="category-badge" style={{ backgroundColor: getCategoryColor(category) }}>
            {category}
          </div>
          <div className="question-text">
            {question}
          </div>
          <button 
            className="reveal-button"
            onClick={() => setIsFlipped(true)}
            style={{ backgroundColor: getCategoryColor(category) }}
          >
            Reveal Answer
          </button>
        </div>
        
        <div className="card-back" style={{ borderColor: getCategoryColor(category) }}>
          <div className="category-badge" style={{ backgroundColor: getCategoryColor(category) }}>
            {category}
          </div>
          <div className="answer-text">
            {answer}
          </div>
          <div className="action-buttons">
            <button 
              className="flip-back-button"
              onClick={() => setIsFlipped(false)}
            >
              Show Question
            </button>
            {showNext && (
              <button 
                className="next-button"
                onClick={onNext}
                style={{ backgroundColor: getCategoryColor(category) }}
              >
                Next Question
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;