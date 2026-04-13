# 英文千詞營 - Fry 1000 Words Learning Platform

A comprehensive React-based English learning application for children, leveraging the Fry 1000 sight word list.

## Features

- 📚 **Fry 1000 Words Database** - Complete sight word curriculum organized by difficulty levels
- 🎓 **Structured Learning Modules** - 10 grade levels with progressive difficulty
- 🎤 **Voice Recognition Practice** - Interactive pronunciation training
- 📝 **Interactive Learning** - Teaching, practice, and quiz components
- 🎮 **Gamified Experience** - Card-based rewards and progress tracking
- 💾 **Progress Persistence** - localStorage-based progress saving
- 🌐 **Browser-based** - No installation required

## Project Structure

```
src/
├── components/          # React components
│   ├── TeachingBoard.jsx
│   ├── ImagePractice.jsx
│   ├── QuizEngine.jsx
│   └── CardCollection.jsx
├── context/             # State management
│   └── UserProgress.jsx
├── pages/               # Page components
│   ├── Home.jsx
│   └── LessonPage.jsx
├── data/                # Curriculum data
│   ├── curriculum.json
│   ├── curriculum-fry-1000.json
│   └── fry-1000-words.json
├── App.jsx
└── main.jsx
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The app will run on `http://localhost:5173`

## Build

```bash
npm run build
```

Output is in the `dist/` directory.

## Deployment

This app is configured for Vercel deployment with:
- Vite build system
- SPA routing support
- Automatic builds on git push

## Data Structure

### Fry 1000 Words (fry-1000-words.json)
- 1000 sight words organized into 10 levels
- Each word includes:
  - Phonics type (heart_word or decodable)
  - Chinese translation
  - Pronunciation tips
  - Example sentences
  - Audio file references

### Curriculum (curriculum-fry-1000.json)
- 10 grade levels
- Multiple modules per level
- Teaching lessons, practice activities, and quizzes
- Card-based reward system

## Technologies

- React 18
- Vite
- TailwindCSS (for styling)
- PropTypes (for type checking)
- Web Speech API (for voice recognition)

## Code Quality

- ✅ Error handling with try-catch blocks
- ✅ PropTypes validation on all components
- ✅ Boundary condition checks
- ✅ User-friendly error messages
- ✅ localStorage data recovery

## License

Educational use only
