import React, { useState} from "react";

const testQuiz = [
  {
    id: 1,
    questions: [{text: 'Question 1', answers:['Asn1', 'Ans2', 'Ans3', 'Ans4'], correctAnswer: 0, points: 1}],
    title: 'Quiz 1',
  },
  {
    id: 2,
    questions: [{text: 'Question 2', answers:['Asn1', 'Ans2', 'Ans3', 'Ans4'], correctAnswer: 1, points: 2}],
    title: 'Quiz 2',
  },
  {
    id: 3,
    questions: [{text: 'Question 3', answers:['Asn1', 'Ans2', 'Ans3', 'Ans4'], correctAnswer: 2, points: 3}],
    title: 'Quiz 3',
  },
  {
    id: 4,
    questions: [{text: 'Question 4', answers:['Asn1', 'Ans2', 'Ans3', 'Ans4'], correctAnswer: 3, points: 4}],
    title: 'Quiz 4',
  },
  {
    id: 5,
    questions: [{text: 'Question 5', answers:['Asn1', 'Ans2', 'Ans3', 'Ans4'], correctAnswer: 0, points: 5}],
    title: 'Quiz 5',
  },
]
const QuizList: React.FC = () => {
  const [quizes, setQuizes] = useState<any[]>(testQuiz);
  const [takingQuiz, setTakingQuiz] = useState<any | null>(null);

  const handleDeleteQuiz = (quizIdToDelete: number) => {
    setQuizes((prevState) => prevState.filter((quiz) => quiz.id !== quizIdToDelete));
  }

  const handleTakeQuiz = (quiz: any) => {
    setTakingQuiz(quiz);
  }

  return (
    <>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <h1>Quiz List</h1>
        <button>Add Quiz</button>
      </nav>

      <div>
        <ul className="divide-y divide-gray-100 px-4">
          {quizes.map((quiz) => (
            <li key={quiz.id} className="flex justify-between gap-x-6 py-5">
              <p className="text-xl	font-semibold text-gray-900 text-center">{quiz.title}</p>
              <div className="flex min-w-0 gap-x-4">
                <button>Edit</button>
                <button onClick={() => {handleDeleteQuiz(quiz.id)}}>Delete</button>
                <button onClick={() => handleTakeQuiz(quiz)}>Take Quiz</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default QuizList;
