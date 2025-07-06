import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import QuestionPage from './pages/QuestionPage';
import RandomQuestion from './pages/RandomQuestion';
import BrowseQuestions from './pages/BrowseQuestions';
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/questions/:id" element={<QuestionPage />} />
          <Route path="/random" element={<RandomQuestion />} />
          <Route path="/browse" element={<BrowseQuestions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
