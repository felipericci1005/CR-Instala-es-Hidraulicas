/* ============================================================
   CR Instalações Hidráulicas — bolha de água 3D (WebGL/Three.js)
   Renderiza uma gota de água que ondula como líquido e segue o mouse.
   Degrada com elegância: se o Three.js não carregar ou não houver
   WebGL, o site continua normal (só não mostra o 3D).
   ============================================================ */
(function () {
  'use strict';

  const canvas = document.getElementById('blob');
  if (!canvas) return;

  // Sem Three.js (CDN offline) ou WebGL → não faz nada, sem quebrar a página.
  if (typeof THREE === 'undefined') return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  } catch (e) {
    return; // navegador sem WebGL
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 4.2);

  // Grupo que gira (bolha)
  const group = new THREE.Group();
  scene.add(group);

  // Geometria com bastante vértices para a ondulação ficar suave
  const geometry = new THREE.IcosahedronGeometry(1.25, 14);
  const basePos = geometry.attributes.position.array.slice(); // cópia das posições originais
  const vertexCount = geometry.attributes.position.count;

  // Material "água": azul da marca, brilhante, com verniz (clearcoat)
  const material = new THREE.MeshPhysicalMaterial({
    color: 0x1f8fde,
    roughness: 0.12,
    metalness: 0.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.15,
    reflectivity: 0.7,
    transmission: 0.25
  });
  const blob = new THREE.Mesh(geometry, material);
  group.add(blob);

  // Luzes (sem precisar de textura externa)
  scene.add(new THREE.AmbientLight(0x4d72b0, 0.6));
  const key = new THREE.PointLight(0xffffff, 0.9); key.position.set(5, 5, 6); scene.add(key);
  const fill = new THREE.PointLight(0x29abe2, 0.9); fill.position.set(-5, -2, 4); scene.add(fill);
  const rim = new THREE.PointLight(0x0b6cb4, 0.7); rim.position.set(0, -5, -5); scene.add(rim);
  const top = new THREE.DirectionalLight(0xbfe4ff, 0.5); top.position.set(0, 6, 2); scene.add(top);

  // Ruído simples por somatório de senos → ondulação orgânica de líquido
  function wobble(x, y, z, t) {
    return (
      Math.sin(x * 2.2 + t) * 0.5 +
      Math.sin(y * 2.6 - t * 0.8) * 0.35 +
      Math.sin(z * 2.0 + t * 0.6) * 0.30 +
      Math.sin((x + y + z) * 1.4 + t * 1.2) * 0.18
    );
  }

  const pos = geometry.attributes.position;
  const AMP = 0.12;

  function deform(t) {
    for (let i = 0; i < vertexCount; i++) {
      const ix = i * 3, iy = ix + 1, iz = ix + 2;
      const ox = basePos[ix], oy = basePos[iy], oz = basePos[iz];
      // direção = vetor unitário do vértice (a esfera tem raio ~1.25)
      const len = Math.hypot(ox, oy, oz);
      const d = 1 + (wobble(ox, oy, oz, t) * AMP) / len;
      pos.array[ix] = ox * d;
      pos.array[iy] = oy * d;
      pos.array[iz] = oz * d;
    }
    pos.needsUpdate = true;
    geometry.computeVertexNormals();
  }

  // Tamanho responsivo
  function resize() {
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas);
  else window.addEventListener('resize', resize);

  // Parallax: a bolha inclina suavemente seguindo o mouse
  let targetX = 0, targetY = 0;
  window.addEventListener('pointermove', (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 0.6;
    targetY = (e.clientY / window.innerHeight - 0.5) * 0.6;
  });

  // Pausa quando a aba some OU quando o hero sai da tela (economiza CPU/bateria)
  let visible = !document.hidden, onScreen = true, ticking = false;
  function ensureRunning() {
    if (visible && onScreen && !reduceMotion && !ticking) {
      ticking = true;
      clock.getDelta(); // descarta o tempo parado p/ não dar um "pulo"
      requestAnimationFrame(loop);
    }
  }
  document.addEventListener('visibilitychange', () => { visible = !document.hidden; ensureRunning(); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => { onScreen = entries[0].isIntersecting; ensureRunning(); },
                            { threshold: 0 }).observe(canvas);
  }

  const clock = new THREE.Clock();
  let t = 0;

  function loop() {
    if (!visible || !onScreen || reduceMotion) { ticking = false; return; }
    const dt = clock.getDelta();
    t += dt;

    deform(t * 0.9);
    group.rotation.y += dt * 0.25;
    group.rotation.x += (targetY - group.rotation.x) * 0.05;
    group.rotation.z += (targetX - group.rotation.z) * 0.05;

    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  }

  if (reduceMotion) {
    // Acessibilidade: desenha um quadro estático, sem animar.
    deform(0.6);
    renderer.render(scene, camera);
  } else {
    ticking = true;
    requestAnimationFrame(loop);
  }
})();
