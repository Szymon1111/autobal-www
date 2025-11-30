const config = {
  spawnInterval: 1000,      // co ile ms powstaje nowy puff
  maxActive: 5,           // limit aktywnych puffów (dla wydajności)
  baseX: 240,              // środek kontenera (viewBox coords)
  baseY: 320,              // punkt startu puff (prawie na dole)
  life: { min: 3000, max: 4000 }, // czas życia pojedynczego puff w ms
  driftX: 20,              // maksymalny dryf w X (px)
  riseY: 150,              // jak wysoko się wznosi (px)
  scale: { from: 0.5, to: 1.8}, // skala od->do
  rotation: { min: -25, max: 25 } // losowa rotacja
};

const puffsGroup = document.getElementById('puffsGroup');
let active = 0;
let spawnTimer = null;

// helper: losowa liczba z zakresu
function rand(min, max) {
  return Math.random() * (max - min) + min;
}

// tworzy element SVG reprezentujący puff
function createPuff() {
  const ns = "http://www.w3.org/2000/svg";
  const g = document.createElementNS(ns, 'g');
  g.classList.add('puff');

  // losowe parametry kształtu — kilka elips / kręgów na warstwach
  const circles = [];
  const layers = Math.floor(rand(2,4)); // 2-3 elementy warstw
  for (let i=0; i<layers; i++) {
    const c = document.createElementNS(ns, 'ellipse');
    // losowy offset i rozmiar
    const rx = rand(18, 36) * (1 - i*0.18);
    const ry = rx * rand(0.55, 0.85);
    const offsetX = rand(-14, 14);
    const offsetY = rand(-8, 8);

    c.setAttribute('cx', config.baseX + offsetX);
    c.setAttribute('cy', config.baseY + offsetY);
    c.setAttribute('rx', rx);
    c.setAttribute('ry', ry);
    // lekka gradacja przez opacity i fill
    const alpha = rand(0.55, 0.85) - i*0.12;
    c.setAttribute('fill', `rgba(20,20,20,${alpha})`);
    g.appendChild(c);
    circles.push(c);
  }

  // zastosuj blur filter do całej grupy
  g.setAttribute('filter', 'url(#smokeBlur)');
  // pomocnicze atrybuty do animacji
  g.dataset.createdAt = Date.now();

  puffsGroup.appendChild(g);
  return g;
}

// animuje pulę (puff) i usuwa po zakończeniu
function animatePuff(g) {
  active++;
  const duration = rand(config.life.min, config.life.max);
  const startX = rand(config.baseX - 18, config.baseX + 18);
  const endX = startX + rand(-config.driftX, config.driftX);
  const startY = config.baseY + rand(0, 6);
  const endY = startY - rand(config.riseY * 0.7, config.riseY);

  const rotate = rand(config.rotation.min, config.rotation.max);
  const scaleTo = rand(config.scale.from, config.scale.to);

  anime.timeline({
    easing: 'easeOutCubic',
    duration: duration,
    complete: () => {
      if (g.parentNode) g.parentNode.removeChild(g);
      active--;
    }
  })
  .add({
    targets: g,
    translateX: [0, endX - startX],
    translateY: [0, endY - startY],
    scale: [1, scaleTo],
    rotate: [0, rotate],
    opacity: [0.0, 0.6],
    duration: duration,
    easing: 'cubicBezier(0,.66,.18,.98)',
    delay: 0,
    // stagger dla warstw wewnątrz grupy da delikatną separację - animujemy child nodes
    update: function(anim) {
      // dodatkowe mikro-ruchy wewnątrz elementów (opcjonalne)
    }
  })
  .add({
    targets: g,
    opacity: [0.95, 0.0],
    duration: duration * 0.3,
    easing: 'linear',
    offset: `-${duration * 0.3}` // start pod koniec poprzedniej animacji
  })
}

// spawn loop
function startSpawning() {
  if (spawnTimer) return;
  spawnTimer = setInterval(() => {
    if (active >= config.maxActive) return;
    const puff = createPuff();
    // mały losowy offset początkowy (aby nie wychodziły z tego samego miejsca)
    const jitterX = rand(-12,12);
    puff.style.transformOrigin = `${config.baseX}px ${config.baseY}px`;
    // ustawienie początkowego translate via atrybuty (anime.js użyje transform)
    puff.setAttribute('data-startx', jitterX);
    // uruchom animację
    animatePuff(puff);
  }, config.spawnInterval);
}

function stopSpawning() {
  if (spawnTimer) {
    clearInterval(spawnTimer);
    spawnTimer = null;
  }
}

// startSpawning();

// const wrap = document.getElementById('smokeWrap');
// wrap.addEventListener('mouseenter', () => { stopSpawning(); });
// wrap.addEventListener('mouseleave', () => { startSpawning(); });