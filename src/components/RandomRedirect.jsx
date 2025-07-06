import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import questionsData from '../data/questions.json';

const RandomRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * questionsData.length);
    const randomQuestion = questionsData[randomIndex];
    navigate(`/preguntes/${randomQuestion.id}`, { replace: true });
  }, [navigate]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontSize: '1.2rem'
    }}>
      Carregant pregunta aleatòria...
    </div>
  );
};

export default RandomRedirect;