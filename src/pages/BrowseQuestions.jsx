import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import questionsData from '../data/questions.json';
import './BrowseQuestions.css';

const BrowseQuestions = () => {
  const [questions, setQuestions] = useState(questionsData);
  const [filteredQuestions, setFilteredQuestions] = useState(questionsData);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDate, setSelectedDate] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [revealedAnswers, setRevealedAnswers] = useState(new Set());

  const categories = ['All', ...new Set(questionsData.map(q => q.category))];
  const dates = ['All', ...new Set(questionsData.map(q => q.date))].sort().reverse();

  useEffect(() => {
    let filtered = questions;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(q => q.category === selectedCategory);
    }

    if (selectedDate !== 'All') {
      filtered = filtered.filter(q => q.date === selectedDate);
    }

    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredQuestions(filtered);
  }, [selectedCategory, selectedDate, searchQuery, questions]);

  const getCategoryColor = (category) => {
    const colors = {
      'Geografia': '#4CAF50',
      'Esports': '#FF9800',
      'Història': '#9C27B0',
      'Entreteniment': '#E91E63',
      'Ciència': '#2196F3',
      'Art': '#795548'
    };
    return colors[category] || '#607D8B';
  };

  const toggleAnswerReveal = (questionId) => {
    setRevealedAnswers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  return (
    <div className="browse-questions-page">
      <div className="browse-container">
        <div className="browse-header">
          <Link to="/" className="back-link">← Tornar a l'Inici</Link>
          <h1>Explorar Preguntes</h1>
        </div>

        <div className="filter-section">
          <div className="search-group">
            <label>Cercar:</label>
            <input
              type="text"
              placeholder="Cercar preguntes i respostes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Categoria:</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'All' ? 'Totes' : category}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Data:</label>
            <select 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              {dates.map(date => (
                <option key={date} value={date}>
                  {date === 'All' ? 'Totes les Dates' : new Date(date).toLocaleDateString()}
                </option>
              ))}
            </select>
          </div>

          <div className="results-count">
            {filteredQuestions.length} pregunt{filteredQuestions.length !== 1 ? 'es' : 'a'}
          </div>
        </div>

        <div className="questions-grid">
          {filteredQuestions.map(question => (
            <div key={question.id} className="question-preview">
              <div className="preview-header">
                <span 
                  className="category-tag"
                  style={{ backgroundColor: getCategoryColor(question.category) }}
                >
                  {question.category}
                </span>
                <span className="question-date">
                  {new Date(question.date).toLocaleDateString()}
                </span>
              </div>
              
              <div className="preview-content">
                <h3 className="preview-question">{question.question}</h3>
                <div className="answer-container">
                  <div 
                    className={`preview-answer ${revealedAnswers.has(question.id) ? 'revealed' : 'spoiler'}`}
                    onClick={() => toggleAnswerReveal(question.id)}
                  >
                    {revealedAnswers.has(question.id) ? question.answer : 'Fes clic per mostrar la resposta'}
                  </div>
                </div>
              </div>

              <div className="preview-actions">
                <Link 
                  to={`/preguntes/${question.id}`}
                  className="view-button"
                  style={{ backgroundColor: getCategoryColor(question.category) }}
                >
                  Veure Pregunta
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="no-results">
            <h3>No s'han trobat preguntes</h3>
            <p>Prova d'ajustar els filtres per veure més preguntes.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseQuestions;