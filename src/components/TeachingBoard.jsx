import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TeachingBoard = ({ lessonData, onComplete }) => {
  const { title, content } = lessonData;
  const targetWord = content.highlight.toLowerCase();
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const [feedback, setFeedback] = useState(null);

  const playTeacherVoice = (text, rate = 0.85) => {
    if (isListening) return; 
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = rate;
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("請使用 Google Chrome 瀏覽器開啟麥克風！");

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => { setIsListening(true); setFeedback(null); setRecognizedText("仔細聽你說..."); };
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setRecognizedText(transcript);
      if (transcript.includes(targetWord)) {
        setFeedback('success');
        setTimeout(() => onComplete(), 3000);
      } else {
        setFeedback('try_again');
      }
    };
    recognition.onerror = (event) => {
      setIsListening(false);
      const errorMessages = {
        'no-speech': '沒有偵測到聲音。請檢查麥克風是否正常運作。',
        'audio-capture': '無法訪問麥克風。請檢查瀏覽器權限設定。',
        'network': '網路連接失敗。請檢查網際網路連接。',
        'aborted': '語音辨識已中止。',
        'service-not-allowed': '語音辨識服務不可用。',
        'bad-grammar': '語音辨識格式錯誤。',
        'default': '語音辨識出錯。請再試一次。'
      };
      const errorMsg = errorMessages[event.error] || errorMessages['default'];
      setRecognizedText(errorMsg);
      setFeedback('error');
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  return (
    <div className="teaching-board max-w-3xl mx-auto p-8 bg-white rounded-3xl shadow-xl">
      <h2 className="text-3xl font-extrabold text-blue-600 mb-6 text-center">{title}</h2>
      <div className="flex justify-center mb-8"><img src={content.image} alt="Lesson" className="w-80 rounded-2xl shadow-md" /></div>
      
      <div className="sentence-box bg-blue-50 p-6 rounded-2xl mb-8 text-center">
        <p className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-3">
          {content.text.split(content.highlight).map((part, index, array) => (
            <React.Fragment key={index}>
              {part}
              {index < array.length - 1 && <span className="text-red-500 text-4xl mx-1 underline">{content.highlight}</span>}
            </React.Fragment>
          ))}
          <button onClick={() => playTeacherVoice(content.text)} className="ml-4 p-2 bg-blue-500 text-white rounded-full">🔊</button>
        </p>
        <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded-xl">💡 {content.phonicsTip}</div>
      </div>

      <div className="flex flex-col items-center">
        <h3 className="text-xl font-bold text-gray-700 mb-4">現在換你唸唸看：<span className="text-blue-600">{content.highlight}</span></h3>
        <button onClick={startListening} disabled={isListening} className={`w-24 h-24 rounded-full text-4xl shadow-lg ${isListening ? 'bg-red-500 animate-pulse' : 'bg-green-400'}`}>
          {isListening ? '🎙️' : '🎤'}
        </button>
        <div className="mt-6 h-24">
          {feedback === 'success' && <span className="text-2xl font-bold text-green-500 animate-bounce">✨ 太棒了！發音很標準！ ✨</span>}
          {feedback === 'try_again' && <span className="text-lg text-orange-500">差一點點喔！再試一次！</span>}
          {feedback === 'error' && (
            <div className="p-3 bg-red-100 border-l-4 border-red-500 rounded text-red-700">
              <p className="font-bold">⚠️ 出錯了</p>
              <p className="text-sm">{recognizedText}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

TeachingBoard.propTypes = {
  lessonData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.shape({
      text: PropTypes.string.isRequired,
      highlight: PropTypes.string.isRequired,
      phonicsTip: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      audio: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  onComplete: PropTypes.func.isRequired
};

export default TeachingBoard;