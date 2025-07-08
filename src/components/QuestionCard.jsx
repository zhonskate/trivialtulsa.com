import { useState, useEffect } from 'react';
import './QuestionCard.css';

const QuestionCard = ({ question, category, answer, round, onNext, showNext = false, questionId = null }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(false);

  // Reset card to front when question changes (skip animation)
  useEffect(() => {
    // Immediately disable transition and force to front
    setSkipAnimation(true);
    setIsFlipped(false);
    
    // Re-enable animation after a short delay
    const timer = setTimeout(() => {
      setSkipAnimation(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [question, category, answer]);

  const getCategoryColor = (category) => {
    const colors = {
      'Geografia': '#4CAF50',
      'Esports': '#FF9800',
      'Història': '#9C27B0',
      'Entreteniment': '#E91E63',
      'Ciència': '#2196F3',
      'Art': '#795548',
      'Cine i música': '#FF5722',
      'Temes valencians': '#FFC107',
      'Art i literatura': '#8E24AA',
      'Miscelània': '#00ACC1'
    };
    return colors[category] || '#607D8B';
  };

  return (
    <div className="question-card-container">
      <div className={`question-card ${isFlipped ? 'flipped' : ''} ${skipAnimation ? 'no-transition' : ''}`}>
        <div className="card-front" style={{ borderColor: getCategoryColor(category) }}>
          <div className="badge-container">
            <div className="category-badge" style={{ backgroundColor: getCategoryColor(category) }}>
              {category}
            </div>
            {round && (
              <div className="round-badge">
                <span>{round === 'general' ? '👥' : '⭐'}</span>
                {round === 'general' ? 'General' : 'Pro'}
              </div>
            )}
          </div>
          <div className="question-text">
            {question}
          </div>
          <button 
            className="reveal-button"
            onClick={() => setIsFlipped(true)}
            style={{ backgroundColor: getCategoryColor(category) }}
          >
            Mostrar Resposta
          </button>
        </div>
        
        <div className="card-back" style={{ borderColor: getCategoryColor(category) }}>
          <div className="badge-container">
            <div className="category-badge" style={{ backgroundColor: getCategoryColor(category) }}>
              {category}
            </div>
            {round && (
              <div className="round-badge">
                <span>{round === 'general' ? '👥' : '⭐'}</span>
                {round === 'general' ? 'General' : 'Pro'}
              </div>
            )}
          </div>
          {questionId && (
            <a 
              href={`mailto:javier@cordada.io?subject=Impugnar pregunta #${questionId}`}
              className="impugnar-icon"
              title="Impugnar aquesta pregunta"
            >
              ⚠
            </a>
          )}
          <div className="answer-text">
            {answer}
          </div>
          <div className="action-buttons">
            <button 
              className="flip-back-button"
              onClick={() => setIsFlipped(false)}
            >
              Mostrar Pregunta
            </button>
            {showNext && (
              <button 
                className="next-button"
                onClick={onNext}
                style={{ backgroundColor: getCategoryColor(category) }}
              >
                Següent Pregunta
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;