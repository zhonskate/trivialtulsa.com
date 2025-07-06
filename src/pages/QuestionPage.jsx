import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import QuestionCard from '../components/QuestionCard';
import questionsData from '../data/questions.json';
import './QuestionPage.css';

const QuestionPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const questionId = parseInt(id);
    const foundQuestion = questionsData.find(q => q.id === questionId);
    setQuestion(foundQuestion);
    setLoading(false);
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Trivial Tulsa Question',
        text: `Check out this trivia question: ${question.question}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="question-page">
        <div className="loading">Loading question...</div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="question-page">
        <div className="error-container">
          <h2>Question not found</h2>
          <p>The question you're looking for doesn't exist.</p>
          <Link to="/" className="back-button">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="question-page">
      <div className="question-container">
        <div className="question-header">
          <Link to="/" className="back-link">← Back to Home</Link>
          <div className="question-meta">
            <span className="question-number">Question #{question.id}</span>
            <span className="question-date">{new Date(question.date).toLocaleDateString()}</span>
          </div>
        </div>

        <QuestionCard
          question={question.question}
          category={question.category}
          answer={question.answer}
        />

        <div className="question-actions">
          <button onClick={handleShare} className="share-button">
            Share Question
          </button>
          <Link to="/random" className="random-button">
            Random Question
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;