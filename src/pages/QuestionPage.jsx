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
          title: 'Pregunta del Trivial del Tulsa',
          text: `Mira aquesta pregunta de trivial: ${question.question}`,
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
    
    navigate(`/preguntes/${randomQuestion.id}`);
  };

  const handleNextQuestion = () => {
    const currentQuestionId = parseInt(id);
    const currentIndex = questionsData.findIndex(q => q.id === currentQuestionId);
    
    if (currentIndex !== -1) {
      // Go to next question, or loop back to first if at end
      const nextIndex = (currentIndex + 1) % questionsData.length;
      const nextQuestion = questionsData[nextIndex];
      navigate(`/preguntes/${nextQuestion.id}`);
    }
  };

  const handlePreviousQuestion = () => {
    const currentQuestionId = parseInt(id);
    const currentIndex = questionsData.findIndex(q => q.id === currentQuestionId);
    
    if (currentIndex !== -1) {
      // Go to previous question, or loop to last if at beginning
      const prevIndex = currentIndex === 0 ? questionsData.length - 1 : currentIndex - 1;
      const prevQuestion = questionsData[prevIndex];
      navigate(`/preguntes/${prevQuestion.id}`);
    }
  };

  if (loading) {
    return (
      <div className="question-page">
        <div className="loading">Carregant pregunta...</div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="question-page">
        <div className="error-container">
          <h2>Pregunta no trobada</h2>
          <p>La pregunta que cerques no existeix.</p>
          <Link to="/" className="back-button">Anar a l'Inici</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="question-page">
      <div className="question-container">
        <div className="question-header">
          <Link to="/" className="back-link">← Tornar a l'Inici</Link>
          <div className="question-meta">
            <span className="question-number">Pregunta #{question.id}</span>
            <span className="question-date">{new Date(question.date).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="question-with-navigation">
          <button 
            className="nav-chevron nav-chevron-left"
            onClick={handlePreviousQuestion}
            title="Pregunta anterior"
          >
            ‹
          </button>
          
          <QuestionCard
            question={question.question}
            category={question.category}
            answer={question.answer}
            questionId={question.id}
          />
          
          <button 
            className="nav-chevron nav-chevron-right"
            onClick={handleNextQuestion}
            title="Següent pregunta"
          >
            ›
          </button>
        </div>

        <div className="question-actions">
          <button onClick={handleShare} className={`share-button ${showCopied ? 'copied' : ''}`}>
            {showCopied ? 'Enllaç Copiat!' : 'Compartir Pregunta'}
          </button>
          <button onClick={handleRandomQuestion} className="random-button">
            Pregunta Aleatòria
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;