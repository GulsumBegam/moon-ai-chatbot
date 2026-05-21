"use client";

import { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { generateStars } from "@/lib/utils";

export function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const stars = useMemo(() => generateStars(180), []);
  const shootingStars = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        delay: i * 4 + Math.random() * 3,
        duration: 1.5 + Math.random(),
        startX: 10 + Math.random() * 40,
        startY: 5 + Math.random() * 30,
      })),
    []
  );

  // Nebula particles on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let animFrameId: number;
    let tick = 0;

    const nebulaClouds = Array.from({ length: 6 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 150 + Math.random() * 250,
      hue: Math.random() > 0.5 ? 260 : Math.random() > 0.5 ? 200 : 320,
      speed: 0.0002 + Math.random() * 0.0003,
      phase: Math.random() * Math.PI * 2,
    }));

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nebulaClouds.forEach((cloud) => {
        const alpha = 0.03 + 0.015 * Math.sin(tick * cloud.speed + cloud.phase);
        const gradient = ctx.createRadialGradient(
          cloud.x,
          cloud.y,
          0,
          cloud.x,
          cloud.y,
          cloud.r
        );
        gradient.addColorStop(
          0,
          `hsla(${cloud.hue}, 80%, 60%, ${alpha})`
        );
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, cloud.r, 0, Math.PI * 2);
        ctx.fill();
      });

      tick++;
      animFrameId = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep space base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, #0d0520 0%, #02010a 50%, #000814 100%)",
        }}
      />

      {/* Canvas nebula */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-80" />

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 80% 20%, rgba(107,78,255,0.15) 0%, transparent 50%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at 10% 80%, rgba(0,229,255,0.1) 0%, transparent 50%)",
        }}
      />

      {/* Stars */}
      <div className="absolute inset-0">
        {stars.map((star, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
            }}
            animate={{
              opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Shooting stars */}
      {shootingStars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute h-px"
          style={{
            left: `${s.startX}%`,
            top: `${s.startY}%`,
            width: "120px",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
            rotate: "25deg",
          }}
          animate={{
            x: [0, 300],
            y: [0, 120],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            repeatDelay: 12 + Math.random() * 8,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Moon orb */}
      <motion.div
        className="absolute right-16 top-16"
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="w-24 h-24 rounded-full relative"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, #e8e4ff 0%, #a394ff 40%, #5534ff 80%, #1a0066 100%)",
            boxShadow:
              "0 0 60px rgba(107,78,255,0.5), 0 0 120px rgba(107,78,255,0.25), inset -4px -4px 20px rgba(0,0,0,0.4)",
          }}
        >
          {/* Moon craters */}
          <div
            className="absolute w-4 h-4 rounded-full"
            style={{
              top: "30%",
              left: "55%",
              background: "rgba(0,0,0,0.15)",
              boxShadow: "inset 1px 1px 3px rgba(0,0,0,0.3)",
            }}
          />
          <div
            className="absolute w-2.5 h-2.5 rounded-full"
            style={{
              top: "55%",
              left: "25%",
              background: "rgba(0,0,0,0.12)",
            }}
          />
          <div
            className="absolute w-2 h-2 rounded-full"
            style={{
              top: "20%",
              left: "30%",
              background: "rgba(0,0,0,0.1)",
            }}
          />
        </div>

        {/* Orbit ring */}
        <motion.div
          className="absolute inset-[-20px] rounded-full border border-dashed opacity-20"
          style={{ borderColor: "rgba(107,78,255,0.5)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div
            className="absolute w-2 h-2 rounded-full bg-nebula-cyan top-0 left-1/2 -translate-x-1/2 -translate-y-1"
            style={{ boxShadow: "0 0 6px rgba(0,229,255,0.8)" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
