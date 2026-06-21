import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Code, Calculator, Sparkles, TerminalSquare, Sun, Moon, Clock } from 'lucide-react';
import DeveloperTools from './pages/DeveloperTools';
import FinancialCalculators from './pages/FinancialCalculators';
import PromptGenerator from './pages/PromptGenerator';
import CronGenerator from './pages/CronGenerator';
import './index.css';

function App() {
  const [theme, setTheme] = React.useState('light');

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className="app-container">
        <header className="glass-panel" style={{ padding: '20px', marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)', textDecoration: 'none' }}>
            <TerminalSquare size={32} color="var(--primary)" />
            <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Smart<span className="text-gradient">WebTools</span></h1>
          </Link>
          <nav style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <Link to="/dev" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Code size={18} /> Developers</Link>
            <Link to="/cron" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Clock size={18} /> Cron</Link>
            <Link to="/finance" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Calculator size={18} /> Finance</Link>
            <Link to="/ai-prompts" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Sparkles size={18} /> AI Prompts</Link>
            <button 
              onClick={toggleTheme} 
              style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h2 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '20px' }}>All Your Tools in One Place</h2>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 40px' }}>
                  Boost your productivity with our suite of free, fast, and secure web tools designed for professionals.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                  <Link to="/dev" className="glass-panel" style={{ padding: '30px', width: '220px', textDecoration: 'none', transition: 'transform 0.3s' }}>
                    <Code size={48} color="var(--primary)" style={{ marginBottom: '15px' }} />
                    <h3 style={{ color: 'var(--text-main)', fontSize: '1.2rem' }}>Developer Tools</h3>
                  </Link>
                  <Link to="/cron" className="glass-panel" style={{ padding: '30px', width: '220px', textDecoration: 'none', transition: 'transform 0.3s' }}>
                    <Clock size={48} color="var(--accent)" style={{ marginBottom: '15px' }} />
                    <h3 style={{ color: 'var(--text-main)', fontSize: '1.2rem' }}>Cron Generator</h3>
                  </Link>
                  <Link to="/finance" className="glass-panel" style={{ padding: '30px', width: '220px', textDecoration: 'none', transition: 'transform 0.3s' }}>
                    <Calculator size={48} color="var(--success)" style={{ marginBottom: '15px' }} />
                    <h3 style={{ color: 'var(--text-main)', fontSize: '1.2rem' }}>Calculators</h3>
                  </Link>
                  <Link to="/ai-prompts" className="glass-panel" style={{ padding: '30px', width: '220px', textDecoration: 'none', transition: 'transform 0.3s' }}>
                    <Sparkles size={48} color="var(--danger)" style={{ marginBottom: '15px' }} />
                    <h3 style={{ color: 'var(--text-main)', fontSize: '1.2rem' }}>AI Prompts</h3>
                  </Link>
                </div>
              </div>
            } />
            <Route path="/dev" element={<DeveloperTools />} />
            <Route path="/cron" element={<CronGenerator />} />
            <Route path="/finance" element={<FinancialCalculators />} />
            <Route path="/ai-prompts" element={<PromptGenerator />} />
          </Routes>
        </main>

        <footer style={{ padding: '20px 0', textAlign: 'center', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', marginTop: '40px' }}>
          <p>© 2026 SmartWebTools. Built for speed and productivity.</p>
          <div style={{ marginTop: '20px', fontSize: '0.8rem', display: 'flex', justifyContent: 'center' }}>
            <span style={{ display: 'inline-block', width: '728px', height: '90px', border: '1px dashed var(--border-color)', borderRadius: '4px', lineHeight: '90px', background: 'var(--panel-bg)' }}>AdSense Banner Placeholder (728x90)</span>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
