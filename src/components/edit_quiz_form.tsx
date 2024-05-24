import React, { useEffect, useState } from 'react';
import QuizQuestionForm from './quiz_question_form';

const QuizForm: React.FC<{ quiz: any, onSave: (quiz: any) => void, onCancel: () => void }> = ({ quiz, onSave, onCancel }) => {
  const [title, setTitle] = useState(quiz.title || '');
  const [questions, setQuestions] = useState(quiz.question || []);
  const [onShowQuestionForm, setOnShowQuestionForm] = useState(false);

  useEffect(() => {
    setTitle(quiz.title || '');
    setQuestions(quiz.questions || []);
  }, [quiz]);

  const handleQuestionChange = (index: number, updatedQuestion: any) => {
    const newQuestions = questions.map((questions: any[], id: number) => (id === index ? updatedQuestion : questions));
    setQuestions(newQuestions);
  };

  const handleQuestionDelete = (index: number) => {
    setQuestions((prevState: string[]) => prevState.filter((_: any, num: number) => num !== index));
  };

  const handleSave = () => {
    onSave({...quiz, title, questions});
  };
  
  const handleAddQuestion = () => {
    setQuestions([...questions, {text: '', correctAnswer: null}]);
    setOnShowQuestionForm(true);
  };

  return (
    <div>
      <h1>{quiz.id ? 'Edit Quiz' : 'Add Quiz'}</h1>
      <div>
        <label>
          Title
          <input className='ml-1.5' type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </label>
      </div>
      <div>
        {onShowQuestionForm && questions.map((question: any, index: number) => (
          <QuizQuestionForm
            key={index}
            question={question}
            onChange={(updatedQuestion) => handleQuestionChange(index, updatedQuestion)}
            onDelete={() => handleQuestionDelete(index)}
            onSaveQuestion={() => setOnShowQuestionForm(!onShowQuestionForm)}
          />
        ))}
        <button className='mb-1' onClick={handleAddQuestion}>Add Question</button>
      </div>
      <button className='mr-1' onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default QuizForm;
