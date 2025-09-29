import { useState } from 'react';
import StartPage from './components/StartPage';
import QuizView from './components/QuizView';
import ResultsPage from './components/ResultsPage';
import AdminDashboard from './components/AdminDashboard'; // Import AdminDashboard
import './App.css';

function App() {
  const [view, setView] = useState('start'); // 'start', 'quiz', 'results', 'admin'
  const [quizData, setQuizData] = useState(null);
  const [results, setResults] = useState(null);

  const handleStartQuiz = (fetchedQuizData) => {
    setQuizData(fetchedQuizData);
    setView('quiz');
  };

  const handleFinishQuiz = (finalResults) => {
    setResults(finalResults);
    setView('results');
  };

  const renderView = () => {
    switch (view) {
      case 'quiz':
        return <QuizView quizData={quizData} onFinish={handleFinishQuiz} />;
      case 'results':
        return <ResultsPage results={results} questions={quizData.questions} />;
      case 'admin':
        return <AdminDashboard />;
      case 'start':
      default:
        return <StartPage onStart={handleStartQuiz} />;
    }
  };

  return (
    <div className="app-container">
      <nav className="main-nav">
        <h1>Quizers</h1>
        <div>
            <button className="btn btn-primary" onClick={() => setView('start')}>Join Quiz</button>
            <button className="btn btn-primary" onClick={() => setView('admin')}>Admin Panel</button>
        </div>
      </nav>
      <main>
        {renderView()}
      </main>
    </div>
  );
}

export default App;
