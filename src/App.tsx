import React from 'react';
import QuizList from './components/quiz_list';
import './index.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <QuizList />
    </div>
  );
};

export default App;
