import React, { createContext, useState, useEffect, useContext } from 'react';

const UserProgressContext = createContext();

export const UserProgressProvider = ({ children }) => {
  const [unlockedCards, setUnlockedCards] = useState(() => {
    try {
      const saved = localStorage.getItem('kids_english_cards');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to load unlocked cards:', error);
      localStorage.removeItem('kids_english_cards');
      return [];
    }
  });

  const [completedModules, setCompletedModules] = useState(() => {
    try {
      const saved = localStorage.getItem('kids_english_modules');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to load completed modules:', error);
      localStorage.removeItem('kids_english_modules');
      return [];
    }
  });

  const [mistakesLog, setMistakesLog] = useState(() => {
    try {
      const saved = localStorage.getItem('kids_english_mistakes');
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error('Failed to load mistakes log:', error);
      localStorage.removeItem('kids_english_mistakes');
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('kids_english_cards', JSON.stringify(unlockedCards));
    localStorage.setItem('kids_english_modules', JSON.stringify(completedModules));
    localStorage.setItem('kids_english_mistakes', JSON.stringify(mistakesLog));
  }, [unlockedCards, completedModules, mistakesLog]);

  const unlockCard = (cardId) => {
    if (!unlockedCards.includes(cardId)) setUnlockedCards(prev => [...prev, cardId]);
  };

  const completeModule = (moduleId) => {
    if (!completedModules.includes(moduleId)) setCompletedModules(prev => [...prev, moduleId]);
  };

  const logMistake = (questionId) => {
    setMistakesLog(prev => ({ ...prev, [questionId]: (prev[questionId] || 0) + 1 }));
  };

  return (
    <UserProgressContext.Provider value={{
      unlockedCards, completedModules, mistakesLog, unlockCard, completeModule, logMistake
    }}>
      {children}
    </UserProgressContext.Provider>
  );
};

export const useUserProgress = () => useContext(UserProgressContext);