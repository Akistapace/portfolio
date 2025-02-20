import { useEffect, useState } from 'react';
import style from './style.module.css';

export const Cover = () => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setLoading(false);
      }, 300); // Tempo da transição do fade-out
    }, 2000);
  }, []);

  if (!loading) return null;

  return (
    <div className={`${style.cover} ${fadeOut ? style.fadeOut : ''}`}>
      <span className={'loader'}></span>
    </div>
  );
};
