import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { StarIcon, CheckIcon } from './Icons';

const ImagePractice = ({ lessonData, onComplete }) => {
  const { instruction, interactiveImages, successMessage } = lessonData;
  const [isSuccess, setIsSuccess] = useState(false);
  const [draggedObject, setDraggedObject] = useState(null);
  const [objectPosition, setObjectPosition] = useState({ x: 40, y: 40 });
  const [bgImageError, setBgImageError] = useState(false);
  const [objImageError, setObjImageError] = useState(false);
  const dragRef = useRef(null);

  const CONTAINER_WIDTH = 600;
  const CONTAINER_HEIGHT = 400;
  const SUCCESS_X_THRESHOLD = 350;
  const SUCCESS_Y_THRESHOLD = 250;
  const MAX_X = CONTAINER_WIDTH - 30;
  const MAX_Y = CONTAINER_HEIGHT - 30;

  const handleDragStart = (e) => {
    setDraggedObject({ startX: e.clientX, startY: e.clientY, objectX: objectPosition.x, objectY: objectPosition.y });
  };

  const handleDragMove = (e) => {
    if (!draggedObject) return;
    const deltaX = e.clientX - draggedObject.startX;
    const deltaY = e.clientY - draggedObject.startY;
    setObjectPosition({
      x: Math.max(0, Math.min(MAX_X, draggedObject.objectX + deltaX)),
      y: Math.max(0, Math.min(MAX_Y, draggedObject.objectY + deltaY))
    });
  };

  const handleDragEnd = () => {
    if (draggedObject) {
      if (objectPosition.x > SUCCESS_X_THRESHOLD && objectPosition.y > SUCCESS_Y_THRESHOLD) {
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
        className="relative bg-white rounded-2xl border-4 border-dashed overflow-hidden"
        style={{ width: `${CONTAINER_WIDTH}px`, height: `${CONTAINER_HEIGHT}px` }}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        ref={dragRef}
      >
        {bgImageError ? (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-32 bg-gray-200 flex items-center justify-center text-gray-500">背景圖片加載失敗</div>
        ) : (
          <img src={interactiveImages.background} alt="bg" className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 pointer-events-none" onError={() => setBgImageError(true)} />
        )}

        {!isSuccess ? (
          <div
            className="absolute cursor-grab active:cursor-grabbing select-none"
            style={{ left: `${objectPosition.x}px`, top: `${objectPosition.y}px` }}
            onMouseDown={handleDragStart}
            draggable="false"
          >
            {objImageError ? (
              <div className="w-32 h-32 bg-gray-300 flex items-center justify-center text-gray-500 text-xs">圖片失敗</div>
            ) : (
              <>
                <img src={interactiveImages.object} alt="obj" className="w-32 drop-shadow-lg" onError={() => setObjImageError(true)} />
                <p className="text-center text-xs text-gray-500 mt-1">拖曳我</p>
              </>
            )}
          </div>
        ) : (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center animate-bounce">
             <div className="flex items-center justify-center gap-2 mb-4">
               <StarIcon className="w-12 h-12" />
               <CheckIcon className="w-12 h-12" />
               <StarIcon className="w-12 h-12" />
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