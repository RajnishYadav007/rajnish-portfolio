import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';
import { EffectComposer } from 'https://unpkg.com/three@0.158.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://unpkg.com/three@0.158.0/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://unpkg.com/three@0.158.0/examples/jsm/postprocessing/UnrealBloomPass.js';

const ZONES = ['hero', 'about', 'experience', 'projects', 'skills', 'education', 'contact'];
const state = { config: null, sceneObjects: [] };

const $ = (sel) => document.querySelector(sel);
const sectionLabels = $('#section-labels');
ZONES.forEach((zone) => {
  const li = document.createElement('li');
  li.textContent = zone;
  li.dataset.zone = zone;
  sectionLabels.appendChild(li);
});

init().catch((err) => {
  console.error('Initialization error:', err);
  renderFallback({ error: true });
});

async function init() {
  const config = await fetch('./config.json').then((r) => r.json());
  state.config = config;
  hydrateContent(config);

  const mobileFallback = window.matchMedia('(max-width: 640px)').matches;
  const webglAvailable = supportsWebGL();
  if (!webglAvailable || mobileFallback) {
    renderFallback({ config, mobileFallback });
    return;
  }

  const three = buildScene();
  buildSceneObjects(three.scene);
  setupScrollTracking();
  animateTaglines(config.personal.taglines);
  animate(three);
}

function hydrateContent(config) {
  $('#name-title').textContent = config.personal.name;
  $('#role-title').textContent = config.personal.title;
  $('#about-summary').textContent = config.personal.summary;

  const statsContainer = $('#about-stats');
  config.aboutStats.forEach((stat) => {
    const card = document.createElement('article');
    card.className = 'stat-card';
    card.innerHTML = `<h4>${stat.value}</h4><p>${stat.label}</p>`;
    statsContainer.appendChild(card);
  });

  const expContainer = $('#experience-towers');
  config.experience.forEach((item) => {
    const article = document.createElement('article');
    article.className = 'experience-card';
    article.innerHTML = `
      <h4>${item.company} <small>(${item.context})</small></h4>
      <p>${item.period}</p>
      <ul>${item.achievements.map((a) => `<li>${a}</li>`).join('')}</ul>
      <p><strong>Impact:</strong> ${item.impact}</p>
      <div class="tech-badges">${item.tech.map((t) => `<span>${t}</span>`).join('')}</div>
    `;
    expContainer.appendChild(article);
  });

  const projectContainer = $('#project-cards');
  config.projects.forEach((project) => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.innerHTML = `
      <h4>${project.name}</h4>
      <p>${project.impact}</p>
      <div class="tech-badges">${project.tech.map((t) => `<span>${t}</span>`).join('')}</div>
      <p><a class="action-btn" href="${project.url}" target="_blank" rel="noreferrer">${project.cta}</a></p>
    `;
    projectContainer.appendChild(card);
  });

  const skillPanels = $('#skill-panels');
  Object.entries(config.skills).forEach(([category, skills]) => {
    const panel = document.createElement('article');
    panel.className = 'skill-panel';
    panel.innerHTML = `<h4>${category}</h4>${skills
      .map((skill) => `
        <div class="skill-row">
          <span>${skill.name}</span><span>${skill.level}%</span>
        </div>
        <div class="skill-bar"><div class="skill-fill" style="width:${skill.level}%"></div></div>
      `)
      .join('')}`;
    skillPanels.appendChild(panel);
  });

  $('#education-panel').innerHTML = `<h4>${config.education.degree}</h4><p>${config.education.institution}</p><p>${config.education.period}</p>`;
  $('#linkedin-btn').href = config.personal.linkedin;
  $('#github-btn').href = config.personal.github;
  $('#email-btn').href = `mailto:${config.personal.email}`;
  $('#rotating-tagline').textContent = config.personal.taglines[0];
}

function buildScene() {
  const canvas = $('#webgl-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#0f172a');
  scene.fog = new THREE.FogExp2('#0f172a', 0.004);

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200);
  camera.position.set(0, 1.4, 11);

  const hemi = new THREE.HemisphereLight('#cbd5e1', '#0b1120', 0.4);
  scene.add(hemi);
  const directional = new THREE.DirectionalLight('#ffffff', 1.15);
  directional.position.set(6, 8, 8);
  scene.add(directional);
  const rim = new THREE.DirectionalLight('#3b82f6', 0.35);
  rim.position.set(-7, 2, -4);
  scene.add(rim);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.6, 0.8, 0.35));

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
  });

  return { renderer, scene, camera, composer, clock: new THREE.Clock() };
}

