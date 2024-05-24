import React from 'react';

const QuizResult: React.FC<{ quiz: any, answers: number[], quizTime: number, score: number, totalPoints: number, onComplete: () => void }> = ({ quiz, answers, quizTime, score, totalPoints, onComplete }) => {

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-75">
      <div className="bg-white p-4 rounded shadow-lg w-1/4 h-1/4 flex flex-col items-center justify-between">
        <h2 className="text-xl font-semibold mb-2">Result</h2>
        <p>Time spent: {formatTime(quizTime)} seconds</p>
        <p>Your Score: {score} / {totalPoints}</p>
        <button onClick={onComplete}>Back to Quiz List</button>
      </div>
    </div>
  )
}

export default QuizResult;
