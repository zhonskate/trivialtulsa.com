import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import questionsData from '../data/questions.json';
import './RandomQuestion.css';

const RandomQuestion = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questionsData.length);
    const randomQuestion = questionsData[randomIndex];
    setCurrentQuestion(randomQuestion);
    setLoading(false);
  };

  useEffect(() => {
    getRandomQuestion();
  }, []);

  const handleNextQuestion = () => {
    setLoading(true);
    setTimeout(() => {
      getRandomQuestion();
    }, 300);
  };

  const handleViewQuestion = () => {
    if (currentQuestion) {
      navigate(`/questions/${currentQuestion.id}`);
    }
  };

  if (loading) {
    return (
      <div className="random-question-page">
        <div className="loading">Loading random question...</div>
      </div>
    );
  }

  return (
    <div className="random-question-page">
      <div className="random-container">
        <div className="random-header">
          <Link to="/" className="back-link">← Back to Home</Link>
          <div className="random-meta">
            <span className="random-title">Random Question</span>
            <span className="question-date">
              {new Date(currentQuestion.date).toLocaleDateString()}
            </span>
          </div>
        </div>

        <QuestionCard
          question={currentQuestion.question}
          category={currentQuestion.category}
          answer={currentQuestion.answer}
          onNext={handleNextQuestion}
          showNext={true}
        />

        <div className="random-actions">
          <button onClick={handleViewQuestion} className="permalink-button">
            View Permalink
          </button>
          <button onClick={handleNextQuestion} className="another-button">
            Another Random
          </button>
        </div>
      </div>
    </div>
  );
};

export default RandomQuestion;