function buildSceneObjects(scene) {
  const toonMat = new THREE.MeshToonMaterial({ color: '#1e293b', gradientMap: createTwoStepGradient(), emissive: '#0b1222' });
  const accentMat = new THREE.MeshToonMaterial({ color: '#3b82f6', gradientMap: createTwoStepGradient(), emissive: '#102a5a' });

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(28, 110), new THREE.MeshStandardMaterial({ color: '#111827', roughness: 0.9, metalness: 0.05 }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.7;
  scene.add(floor);

  // professional character silhouette
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.5, 1.3, 8, 16), toonMat);
  body.position.set(-2.6, -0.38, 5.5);
  const hoodAccent = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.05, 8, 24), accentMat);
  hoodAccent.rotation.x = Math.PI / 2;
  hoodAccent.position.set(-2.6, 0.52, 5.5);
  scene.add(body, hoodAccent);
  state.sceneObjects.push({ mesh: body, type: 'character' }, { mesh: hoodAccent, type: 'character' });

  // company towers + zone objects distributed by depth
  const depthPositions = [0, -14, -28, -42, -56, -70, -84];
  depthPositions.forEach((z, i) => {
    const tower = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2 + i * 0.15, 2.4), i % 2 ? toonMat : accentMat);
    tower.position.set((i % 2 ? 2.7 : -2.7), -0.6 + i * 0.08, z);
    tower.rotation.y = i * 0.25;
    tower.userData.zone = ZONES[i];
    scene.add(tower);
    state.sceneObjects.push({ mesh: tower, type: 'tower' });
  });

  // reduced particles by design (~60 points)
  const pGeo = new THREE.BufferGeometry();
  const particles = new Float32Array(60 * 3);
  for (let i = 0; i < 60; i += 1) {
    particles[i * 3] = THREE.MathUtils.randFloatSpread(18);
    particles[i * 3 + 1] = THREE.MathUtils.randFloat(0.2, 4.8);
    particles[i * 3 + 2] = THREE.MathUtils.randFloat(-88, 8);
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(particles, 3));
  const pMat = new THREE.PointsMaterial({ color: '#3b82f6', size: 0.03, transparent: true, opacity: 0.55 });
  const points = new THREE.Points(pGeo, pMat);
  scene.add(points);
  state.sceneObjects.push({ mesh: points, type: 'particles' });
}

function animate(three) {
  const { camera, composer, clock } = three;
  const targetCameraPos = new THREE.Vector3(0, 1.4, 8.8);
  const start = performance.now();

  const tick = () => {
    const elapsed = clock.getElapsedTime();
    const scrollProgress = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);

    // professional entry animation: fade + dolly
    const introT = Math.min((performance.now() - start) / 1600, 1);
    camera.position.lerpVectors(new THREE.Vector3(0, 1.2, 11.6), targetCameraPos, introT);

    camera.position.z -= scrollProgress * 84;
    camera.position.y = 1.2 + Math.sin(elapsed * 0.18) * 0.06;

    state.sceneObjects.forEach((obj) => {
      if (obj.type === 'character') obj.mesh.position.y += Math.sin(elapsed * 1.1) * 0.0009;
      if (obj.type === 'tower') obj.mesh.rotation.y += 0.002;
      if (obj.type === 'particles') obj.mesh.rotation.y = elapsed * 0.02;
    });

    composer.render();
    requestAnimationFrame(tick);
  };
  tick();
}

function setupScrollTracking() {
  const sections = [...document.querySelectorAll('.zone')];
  const progressBar = $('#progress-bar');

  const update = () => {
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const pct = Math.max(0, Math.min(100, (window.scrollY / maxScroll) * 100));
    progressBar.style.height = `${pct}%`;

    let active = 'hero';
    sections.forEach((section) => {
      const top = section.getBoundingClientRect().top;
      if (top <= window.innerHeight * 0.45) active = section.dataset.zone;
    });
    document.querySelectorAll('#section-labels li').forEach((li) => li.classList.toggle('active', li.dataset.zone === active));
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

function animateTaglines(taglines) {
  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % taglines.length;
    const el = $('#rotating-tagline');
    el.animate([{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(8px)' }], { duration: 220, fill: 'forwards' });
    setTimeout(() => {
      el.textContent = taglines[idx];
      el.animate([{ opacity: 0, transform: 'translateY(-8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 260, fill: 'forwards' });
    }, 240);
  }, 2600);
}

function renderFallback({ config = state.config } = {}) {
  $('#content').classList.add('hidden');
  $('#webgl-canvas').classList.add('hidden');
  $('.progress-nav').classList.add('hidden');
  const fallback = $('#fallback');
  fallback.classList.remove('hidden');

  if (!config) return;
  fallback.innerHTML = `
    <h1>${config.personal.name}</h1>
    <h2>${config.personal.title}</h2>
    <p>${config.personal.summary}</p>
    <h3>Experience</h3>
    ${config.experience.map((e) => `<article class="glass-panel" style="padding:1rem;margin:0 0 1rem;"><h4>${e.company}</h4><p>${e.impact}</p></article>`).join('')}
    <h3>Projects</h3>
    <ul>${config.projects.map((p) => `<li><a href="${p.url}" target="_blank" rel="noreferrer">${p.name}</a> — ${p.impact}</li>`).join('')}</ul>
    <p><a href="mailto:${config.personal.email}">${config.personal.email}</a></p>
  `;
}

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!window.WebGLRenderingContext && (!!canvas.getContext('webgl') || !!canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}

function createTwoStepGradient() {
  const colors = new Uint8Array([40, 180]);
  const texture = new THREE.DataTexture(colors, 2, 1, THREE.RedFormat);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  return texture;
}
