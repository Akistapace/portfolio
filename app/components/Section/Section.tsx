"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import p5 from "p5";
import { ReactNode, useEffect, useRef, useState } from "react";
import styles from './style.module.css';
interface Props {
	children: ReactNode;
	style?: any
}

const numStars = 30;

export const Section = ({ children, style }: Props) => {
	const canvasRef = useRef<HTMLDivElement | null>(null);
	const [isVisible, setIsVisible] = useState(false);
	const p5InstanceRef = useRef<p5 | null>(null);

	useEffect(() => {

		if (typeof window !== "undefined") {
			const observer = new IntersectionObserver(
				([entry]) => {
					setIsVisible(entry.isIntersecting);
				},
				{ threshold: 0.1 } // Considera visível se pelo menos 10% da Section estiver na tela
			);

			if (canvasRef.current) {
				observer.observe(canvasRef.current);
			}

			return () => observer.disconnect();
		}
	}, []);

	useEffect(() => {

		if (typeof window !== "undefined") {

			if (!canvasRef.current) return;

			const sketch = (p: p5) => {
				const stars: Star[] = [];

				p.setup = () => {
					p.createCanvas(p.windowWidth, p.windowHeight);
					p.stroke(255);
					p.strokeWeight(2);

					for (let i = 0; i < numStars; i++) {
						stars.push(new Star(p.random(p.width), p.random(p.height), p));
					}
				};

				p.draw = () => {
					if (!isVisible) return; // Para a animação se a seção não estiver visível
					p.background(0);
					stars.forEach((star) => {
						star.update();
						star.draw();
					});
				};

				p.windowResized = () => {
					p.resizeCanvas(p.windowWidth, p.windowHeight);
				};

				class Star {
					pos: p5.Vector;
					size: number;
					growing: boolean;

					constructor(x: number, y: number, p: p5) {
						this.pos = p.createVector(x, y);
						this.size = p.random(2, 3);
						this.growing = true;
					}

					update() {
						if (this.growing) {
							this.size += 0.1;
							if (this.size > 3) this.growing = false;
						} else {
							this.size -= 0.1;
							if (this.size < 2) this.growing = true;
						}
					}

					draw() {
						p.fill(255);
						p.noStroke();
						p.ellipse(this.pos.x, this.pos.y, this.size, this.size);
					}
				}
			};

			p5InstanceRef.current = new p5(sketch, canvasRef.current as HTMLElement);

			return () => {
				p5InstanceRef.current?.remove();
				p5InstanceRef.current = null;
			};
		}
	}, [isVisible]); // Atualiza a animação conforme a visibilidade muda

	return (
		<div className={styles.hero}>
			<div ref={canvasRef}></div>
			<div className={styles.box} style={{ ...(style || {}) }}>
				{children}
			</div>
		</div>
	);
};
