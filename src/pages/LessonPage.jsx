import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TeachingBoard from '../components/TeachingBoard';
import ImagePractice from '../components/ImagePractice';
import QuizEngine from '../components/QuizEngine';
import { useUserProgress } from '../context/UserProgress';
import curriculumData from '../data/curriculum.json';
import { ArrowLeftIcon, CelebrationIcon } from '../components/Icons';

const LessonPage = ({ currentModuleId, onBackToMap }) => {
  const { completeModule, unlockCard } = useUserProgress();
  const [moduleData, setModuleData] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [phase, setPhase] = useState('lessons');

  useEffect(() => {
    let found = null;
    for (const grade of curriculumData) {
      found = grade.modules.find(m => m.moduleId === currentModuleId);
      if (found) break;
    }
    setModuleData(found);
  }, [currentModuleId]);

  if (!moduleData) return <div>載入中...</div>;

  const handleNextStep = () => {
    if (phase === 'lessons') {
      if (currentStepIndex < moduleData.lessons.length - 1) setCurrentStepIndex(prev => prev + 1);
      else setPhase('quiz');
    } else if (phase === 'quiz') {
      completeModule(moduleData.moduleId);
      unlockCard(moduleData.rewardCard.cardId);
      setPhase('victory');
    }
  };

  const renderContent = () => {
    if (phase === 'lessons') {
      if (!moduleData.lessons || currentStepIndex >= moduleData.lessons.length) {
        return <div className="text-center text-red-500">錯誤：找不到課程</div>;
      }
      const lesson = moduleData.lessons[currentStepIndex];
      if (!lesson) {
        return <div className="text-center text-red-500">錯誤：課程資料不完整</div>;
      }
      switch (lesson.type) {
        case 'teaching':
          return <TeachingBoard lessonData={lesson} onComplete={handleNextStep} />;
        case 'image_practice':
          return <ImagePractice lessonData={lesson} onComplete={handleNextStep} />;
        default:
          return <div className="text-center text-red-500">錯誤：未知的課程類型 "{lesson.type}"</div>;
      }
    }
    if (phase === 'quiz') {
      if (!moduleData.quiz) {
        return <div className="text-center text-red-500">錯誤：找不到測驗資料</div>;
      }
      return <QuizEngine quizData={moduleData.quiz} onComplete={handleNextStep} onRewardUnlocked={() => {}} />;
    }
    if (phase === 'victory') return (
      <div className="text-center mt-20">
        <div className="flex items-center justify-center gap-4 mb-6">
          <CelebrationIcon className="w-16 h-16 text-yellow-500" />
          <h1 className="text-5xl text-yellow-500">挑戰成功！</h1>
          <CelebrationIcon className="w-16 h-16 text-yellow-500" />
        </div>
        <button onClick={onBackToMap} className="px-8 py-4 bg-blue-500 text-white rounded-full hover:bg-blue-600">回到學習地圖</button>
      </div>
    );
    return <div className="text-center text-red-500">錯誤：未知的階段 "{phase}"</div>;
  };

  return (
    <div className="min-h-screen bg-[#f0f9ff] p-6">
      <button onClick={onBackToMap} className="mb-8 text-blue-600 font-bold flex items-center gap-2 hover:text-blue-800">
        <ArrowLeftIcon className="w-5 h-5" />
        放棄挑戰
      </button>
      {renderContent()}
    </div>
  );
};

LessonPage.propTypes = {
  currentModuleId: PropTypes.string.isRequired,
  onBackToMap: PropTypes.func.isRequired
};

export default LessonPage;