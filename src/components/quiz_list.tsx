import React, { useEffect, useState} from "react";
import EditQuizForm from "./edit_quiz_form";
import TakeQuizModal from "./take_quiz_modal";

import generateRandomId from "../utils/generate_random_id";

const QuizList: React.FC = () => {
  const [quizes, setQuizes] = useState<any[]>([]);
  const [takingQuiz, setTakingQuiz] = useState<any | null>(null);
  const [editingQuiz, setEditingQuiz] = useState<any | null>(null);
  const [quizResults, setQuizResults] = useState<any[]>([]);

  useEffect(() => {
    const storedQuizes = JSON.parse(localStorage.getItem('quizes') || '[]');
    setQuizes(storedQuizes);
  }, []); 

  const saveQuizes = (newQuizes: any[]) => {
    setQuizes(newQuizes);
    localStorage.setItem('quizes', JSON.stringify(newQuizes));
  };

  const handleSaveQuiz = (quizToSave: any) => {
    const newQuizzes = editingQuiz.id
      ? quizes.map(quiz => (quiz.id === quizToSave.id ? quizToSave : quiz))
      : [...quizes, { ...quizToSave, id: generateRandomId() }];
    
    saveQuizes(newQuizzes);
    setEditingQuiz(null);
  };

  const handleDeleteQuiz = (quizIdToDelete: number) => {
    const updatedQuizes = quizes.filter((quiz) => quiz.id !== quizIdToDelete);
    setQuizes((prevState) => [...prevState, updatedQuizes]);
    localStorage.setItem('quizes', JSON.stringify(updatedQuizes));
  };

  const handleQuizComplete = (quiz: any, result: any) => {
    const newQuizResults = [...quizResults, { quiz, result }];
    setQuizResults(newQuizResults);
    setTakingQuiz(null);
  }

  const handleAddQuiz = () => {
    setEditingQuiz({});
  };

  const handleEditQuiz = (quiz: any) => {
    setEditingQuiz(quiz);
  };

  const handleTakeQuiz = (quiz: any) => {
    setTakingQuiz(quiz);
  };

  return (
    <div className="min-h-screen h-full p-2.5 bg-custom-gradient">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <h1>Quiz List</h1>
        <button onClick={handleAddQuiz}>Add Quiz</button>
      </nav>

      <div>
        <ul className="divide-y divide-gray-100 px-4">
          {quizes.map((quiz) => (
            <li key={quiz.id} className="flex justify-between gap-x-6 py-5">
              <p className="text-xl	font-semibold text-gray-900 text-center">{quiz.title}</p>
              {quizResults.map((quizResult) => {
                  if (quizResult.quiz.id === quiz.id) {
                    return (
                      <div key={quizResult.quiz.id} className="flex w-1/4 justify-between">
                        <p>Score: {quizResult.result.score} / {quizResult.result.totalPoints}</p>
                        <p>Time Spent: {quizResult.result.timeSpent} seconds</p>
                      </div>
                    );
                  }
                  return null;
                })}
              <div className="flex min-w-0 gap-x-4">
                <button onClick={() => handleEditQuiz(quiz)}>Edit</button>
                <button onClick={() => handleDeleteQuiz(quiz.id)}>Delete</button>
                <button onClick={() => handleTakeQuiz(quiz)}>Take Quiz</button>
              </div>
            </li>
          ))}
        </ul>

        {editingQuiz && (
          <EditQuizForm
            quiz={editingQuiz}
            onSave={handleSaveQuiz}
            onCancel={() => setEditingQuiz(null)}
          />
        )}

        {takingQuiz && (
          <TakeQuizModal quiz={takingQuiz} onComplete={(result) => handleQuizComplete(takingQuiz, result)}/>
        )}
      </div>
    </div>
  );
};

export default QuizList;