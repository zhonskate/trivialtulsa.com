import { Link } from 'react-router-dom';
import { useState } from 'react';
import './LandingPage.css';

const LandingPage = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <div className="landing-page">
      <div className="landing-container">
        <header className="landing-header">
          <h1 className="site-title">Trivial del Tulsa</h1>
          <p className="site-subtitle"> Benvinguts al arxiu interactiu del Trivial del Tulsa.</p>
          <p className="site-subtitle"> Aquest es un històric de les preguntes fetes setmanalment al trivial des de Febrer de 2023.</p>
        </header>

        <main className="landing-main">
          <div className="action-section">
            <Link to="/aleatoria" className="cta-button primary">
              Pregunta Aleatòria
            </Link>
            <Link to="/explorar" className="cta-button secondary">
              Totes les preguntes
            </Link>
          </div>

          <div className="info-grid">
            <div className="info-card">
              <h3>🍻 El Local</h3>
              <div className="alert-banner">
                ⏸️ El trivial torna al setembre!
              </div>
              <p>El trivial té lloc cada dimarts a les 20h al <a href="https://www.facebook.com/tulsacafe">Tulsa Café</a>, un acollidor local a Benimaclet perfecte per a compartir cervesa i coneiximents.</p>
            </div>
            <div className="info-card">
              <h3>👨‍💼 L'Organitzador</h3>
              <p>Héctor es la ment darrere de totes les preguntes <span className="gratitude-text">(Moltes gràcies per compartir-les en tots nosaltres!)</span>.</p>
              <p> També té una llibreria molt guai, la podeu vore a <a href="https://www.instagram.com/arribada_llibres/">@arribada_llibres</a>.</p>
            </div>
            <div className="info-card">
              <h3>🏆 La Competició</h3>
              <p>Equips de fins a 8 persones competeixen en 4 rondes de preguntes variades.</p>
              <div className={`accordion ${isAccordionOpen ? 'active' : ''}`}>
                <button className="accordion-toggle" onClick={toggleAccordion}>
                  <span>Veure format detallat</span>
                  <span className="accordion-icon">▼</span>
                </button>
                <div className="accordion-content">
                  <ul>
                    <li><strong>Ronda Actualitat:</strong> 10 preguntes de actualitat - 1 punt per pregunta</li>
                    <li><strong>Ronda Cultura General:</strong> 10 preguntes de cultura general - 2 punt per pregunta</li>
                    <li><strong>Ronda Pro:</strong> 10 preguntes de cultura general més difícils - 3 punts per pregunta</li>
                    <li><strong>Ronda Audiovisual:</strong> 4 pelis i 4 cançons - 2 punts per pregunta</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="landing-footer">
          <div className="footer-content">
            <div className="footer-section">
              <h4>📍 Ubicació</h4>
              <p>
                <strong><a href="https://www.instagram.com/tulsacoffee/">Tulsa Café</a></strong><br/>
                Carrer de Juan Giner, 11<br/>
                46020 València<br/>
                Cada dimarts a les 20:00h
              </p>
            </div>
            <div className="footer-section">
              <h4>📧 Contacte</h4>
              <p>
                Tens idees per a la web?<br/>
                Alguna suggerència?<br/>
                Contacta amb <a href="https://javi.dev">Javier</a>:<br/>
                <a href="mailto:javier@cordada.io">javier@cordada.io</a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;