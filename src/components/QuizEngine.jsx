import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useUserProgress } from '../context/UserProgress';
import { StarIcon, LightBulbIcon } from './Icons';

const QuizEngine = ({ quizData, onComplete, onRewardUnlocked }) => {
  const { logMistake } = useUserProgress();
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const question = quizData.questions[currentQIndex];

  if (!quizData || !quizData.questions || quizData.questions.length === 0) {
    return <div className="text-center text-red-500">錯誤：測驗資料不完整</div>;
  }

  const handleOptionClick = (optionId) => {
    setSelectedOption(optionId);
    if (optionId === question.correctOptionId) {
      setShowSuccess(true);
      setTimeout(() => handleNextQuestion(), 2000);
    } else {
      logMistake(question.questionId);
      setShowExplanation(true);
    }
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    setShowSuccess(false);
    setSelectedOption(null);
    if (currentQIndex < quizData.questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      onRewardUnlocked();
      onComplete();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800">第 {currentQIndex + 1} / {quizData.questions.length} 題</h3>
        <div className="text-sm text-gray-500">進度: {Math.round((currentQIndex + 1) / quizData.questions.length * 100)}%</div>
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-4">{question.questionText}</h3>
      {question.image && <img src={question.image} alt="quiz" className="w-64 mx-auto mb-4" />}

      <div className="grid gap-4 mt-6">
        {question.options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleOptionClick(opt.id)}
            disabled={(showExplanation || showSuccess) && selectedOption !== opt.id}
            className={`p-4 text-lg border-2 rounded-xl transition-all ${
              selectedOption === opt.id
                ? opt.id === question.correctOptionId
                  ? 'bg-green-100 border-green-500 scale-105'
                  : 'bg-red-100 border-red-500'
                : 'bg-gray-50 hover:border-blue-400'
            }`}
          >
            {opt.text}
          </button>
        ))}
      </div>

      {showSuccess && selectedOption === question.correctOptionId && (
        <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg animate-bounce flex items-center gap-2">
          <StarIcon className="w-6 h-6" color="#16a34a" />
          <div>
            <p className="text-green-700 font-bold text-lg">恭喜！答對了！</p>
            <p className="text-green-600 text-sm mt-2">下一題...</p>
          </div>
          <StarIcon className="w-6 h-6" color="#16a34a" />
        </div>
      )}

      {showExplanation && selectedOption !== question.correctOptionId && (
        <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
          <p className="text-yellow-800 font-medium mb-2 flex items-center gap-2">
            <span className="text-2xl">🦉</span>
            {question.errorExplanation[selectedOption]}
          </p>
          <p className="text-gray-600 text-sm italic flex items-center gap-2">
            <LightBulbIcon className="w-4 h-4" color="#b45900" />
            {question.errorExplanation.generalTip}
          </p>
          <button onClick={() => setShowExplanation(false)} className="mt-3 px-4 py-2 bg-yellow-200 rounded-lg hover:bg-yellow-300">再試一次！</button>
        </div>
      )}
    </div>
  );
};

QuizEngine.propTypes = {
  quizData: PropTypes.shape({
    questions: PropTypes.arrayOf(PropTypes.shape({
      questionId: PropTypes.string.isRequired,
      questionText: PropTypes.string.isRequired,
      image: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
      })).isRequired,
      correctOptionId: PropTypes.string.isRequired,
      errorExplanation: PropTypes.object.isRequired
    })).isRequired
  }).isRequired,
  onComplete: PropTypes.func.isRequired,
  onRewardUnlocked: PropTypes.func
};

export default QuizEngine;