// Dark mode toggle with persistence
    const root = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') document.body.classList.add('dark');
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });

    // Footer year
    document.getElementById('year').textContent = new Date().getFullYear();

    // IntersectionObserver for reveal-on-scroll
    const revealEls = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));

    // Animated counters
    const counters = document.querySelectorAll('[data-count]');
    const animateCount = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const isFloat = !Number.isInteger(target);
      let current = 0; const steps = 60; let i = 0;
      const inc = target / steps;
      const tick = () => {
        i++; current += inc;
        if (i >= steps) { el.textContent = target + suffix; return; }
        el.textContent = (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;
        requestAnimationFrame(tick);
      };
      tick();
    };
    const co = new IntersectionObserver((entries) => entries.forEach(e => { if (e.isIntersecting) { animateCount(e.target); co.unobserve(e.target); } }), { threshold: .6 });
    counters.forEach(c => co.observe(c));

    // Testimonials slider (auto + dots)
    const track = document.getElementById('track');
    const slides = Array.from(track.children);
    const dotsWrap = document.getElementById('dots');
    let index = 0; let timer;
    slides.forEach((_, i) => {
      const d = document.createElement('button'); d.className = 'dot' + (i===0 ? ' active' : ''); d.setAttribute('aria-label', 'Go to slide ' + (i+1)); d.addEventListener('click', ()=>go(i)); dotsWrap.appendChild(d);
    });
    const dots = Array.from(dotsWrap.children);
    function go(i){ index = i % slides.length; track.style.transform = `translateX(-${index*100}%)`; dots.forEach((d,di)=>d.classList.toggle('active', di===index)); restart(); }
    function next(){ go(index+1); }
    function restart(){ clearInterval(timer); timer = setInterval(next, 4500); }
    restart();
  