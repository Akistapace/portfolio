import Globe from 'globe.gl';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { feature } from 'topojson-client';

const HollowGlobe: React.FC = () => {
  const globeRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: 500 });

  // Definindo variáveis para o ponto inicial do globo no eixo X, Y e Z
  const initialX = 0;  // Ponto inicial no eixo X (centralizado)
  const initialY = -50; // Ponto inicial no eixo Y (para mover para baixo)
  const initialZ = 0;  // Ponto inicial no eixo Z
  const initialLat = 0;  // Ponto inicial do eixo Y (latitude)
  const initialLng = 0;  // Ponto inicial do eixo X (longitude)

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth, height: window.innerHeight * 0.4
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!globeRef.current) return;

    const world = new Globe(globeRef.current)
      .backgroundColor('rgba(0,0,0,0)')
      .showGlobe(true)
      .showAtmosphere(true)
      .atmosphereColor('#ebebeb')
      .atmosphereAltitude(0.18);

    // Aumenta o tamanho do globo
    world.scene().scale.set(1.5, 1.5, 1.5);

    const whiteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    world.globeMaterial(whiteMaterial); // Aplica o material branco ao globo
    fetch('//unpkg.com/world-atlas/land-110m.json').then(res => res.json())
      .then(landTopo => {
        world
          .polygonsData(feature(landTopo, landTopo.objects.land)?.features)
          .polygonCapMaterial(new THREE.MeshLambertMaterial({ color: 'black', side: THREE.DoubleSide }))
          .polygonSideColor(() => 'rgba(0,0,0,0)');
      });

    // Adicionando luz ao cenário
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    world.scene().add(directionalLight);

    // Ajustando a posição do globo no espaço 3D
    world.scene().position.set(initialX, initialY, initialZ);

    // Ajustes da câmera
    world.controls().autoRotate = true;
    world.controls().autoRotateSpeed = 1.5;
    world.controls().enableZoom = false;
    world.controls().enablePan = false;
    world.pointOfView({ lat: initialLat, lng: initialLng }, 1000);

  }, [initialX, initialY, initialZ, dimensions]);

  return <div ref={globeRef} style={{ width: '100%', height: `${dimensions.height}px `, overflow: 'hidden', margin: '0 auto' }} />;  // Centraliza a div no eixo X
};

export default HollowGlobe;
