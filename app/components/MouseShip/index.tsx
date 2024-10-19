'use client';
import React, { useEffect, useState } from 'react';
import style from './style.module.css';

interface Position {
  x: number;
  y: number;
}

const RocketFollowMouse: React.FC = () => {
  // Define a posição inicial da nave para o centro do topo
  const [rocketPosition, setRocketPosition] = useState<Position>({
    x: window.innerWidth / 2 - 25, // Centraliza horizontalmente
    y: 0, // Início no topo
  });
  const [rotation, setRotation] = useState(0); // Estado para armazenar a rotação da nave
  const [isMoving, setIsMoving] = useState(false); // Estado para verificar se o mouse está em movimento

  // Atualiza a posição da nave e calcula a rotação
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const mouseX = event.clientX; // Posição X do mouse no viewport
      const mouseY = event.clientY; // Posição Y do mouse no viewport

      // Calcula a diferença entre a posição da nave e a posição do mouse
      const deltaX = mouseX - (rocketPosition.x - 25); // Corrige para o centro da nave
      const deltaY = mouseY - (rocketPosition.y - 25); // Corrige para o centro da nave

      // Calcula o ângulo em graus
      const angle = Math.atan2(deltaY, deltaX) * (-15 / Math.PI);

      // Atualiza a rotação e a posição da nave
      setRotation(angle);
      setRocketPosition({
        x: mouseX + 25, // Centraliza a nave na posição do mouse
        y: mouseY + 25,
      });

      setIsMoving(true); // O mouse está se movendo
    };

    const handleMouseStop = () => {
      if (isMoving) {
        // Quando o mouse parar, a nave aponta para cima
        setRotation(0);
        setIsMoving(false); // Reseta o estado de movimento
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseStop); // Adiciona listener para quando o mouse sair da janela

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseStop);
    };
  }, [isMoving, rocketPosition.x, rocketPosition.y]);

  return (
    <div>
      <div className={style.rocketContainer}>
        <svg
          className={style.rocket}
          style={{
            transform: `translate(${rocketPosition.x}px, ${rocketPosition.y}px) rotate(${rotation}deg)`,
          }}
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="512.000000pt"
          height="512.000000pt"
          viewBox="0 0 512.000000 512.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
            fill="#000000"
            stroke="none"
          >
            <path d="M2490 5102 c-21 -11 -44 -36 -58 -63 -25 -49 -1177 -3728 -1169 -3735 2 -3 295 169 651 382 l646 386 647 -386 c355 -212 648 -384 650 -382 6 5 -1140 3674 -1164 3729 -33 76 -130 109 -203 69z" />
            <path d="M990 2223 c-715 -695 -806 -790 -787 -809 3 -4 714 -94 740 -94 10 0 17 8 17 20 0 11 83 286 185 611 102 326 184 593 183 595 -2 1 -154 -144 -338 -323z" />
            <path d="M3790 2548 c0 -4 83 -272 185 -597 102 -325 185 -600 185 -611 0 -14 7 -20 23 -20 12 0 180 20 372 45 193 25 354 45 358 45 11 0 -2 41 -22 65 -9 11 -214 213 -456 449 -242 236 -486 475 -542 530 -57 55 -103 98 -103 94z" />
            <path d="M2235 1529 c-176 -105 -321 -192 -322 -193 -2 -1 22 -77 53 -168 56 -170 79 -209 132 -229 13 -5 221 -9 464 -9 480 0 487 1 524 57 15 24 127 344 121 349 -8 8 -641 384 -646 384 -3 0 -150 -86 -326 -191z" />
            <path d="M340 1086 c0 -14 536 -1015 554 -1034 67 -74 178 -66 233 17 l23 34 0 443 c0 244 -3 444 -7 444 -5 0 -183 23 -398 50 -420 54 -405 52 -405 46z" />
            <path d="M4358 1037 l-388 -51 0 -441 0 -442 23 -34 c55 -83 166 -91 233 -17 18 19 554 1020 554 1034 0 6 -9 5 -422 -49z" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default RocketFollowMouse;
