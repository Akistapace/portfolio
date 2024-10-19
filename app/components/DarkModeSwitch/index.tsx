// DarkModeSwitch.tsx
import React from 'react';
import style from './style.module.css'; // Certifique-se de ter estilos para o switch

interface DarkModeSwitchProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeSwitch: React.FC<DarkModeSwitchProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <button onClick={toggleDarkMode} className={style.darkModeSwitch}>
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default DarkModeSwitch;
