import React, { useState } from 'react'
import { UserProgressProvider } from './context/UserProgress'
import Home from './pages/Home'
import LessonPage from './pages/LessonPage'

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedModuleId, setSelectedModuleId] = useState(null)

  const handleSelectModule = (moduleId) => {
    setSelectedModuleId(moduleId)
    setCurrentPage('lesson')
  }

  const handleBackToMap = () => {
    setCurrentPage('home')
    setSelectedModuleId(null)
  }

  return (
    <UserProgressProvider>
      {currentPage === 'home' && <Home onSelectModule={handleSelectModule} />}
      {currentPage === 'lesson' && (
        <LessonPage currentModuleId={selectedModuleId} onBackToMap={handleBackToMap} />
      )}
    </UserProgressProvider>
  )
}
