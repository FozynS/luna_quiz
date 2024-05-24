import React, { useState, useEffect } from 'react';
import QuizResult from './quiz_result';

const TakeQuizModal: React.FC<{ quiz: any, onComplete: (result: any) => void }> = ({ quiz, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [quizTime, setQuizTime] = useState(0);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [answers, setAnswers] = useState<number[]>(new Array(quiz.questions.length).fill(-1));

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeSpent(prevTime => prevTime + 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < quiz.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswerIndex(null);
    }
  };

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswerIndex(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswerIndex !== null) {
      const updatedAnswers = [...answers];
      updatedAnswers[currentQuestionIndex] = selectedAnswerIndex;
      setAnswers(updatedAnswers);
      handleNextQuestion();
      
      if (currentQuestionIndex === quiz.questions.length - 1) {
        setShowQuizResult(true);
        setQuizTime(timeSpent);
      }
    }
  };

  const handleCompleteQuiz = () => {
    onComplete({ score: calculateUserScore(), totalPoints: calculateTotalPoints(), timeSpent });
  };

  const calculateUserScore = (): number => {
    return answers.reduce((score, answer, index) => {
      return score + (quiz.questions[index].correctAnswer === answer ? quiz.questions[index].points : 0);
    }, 0);
  };

  const calculateTotalPoints = (): number => {
    return quiz.questions.reduce((sum: number, question: any) => sum + question.points, 0);
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <>
      {!showQuizResult ? 
        <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded shadow-lg w-1/2 flex flex-col">
            <h2 className="text-xl font-semibold mb-2 text-center">{quiz.title}</h2>
            {currentQuestion && (
              <div className="mb-4">
                <h3 className="font-medium mb-2">{currentQuestion.text}</h3>
                <ul>
                  {currentQuestion.answers.map((answer: string, index: number) => (
                    <li key={index} className="mb-2">
                      <label> 
                        {answer}
                        <input
                          className="ml-2"
                          type="radio"
                          checked={selectedAnswerIndex === index}
                          onChange={() => handleAnswerSelect(index)}
                        />
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className='flex items-end justify-between'> 
              <div>
                {currentQuestionIndex === quiz.questions.length - 1 ? (
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2" onClick={handleSubmitAnswer}>Submit</button>
                ) : (
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2" onClick={handleSubmitAnswer}>Next</button>
                )}
                <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600" onClick={onComplete}>Close</button>
              </div>
              <p className="text-sm text-gray-500 m-0">Time spent: {formatTime(timeSpent)}</p>
            </div>
          </div>
        </div>
        : <QuizResult quiz={quiz} answers={answers} quizTime={quizTime} score={calculateUserScore()} totalPoints={calculateTotalPoints()} onComplete={handleCompleteQuiz} />
      }
    </>
  );
};

export default TakeQuizModal;
