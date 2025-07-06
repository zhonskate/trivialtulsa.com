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
    <div className="browse-questions-page">
      <div className="browse-container">
        <div className="browse-header">
          <Link to="/" className="back-link">← Back to Home</Link>
          <h1>Browse Questions</h1>
        </div>

        <div className="filter-section">
          <div className="search-group">
            <label>Search:</label>
            <input
              type="text"
              placeholder="Search questions and answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Category:</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Date:</label>
            <select 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              {dates.map(date => (
                <option key={date} value={date}>
                  {date === 'All' ? 'All Dates' : new Date(date).toLocaleDateString()}
                </option>
              ))}
            </select>
          </div>

          <div className="results-count">
            {filteredQuestions.length} question{filteredQuestions.length !== 1 ? 's' : ''}
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
                <p className="preview-answer">{question.answer}</p>
              </div>

              <div className="preview-actions">
                <Link 
                  to={`/questions/${question.id}`}
                  className="view-button"
                  style={{ backgroundColor: getCategoryColor(question.category) }}
                >
                  View Question
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="no-results">
            <h3>No questions found</h3>
            <p>Try adjusting your filters to see more questions.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseQuestions;