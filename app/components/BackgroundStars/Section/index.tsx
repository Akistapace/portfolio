import { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
  styles?: React.CSSProperties;
}

const STAR_CONFIG = {
	count: 350,
	color: "white",
};

const BackgroundStars = ({ children, styles }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = wrapper.scrollWidth;
      canvas.height = wrapper.scrollHeight;
    };

    const generateStars = (count: number) => {
      const stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        alpha: Math.random(),
        delta: Math.random() * 0.02 + 0.005,
      }));
      return stars;
    };

    let stars = generateStars(STAR_CONFIG.count);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const star of stars) {
        star.alpha += star.delta;
        if (star.alpha <= 0 || star.alpha >= 1) star.delta = -star.delta;

        ctx.beginPath();
        ctx.globalAlpha = star.alpha;
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = STAR_CONFIG.color;
        ctx.fill();
      }
      requestAnimationFrame(draw);
    };

    resizeCanvas();
    draw();

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
      stars = generateStars(STAR_CONFIG.count);
    });

    resizeObserver.observe(wrapper);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        ...styles,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default BackgroundStars;
