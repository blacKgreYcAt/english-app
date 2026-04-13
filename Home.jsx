import React from 'react';
import PropTypes from 'prop-types';
import { useUserProgress } from '../context/UserProgress';
import curriculumData from '../data/curriculum.json'; 

const Home = ({ onSelectModule }) => {
  const { completedModules } = useUserProgress();

  const checkIsUnlocked = (gIndex, mIndex) => {
    if (gIndex === 0 && mIndex === 0) return true;
    if (mIndex > 0) return completedModules.includes(curriculumData[gIndex].modules[mIndex - 1].moduleId);
    return completedModules.includes(curriculumData[gIndex - 1].modules[curriculumData[gIndex - 1].modules.length - 1].moduleId);
  };

  return (
    <div className="min-h-screen bg-[#e0f7fa] p-6 text-center">
      <h1 className="text-5xl font-extrabold text-blue-800 mb-10">魔法英文島</h1>
      <div className="max-w-4xl mx-auto">
        {curriculumData.map((grade, gIndex) => (
          <div key={grade.courseId} className="mb-16">
            <h2 className="text-2xl font-bold bg-blue-500 text-white inline-block px-8 py-3 rounded-full mb-8">{grade.levelName}</h2>
            <div className="flex flex-col items-center gap-8">
              {grade.modules.map((mod, mIndex) => {
                const isCompleted = completedModules.includes(mod.moduleId);
                const isUnlocked = checkIsUnlocked(gIndex, mIndex);
                return (
                  <button key={mod.moduleId} onClick={() => isUnlocked && onSelectModule(mod.moduleId)} disabled={!isUnlocked}
                    className={`w-64 p-5 rounded-3xl border-4 ${isCompleted ? 'bg-white border-green-400' : isUnlocked ? 'bg-yellow-50 border-yellow-400' : 'bg-gray-200 border-gray-300 opacity-70'}`}>
                    <h3 className="text-xl font-bold">{mod.moduleTitle}</h3>
                    {!isCompleted && isUnlocked && <div className="text-xs text-purple-600 mt-2">🎁 {mod.rewardCard.cardName}</div>}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Home.propTypes = {
  onSelectModule: PropTypes.func.isRequired
};

export default Home;