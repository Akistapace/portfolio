import p5 from "p5";
import { ReactNode, useEffect, useRef } from "react";
import style from "./style.module.css";

interface Props {
    children: ReactNode;
    padding?: string;
}

const numStars = 30;

export const Section = ({ children, padding }: Props) => {
    const canvasRef = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        let p5Instance: p5 | null = null;

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

        p5Instance = new p5(sketch, canvasRef.current as HTMLElement);

        return () => {
            if (p5Instance) {
                p5Instance.remove();
            }
        };
    }, []);


    return (
        <div className={style.hero}>
            <div ref={canvasRef} className="luxy-el"></div>
            <div className={style.box} style={{ padding }}>
                {children}
            </div>
        </div>
    );
};
