import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // GSAP Animation
    gsap.from(".animate-slide-in", {
      duration: 1.5,
      opacity: 0,
      y: 60,
      stagger: 0.3,
      ease: "power4.out",
    });

    // WebGL Particle Animation
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = 800;
    const ctx = canvas.getContext("2d");
    const particles = [];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: Math.random() * 0.3 - 0.15,
        vy: Math.random() * 0.3 - 0.15,
      });
    }
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }, []);

  return (
    <section className="relative h-[800px] flex items-center justify-center text-white overflow-hidden" role="region" aria-label="Hero Section">
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0">
        {/* <source src="https://suoitienfarm.com/videos/hero-video.webm" type="video/webm" /> */}
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#071f1a] opacity-70 z-10"></div>
      <canvas ref={canvasRef} className="absolute inset-0 z-20"></canvas>
      <div className="text-center z-30 max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-slide-in">Đỉnh Cao Trải Nghiệm Du Lịch Xanh</h1>
        <p className="text-xl md:text-3xl mb-8 animate-slide-in">Tham gia lễ hội trái cây Nam Bộ, hái Sung Mỹ VietGap, và khám phá workshop sáng tạo tại Suối Tiên Farm.</p>
        <a href="#events" className="bg-[#f4c430] hover:bg-[#d97706] text-[#071f1a] font-semibold py-4 px-12 rounded-full btn-cta animate-slide-in" aria-label="Khám Phá Sự Kiện">
          Khám Phá Ngay
        </a>
      </div>
    </section>
  );
};

export default React.memo(Hero);