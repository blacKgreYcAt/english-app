import React from 'react';

// 麥克風圖標（未錄音狀態）
export const MicrophoneIcon = ({ className = "w-12 h-12", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" style={{ fill: color }}>
    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
    <path d="M17 16.91c-1.48.88-3.18 1.39-5 1.39s-3.52-.51-5-1.39V20h10v-3.09z"/>
  </svg>
);

// 麥克風圖標（錄音中）
export const MicrophoneAnimatedIcon = ({ className = "w-12 h-12", color = "currentColor" }) => (
  <svg className={`${className} animate-pulse`} viewBox="0 0 24 24" style={{ fill: color }}>
    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
    <path d="M17 16.91c-1.48.88-3.18 1.39-5 1.39s-3.52-.51-5-1.39V20h10v-3.09z"/>
  </svg>
);

// 音量/喇叭圖標
export const SpeakerIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" style={{ fill: color }}>
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.26 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
  </svg>
);

// 燈泡圖標（提示）
export const LightBulbIcon = ({ className = "w-5 h-5", color = "#b45900" }) => (
  <svg className={className} viewBox="0 0 24 24" style={{ fill: color }}>
    <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-20C6.48 1 4 3.48 4 6c0 2.85 1.93 5.27 4.5 5.97V19c0 .55.45 1 1 1s1-.45 1-1v-7.03C14.07 11.27 16 8.85 16 6c0-2.52-2.48-5-5.5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
  </svg>
);

// 星星/閃亮圖標
export const StarIcon = ({ className = "w-6 h-6", color = "#22c55e" }) => (
  <svg className={className} viewBox="0 0 24 24" style={{ fill: color }}>
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2l-2.81 6.63L2 9.24l5.46 4.73L5.82 21 12 17.27z"/>
  </svg>
);

// 警告圖標
export const AlertIcon = ({ className = "w-6 h-6", color = "#ef4444" }) => (
  <svg className={className} viewBox="0 0 24 24" style={{ fill: color }}>
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
  </svg>
);

// 慶祝圖標（五角星/禮花）
export const CelebrationIcon = ({ className = "w-8 h-8", color = "#eab308" }) => (
  <svg className={className} viewBox="0 0 24 24" style={{ fill: color }}>
    <path d="M12 2l3.09 6.26L22 9.27l-7.5 7.29L16.18 22 12 18.77 7.82 22l1.5-5.44L2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

// 檢查圖標（成功）
export const CheckIcon = ({ className = "w-6 h-6", color = "#22c55e" }) => (
  <svg className={className} viewBox="0 0 24 24" style={{ fill: color }}>
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
  </svg>
);

// 箭頭圖標（下一步）
export const ArrowRightIcon = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" style={{ fill: color }}>
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
  </svg>
);

// 箭頭左圖標（返回）
export const ArrowLeftIcon = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" style={{ fill: color }}>
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
  </svg>
);

export default {
  MicrophoneIcon,
  MicrophoneAnimatedIcon,
  SpeakerIcon,
  LightBulbIcon,
  StarIcon,
  AlertIcon,
  CelebrationIcon,
  CheckIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
};
