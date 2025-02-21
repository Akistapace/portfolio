"use client";
import p5 from "p5";
import { useEffect, useRef, useState } from "react";
import style from "./style.module.css";

const numStars = 200;

const StarField: React.FC = () => {
	const canvasRef = useRef<HTMLDivElement | null>(null);
	const [isVisible, setIsVisible] = useState(false);
	const p5InstanceRef = useRef<p5 | null>(null);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const observer = new IntersectionObserver(
				([entry]) => {
					setIsVisible(entry.isIntersecting);
				},
				{ threshold: 0.1 } // Considera visível se pelo menos 10% do componente estiver na tela
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
				let stars: Star[] = [];

				p.setup = () => {
					p.createCanvas(p.windowWidth, p.windowHeight);
					p.stroke(0);
					p.strokeWeight(2);

					for (let i = 0; i < numStars; i++) {
						stars.push(new Star(p.random(p.width), p.random(p.height), p));
					}
				};

				p.draw = () => {
					if (!isVisible) return; // Pausa a animação se não estiver visível

					p.background(255, 50);
					const acc = p.map(p.mouseX, 0, p.width, 0.2, 0.2);

					stars = stars.filter((star) => {
						star.draw();
						star.update(acc);
						return star.isActive();
					});

					while (stars.length < numStars) {
						stars.push(new Star(p.random(p.width), p.random(p.height), p));
					}
				};

				p.windowResized = () => {
					p.resizeCanvas(p.windowWidth, p.windowHeight);
				};

				class Star {
					pos: p5.Vector;
					prevPos: p5.Vector;
					vel: p5.Vector;
					ang: number;

					constructor(x: number, y: number, p: p5) {
						this.pos = p.createVector(x, y);
						this.prevPos = p.createVector(x, y);
						this.vel = p.createVector(0, 0);
						this.ang = p.atan2(y - p.height / 2, x - p.width / 2);
					}

					isActive() {
						return this.onScreen(this.prevPos.x, this.prevPos.y, p);
					}

					update(acc: number) {
						this.vel.x += p.cos(this.ang) * acc;
						this.vel.y += p.sin(this.ang) * acc;

						this.prevPos.x = this.pos.x;
						this.prevPos.y = this.pos.y;

						this.pos.x += this.vel.x;
						this.pos.y += this.vel.y;
					}

					draw() {
						const alpha = p.map(this.vel.mag(), 0, 3, 0, 255);
						p.stroke(0, alpha);
						p.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
					}

					private onScreen(x: number, y: number, p: p5) {
						return x >= 0 && x <= p.width && y >= 0 && y <= p.height;
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
		<div className={style.container}>
			<div ref={canvasRef}></div>
			<div className={style.box}>
				<h1 className={style.title}>Fernando Aquistapace</h1>
				<p className={style.subtitle}>Frontend Developer | Performance Developer</p>
			</div>
		</div>
	);
};

export default StarField;
