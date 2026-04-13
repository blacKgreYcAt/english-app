import React from 'react';
import PropTypes from 'prop-types';
import { useUserProgress } from '../context/UserProgress';

const CardCollection = ({ allCardsConfig }) => {
  const { unlockedCards } = useUserProgress();

  return (
    <div className="p-8 bg-slate-900 min-h-screen">
      <h1 className="text-4xl font-extrabold text-amber-500 mb-8 text-center">我的魔法圖鑑</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {allCardsConfig.map((card) => {
          const isUnlocked = unlockedCards.includes(card.cardId);
          return (
            <div key={card.cardId} className={`rounded-xl border-4 ${isUnlocked ? 'border-yellow-400 bg-white p-2' : 'border-slate-700 bg-slate-800 h-48 flex items-center justify-center opacity-50'}`}>
              {isUnlocked ? (
                <div className="text-center">
                  <img src={`/images/cards/${card.cardId}.png`} alt={card.cardName} className="w-full rounded" />
                  <h4 className="mt-2 font-bold">{card.cardName}</h4>
                </div>
              ) : <span className="text-5xl">🔒</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

CardCollection.propTypes = {
  allCardsConfig: PropTypes.arrayOf(PropTypes.shape({
    cardId: PropTypes.string.isRequired,
    cardName: PropTypes.string.isRequired,
    element: PropTypes.string,
    rarity: PropTypes.string
  })).isRequired
};

export default CardCollection;