
import "../Policy/style.css";

function HeroSection() {
//   useEffect(() => {
//     // Khởi tạo tsParticles
//     tsParticles.load({
//       id: 'particles-js',
//       options: {
//         preset: 'links',
//         particles: {
//           number: { value: 50 },
//           color: { value: '#d4af37' },
//           links: { color: '#d4af37', distance: 120, enable: true, opacity: 0.6 },
//           move: { enable: true, speed: 2 },
//           size: { value: { min: 1, max: 4 } }
//         }
//       }
//     }).catch((error) => {
//       console.error('Lỗi tải tsParticles:', error);
//     });

//     // GSAP Animation
//     const tl = gsap.timeline();
//     tl.from('.hero-bg h2', { opacity: 0, y: 60, duration: 1, delay: 0.5 })
//       .from('.hero-bg p', { opacity: 0, y: 40, duration: 1 }, '-=0.5')
//       .from('.hero-bg .cta-button', { opacity: 0, scale: 0.8, duration: 0.8 }, '-=0.5');
//   }, []);

  return (
    <section id="hero" className="hero-bg">
      <div id="particles-js"></div>
      <video autoPlay muted loop className="lazyload">
        <source data-src="/assets/videos/farm-video.mp4" type="video/mp4" />
      </video>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">Hợp tác cùng Suối Tiên Farm</h2>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
          Kiến tạo tương lai xanh với nông sản sạch, trải nghiệm du lịch bền vững, và cơ hội kinh doanh độc đáo.
        </p>
        <a
          href="#contact"
          className="cta-button"
          onClick={() => window.scrollTo({ top: document.querySelector('#contact').offsetTop, behavior: 'smooth' })}
        >
          Bắt đầu hợp tác
        </a>
      </div>
    </section>
  );
}

export default HeroSection;