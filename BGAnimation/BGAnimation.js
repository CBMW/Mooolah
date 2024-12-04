import React, { useEffect, useRef } from "react";

const BGAnimation = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Resize canvas to fill the screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    const particles = [];
    const particleCount = 50;
    const colors = ["#a0e4b0", "#88d497", "#66bb6a", "#444", "#333"]; // Updated theme colors

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)], // Assign random theme color
      });
    }

    // Track ripples
    const ripples = [];

    // Handle mouse clicks
    const handleMouseClick = (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      ripples.push({ x: mouseX, y: mouseY, radius: 0, maxRadius: 50 });
    };
    canvas.addEventListener("click", handleMouseClick);

    // Draw particles
    const drawParticles = () => {
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color; // Use particle's assigned color
        ctx.fill();
      });
    };

    // Draw lines between close particles
    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const distance = Math.hypot(
            particles[i].x - particles[j].x,
            particles[i].y - particles[j].y
          );
          if (distance < 100) {
            ctx.strokeStyle = `rgba(160, 228, 176, ${1 - distance / 100})`; // Soft green gradient
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Draw ripples
    const drawRipples = () => {
      ripples.forEach((ripple, index) => {
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(160, 228, 176, ${1 - ripple.radius / ripple.maxRadius})`; // Ripple color
        ctx.lineWidth = 2;
        ctx.stroke();

        ripple.radius += 1; // Increase ripple radius

        // Remove ripple when it reaches max radius
        if (ripple.radius > ripple.maxRadius) {
          ripples.splice(index, 1);
        }
      });
    };

    // Update particle positions
    const updateParticles = () => {
      particles.forEach((particle) => {
        particle.x += particle.dx;
        particle.y += particle.dy;

        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;
      });
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawParticles();
      drawLines();
      drawRipples();
      updateParticles();
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("click", handleMouseClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    ></canvas>
  );
};

export default BGAnimation;
