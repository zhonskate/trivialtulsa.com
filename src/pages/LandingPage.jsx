import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-container">
        <header className="landing-header">
          <h1 className="site-title">Trivial Tulsa</h1>
          <p className="site-subtitle">Test your knowledge with weekly trivia questions</p>
        </header>

        <main className="landing-main">
          <div className="hero-section">
            <h2>Welcome to Trivial Tulsa</h2>
            <p>
              Join us every week for challenging trivia questions covering geography, sports, 
              history, entertainment, science, and more. Test your knowledge and compete with 
              friends in our pub quiz format.
            </p>
          </div>

          <div className="action-section">
            <Link to="/random" className="cta-button primary">
              Start Random Question
            </Link>
            <Link to="/browse" className="cta-button secondary">
              Browse All Questions
            </Link>
          </div>

          <div className="info-grid">
            <div className="info-card">
              <h3>Weekly Trivia</h3>
              <p>New questions added every week featuring local and general knowledge.</p>
            </div>
            <div className="info-card">
              <h3>Multiple Categories</h3>
              <p>Questions span across geography, sports, history, entertainment, science, and arts.</p>
            </div>
            <div className="info-card">
              <h3>Pub Quiz Format</h3>
              <p>Experience the classic pub quiz atmosphere with our card-based question format.</p>
            </div>
          </div>
        </main>

        <footer className="landing-footer">
          <div className="footer-content">
            <div className="footer-section">
              <h4>About the Quiz</h4>
              <p>
                Trivial Tulsa is organized by a local trivia enthusiast who brings together 
                the community for weekly brain teasers and friendly competition.
              </p>
            </div>
            <div className="footer-section">
              <h4>Join Us</h4>
              <p>
                Visit us at our regular venue for the full trivia experience. Check back 
                weekly for new questions and challenges.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;