import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { StarIcon, CheckIcon } from './Icons';

const ImagePractice = ({ lessonData, onComplete }) => {
  const { instruction, interactiveImages, successMessage } = lessonData;
  const [isSuccess, setIsSuccess] = useState(false);
  const [draggedObject, setDraggedObject] = useState(null);
  const [objectPosition, setObjectPosition] = useState({ x: 40, y: 40 });
  const dragRef = useRef(null);

  const handleDragStart = (e) => {
    setDraggedObject({ startX: e.clientX, startY: e.clientY, objectX: objectPosition.x, objectY: objectPosition.y });
  };

  const handleDragMove = (e) => {
    if (!draggedObject) return;
    const deltaX = e.clientX - draggedObject.startX;
    const deltaY = e.clientY - draggedObject.startY;
    setObjectPosition({
      x: Math.max(0, Math.min(570, draggedObject.objectX + deltaX)),
      y: Math.max(0, Math.min(370, draggedObject.objectY + deltaY))
    });
  };

  const handleDragEnd = () => {
    if (draggedObject) {
      // 簡單判定邏輯：拖到右下方區域即視為成功 (實際應用可更複雜)
      if (objectPosition.x > 350 && objectPosition.y > 250) {
        setIsSuccess(true);
      }
      setDraggedObject(null);
    }
  };

  return (
    <div className="practice-container flex flex-col items-center p-6 bg-blue-50 rounded-xl">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">{lessonData.title}</h2>
      <p className="text-xl text-gray-700 mb-8">{instruction}</p>

      <div
        className="relative w-[600px] h-[400px] bg-white rounded-2xl border-4 border-dashed overflow-hidden"
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        ref={dragRef}
      >
        <img src={interactiveImages.background} alt="bg" className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 pointer-events-none" />

        {!isSuccess ? (
          <div
            className="absolute cursor-grab active:cursor-grabbing select-none"
            style={{ left: `${objectPosition.x}px`, top: `${objectPosition.y}px` }}
            onMouseDown={handleDragStart}
            draggable="false"
          >
            <img src={interactiveImages.object} alt="obj" className="w-32 drop-shadow-lg" />
            <p className="text-center text-xs text-gray-500 mt-1">拖曳我</p>
          </div>
        ) : (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center animate-bounce">
             <div className="flex items-center justify-center gap-2 mb-4">
               <StarIcon className="w-12 h-12" color="#facc15" />
               <CheckIcon className="w-12 h-12" color="#22c55e" />
               <StarIcon className="w-12 h-12" color="#facc15" />
             </div>
             <p className="text-2xl font-bold text-green-600">{successMessage}</p>
             <button onClick={onComplete} className="mt-6 px-8 py-3 bg-green-500 text-white rounded-full hover:bg-green-600">下一關</button>
          </div>
        )}
      </div>
      {!isSuccess && <p className="text-sm text-gray-500 mt-4">提示：將物件拖到右下方</p>}
    </div>
  );
};

ImagePractice.propTypes = {
  lessonData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    instruction: PropTypes.string.isRequired,
    interactiveImages: PropTypes.shape({
      object: PropTypes.string.isRequired,
      background: PropTypes.string.isRequired
    }).isRequired,
    successMessage: PropTypes.string.isRequired
  }).isRequired,
  onComplete: PropTypes.func.isRequired
};

export default ImagePractice;