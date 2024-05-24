import React, { useState } from 'react';

const QuizQuestionForm: React.FC<{ question: any, onChange: (question: any) => void, onDelete: () => void, onSaveQuestion: any }> = ({ question, onChange, onDelete, onSaveQuestion }) => {
  const [text, setText] = useState(question.text || '');
  const [answers, setAnswers] = useState(question.answers || []);
  const [correctAnswer, setCorrectAnswer] = useState(question.correctAnswer || null);
  const [points, setPoints] = useState(question.points || 1);

  const handleAnswerChange = (index: number, newValue: string) => {
    const newAnswers = answers.map((answer: any, id: number) => (id === index ? newValue : answer));
    setAnswers(newAnswers);
  };

  const handleAddAnswer = () => {
    setAnswers([...answers, '']);
  }

  const handleSave = () => {
    onSaveQuestion()
    onChange({...question, text, answers, correctAnswer, points});
  };

  return (
    <div>
      <div>
        <label>
          Question
          <input className='ml-1.5' type="text" value={text} onChange={e => setText(e.target.value)} />
        </label>
      </div>
      <div>
        {answers.map((answer: string, index: number) => (
          <div key={index}>
            <input
              type="text"
              value={answer}
              onChange={e => handleAnswerChange(index, e.target.value)}
            />
            <label>
              <input
                type="radio"
                checked={correctAnswer === index}
                onChange={() => setCorrectAnswer(index)}
              />
              Correct
            </label>
          </div>
        ))}
        <button onClick={handleAddAnswer}>Add Answer</button>
      </div>
      <div>
        <label>
          Points
          <input type="number" value={points} onChange={e => setPoints(Number(e.target.value) || '')} />
        </label>
      </div>
      <button className='mr-1.5 mb-1.5' onClick={handleSave}>Save Question</button>
      <button onClick={onDelete}>Delete Question</button>
    </div>
  )
}

export default QuizQuestionForm;