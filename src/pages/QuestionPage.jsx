import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import QuestionCard from '../components/QuestionCard';
import questionsData from '../data/questions.json';
import './QuestionPage.css';

const QuestionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCopied, setShowCopied] = useState(false);

  useEffect(() => {
    const questionId = parseInt(id);
    const foundQuestion = questionsData.find(q => q.id === questionId);
    setQuestion(foundQuestion);
    setLoading(false);
  }, [id]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Trivial Tulsa Question',
          text: `Check out this trivia question: ${question.question}`,
          url: window.location.href
        });
      } catch (err) {
        // User cancelled or error occurred, fall back to copy
        await copyToClipboard();
      }
    } else {
      await copyToClipboard();
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  const handleRandomQuestion = () => {
    const currentQuestionId = parseInt(id);
    let randomQuestion;
    
    // Make sure we don't get the same question
    do {
      const randomIndex = Math.floor(Math.random() * questionsData.length);
      randomQuestion = questionsData[randomIndex];
    } while (randomQuestion.id === currentQuestionId && questionsData.length > 1);
    
    navigate(`/questions/${randomQuestion.id}`);
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
          <button onClick={handleShare} className={`share-button ${showCopied ? 'copied' : ''}`}>
            {showCopied ? 'Link Copied!' : 'Share Question'}
          </button>
          <button onClick={handleRandomQuestion} className="random-button">
            Random Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;