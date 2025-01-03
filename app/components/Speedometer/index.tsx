import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./styles.css";

type SpeedometerProps = {
  children: React.ReactNode; // Permite receber qualquer tipo de React node
};

const HalfCircularSpeedometer: React.FC<SpeedometerProps> = ({ children }) => {
  const [speedIndex, setSpeedIndex] = useState<number>(0);
  
  // Extrai os valores dos filhos e mapeia para um array
  const speedValues = React.Children.toArray(children)
    .map(child => {
      // Verifica se o child é um elemento React
      if (React.isValidElement(child) && typeof child.props.children === 'string') {
        return Number(child.props.children);
      }
      return null; // Se não for um elemento válido ou não tiver um filho string, retorna null
    })
    .filter(value => value !== null) as number[]; // Filtra os valores null e força a tipagem para number[]

  // Atualiza a velocidade ao deslizar ou clicar em um novo valor
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSlideChange = (swiper: any) => {
    setSpeedIndex(swiper.activeIndex); // Atualiza o índice da velocidade
  };

  // Atualiza a velocidade ao clicar no slide
  const handleSlideClick = (index: number) => {
    setSpeedIndex(index); // Atualiza o índice da velocidade
  };

  // Função que converte o valor da velocidade para a rotação da agulha
  const getNeedleRotation = () => {
    const degree = (speedIndex / (speedValues.length - 1)) * 180; // O semicírculo vai de 0 a 180 graus
    return degree - 90; // -90 para alinhar o ponteiro na posição inicial
  };

  return (
    <div className="half-circular-speedometer-container">
      <div className="speedometer-display">
        <h2>{speedValues[speedIndex]} km/h</h2>
        <div className="container">
          <Swiper
            slidesPerView={1}
            onSlideChange={handleSlideChange}
            style={{ width: "80%", marginTop: "20px" }}
          >
            {React.Children.map(children, (child, index) => (
              <SwiperSlide key={index} className="swiper-slide" onClick={() => handleSlideClick(index)}>
                {child}
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="gauge">
            <svg className="gauge-svg" viewBox="0 0 100 50">
              <path
                d="M 10 45 A 40 40 0 0 1 90 45"
                className="gauge-base"
              />
              <path
                d="M 10 45 A 40 40 0 0 1 90 45"
                className="gauge-fill"
                strokeDasharray={`${(speedIndex / (speedValues.length - 1)) * 125} 125`} // 125 é o comprimento do arco
              />
              <line
                x1="50"
                y1="45"
                x2="50"
                y2="15"
                className="gauge-needle"
                transform={`rotate(${getNeedleRotation()} 50 45)`}
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HalfCircularSpeedometer;
