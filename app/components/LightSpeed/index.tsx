"use client";
import { useEffect, useRef } from "react";
import p5 from "p5";
import style from "./style.module.css";
import { Title } from "../Title";

const numStars = 200;

const StarField: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let p5Instance: p5 | null = null;

    const sketch = (p: p5) => {
      let stars: Star[] = [];

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight); // Canvas dimension matches window size
        p.stroke(0);
        p.strokeWeight(2);

        for (let i = 0; i < numStars; i++) {
          stars.push(new Star(p.random(p.width), p.random(p.height), p));
        }
      };

      p.draw = () => {
        p.background(255, 50);
        const acc = p.map(p.mouseX, 0, p.width, 0.02, 0.2);

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
        p.resizeCanvas(p.windowWidth, p.windowHeight); // Resize canvas dynamically
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

    p5Instance = new p5(sketch, canvasRef.current as HTMLElement);

    return () => {
      if (p5Instance) {
        p5Instance.remove();
      }
    };
  }, []);

  return (
    <div className={style.container}>
      <div ref={canvasRef}></div>
      <div className={style.box}>
        <Title effect={false}>
          Fernando
          <br />
          Aquistapace
        </Title>
      </div>
    </div>
  );
};

export default StarField;
