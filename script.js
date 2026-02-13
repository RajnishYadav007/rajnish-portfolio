import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';
import { EffectComposer } from 'https://unpkg.com/three@0.158.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://unpkg.com/three@0.158.0/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://unpkg.com/three@0.158.0/examples/jsm/postprocessing/UnrealBloomPass.js';

const WORLD_LENGTH = 300;
const ZONES = [
  { name: 'Intro', start: 0, end: -25 },
  { name: 'About', start: -25, end: -65 },
  { name: 'Experience', start: -65, end: -115 },
  { name: 'Projects', start: -115, end: -175 },
  { name: 'Skills', start: -175, end: -225 },
  { name: 'Education', start: -225, end: -265 },
  { name: 'Contact', start: -265, end: -300 }
];

const canvas = document.getElementById('scene');
const loadingScreen = document.getElementById('loading-screen');
const loadingStatus = document.getElementById('loading-status');
const loaderFill = document.getElementById('loader-fill');
const panelRoot = document.getElementById('panel-root');
const zoneIndicator = document.getElementById('zone-indicator');
const progressLine = document.getElementById('progress-line');
const dotsRoot = document.getElementById('progress-dots');

let config;
let cameraYaw = 0;
let cameraPitch = 0.22;
let dragging = false;
let previousMouse = { x: 0, y: 0 };
let targetZ = 0;
let currentZ = 0;
let introStart = performance.now();

const scene = new THREE.Scene();
scene.background = createSkyGradientTexture();
scene.fog = new THREE.FogExp2(0x1a1a2e, 0.008);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1500);
camera.position.set(0, 6, 15);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.2, 0.5, 0.2));

const hemi = new THREE.HemisphereLight(0xffffff, 0x2d2d66, 0.7);
scene.add(hemi);
scene.add(new THREE.DirectionalLight(0xffffff, 0.45));

const world = new THREE.Group();
scene.add(world);

const characterRig = new THREE.Group();
world.add(characterRig);
let character;
const clock = new THREE.Clock();

function getPathX(z) {
  return Math.sin(z * 0.05) * 12 + Math.sin(z * 0.02) * 5;
}

function createAnimeMaterial(color) {
  const gradientData = new Uint8Array([32, 130, 240]);
  const gradientMap = new THREE.DataTexture(gradientData, 3, 1, THREE.RedFormat);
  gradientMap.minFilter = THREE.NearestFilter;
  gradientMap.magFilter = THREE.NearestFilter;
  gradientMap.needsUpdate = true;
  return new THREE.MeshToonMaterial({ color, gradientMap });
}

function addOutline(mesh, thickness = 0.02) {
  const shell = new THREE.Mesh(mesh.geometry, new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide }));
  shell.scale.setScalar(1 + thickness);
  mesh.add(shell);
  return shell;
}

function createSkyGradientTexture() {
  const c = document.createElement('canvas');
  c.width = 16;
  c.height = 1024;
  const ctx = c.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, c.height);
  gradient.addColorStop(0, '#0f0c29');
  gradient.addColorStop(0.5, '#302b63');
  gradient.addColorStop(1, '#24243e');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, c.width, c.height);
  const tx = new THREE.CanvasTexture(c);
  tx.colorSpace = THREE.SRGBColorSpace;
  return tx;
}

function createGround() {
  const geo = new THREE.PlaneGeometry(90, WORLD_LENGTH, 40, 240);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i += 1) {
    const zLocal = pos.getY(i) - WORLD_LENGTH / 2;
    const xOffset = getPathX(zLocal);
    pos.setX(i, pos.getX(i) + xOffset);
    const wave = Math.sin(zLocal * 0.08) * 0.5;
    pos.setZ(i, wave);
  }
  geo.computeVertexNormals();
  const mesh = new THREE.Mesh(geo, createAnimeMaterial('#3f3d6e'));
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.z = -WORLD_LENGTH / 2;
  world.add(mesh);
  addOutline(mesh, 0.01);
}

function createCharacter() {
  const group = new THREE.Group();
  const skin = createAnimeMaterial('#ffdcb6');
  const suit = createAnimeMaterial('#ff7675');
  const pants = createAnimeMaterial('#2d3436');
  const bag = createAnimeMaterial('#fdcb6e');

  const torso = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.9, 0.9), suit);
  torso.position.y = 3.2;
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.52, 20, 20), skin);
  head.position.y = 4.65;
  const hips = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.8, 0.8), pants);
  hips.position.y = 2.05;

  const legL = new THREE.Mesh(new THREE.BoxGeometry(0.45, 1.7, 0.45), pants);
  const legR = legL.clone();
  legL.position.set(-0.32, 0.95, 0);
  legR.position.set(0.32, 0.95, 0);

  const armL = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.4, 0.4), suit);
  const armR = armL.clone();
  armL.position.set(-0.92, 3.0, 0);
  armR.position.set(0.92, 3.0, 0);

  const backpack = new THREE.Mesh(new THREE.BoxGeometry(1, 1.2, 0.38), bag);
  backpack.position.set(0, 3.15, -0.65);

  [torso, head, hips, legL, legR, armL, armR, backpack].forEach((part) => {
    addOutline(part, 0.02);
    group.add(part);
  });

  group.scale.setScalar(1.5);
  group.userData = { legL, legR, armL, armR };
  return group;
}

function scatterTrees() {
  const trunkMat = createAnimeMaterial('#6d4c41');
  const leavesMat = createAnimeMaterial('#2ecc71');
  for (let i = 0; i < 12; i += 1) {
    const z = -28 - i * 3;
    const side = i % 2 ? 1 : -1;
    const x = getPathX(z) + side * (6 + (i % 3) * 2.5);
    const t = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.3, 2.2, 8), trunkMat);
    trunk.position.y = 1.1;
    const leaves = new THREE.Mesh(new THREE.ConeGeometry(1.2, 2.2, 10), leavesMat);
    leaves.position.y = 2.8;
    t.add(trunk, leaves);
    t.position.set(x, 0, z);
    addOutline(trunk, 0.02);
    addOutline(leaves, 0.02);
    world.add(t);
  }

  const orbMat = createAnimeMaterial('#00ff66');
  for (let i = 0; i < 25; i += 1) {
    const z = -27 - Math.random() * 36;
    const x = getPathX(z) + THREE.MathUtils.randFloatSpread(16);
    const orb = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 12), orbMat);
    orb.position.set(x, 1 + Math.random() * 2.6, z);
    addOutline(orb, 0.018);
    world.add(orb);
  }
}

function experienceCity() {
  const mat = createAnimeMaterial('#7f8c8d');
  for (let i = 0; i < 20; i += 1) {
    const z = -66 - i * 2.3;
    const side = i % 2 ? -1 : 1;
    const dist = THREE.MathUtils.randFloat(8, 15);
    const x = getPathX(z) + side * dist;
    const h = THREE.MathUtils.randFloat(6, 14) * 1.5;
    const b = new THREE.Mesh(new THREE.BoxGeometry(2.6, h, 2.6), mat);
    b.position.set(x, h / 2, z);
    addOutline(b, 0.03);
    world.add(b);
  }
}

function projectsZone() {
  const floor = new THREE.Mesh(new THREE.CircleGeometry(14, 44), createAnimeMaterial('#00e5ff'));
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(getPathX(-145), 0.08, -145);
  addOutline(floor, 0.02);
  world.add(floor);

  const pillarMat = createAnimeMaterial('#6be6ff');
  for (let i = 0; i < 6; i += 1) {
    const a = (i / 6) * Math.PI * 2;
    const z = -145 + Math.sin(a) * 8;
    const x = getPathX(z) + Math.cos(a) * 8;
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 8, 8), pillarMat);
    p.position.set(x, 4, z);
    addOutline(p, 0.02);
    world.add(p);
  }
}

function skillsZone() {
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(3.2, 0), new THREE.MeshBasicMaterial({ color: '#ff00e6', wireframe: true }));
  core.position.set(getPathX(-200), 5, -200);
  world.add(core);

  const orbMat = createAnimeMaterial('#ff4dff');
  const orbiters = [];
  for (let i = 0; i < 10; i += 1) {
    const orb = new THREE.Mesh(new THREE.SphereGeometry(0.48, 12, 12), orbMat);
    orb.userData.angle = (i / 10) * Math.PI * 2;
    orb.userData.radius = 6 + (i % 2);
    orb.userData.core = core;
    addOutline(orb, 0.02);
    world.add(orb);
    orbiters.push(orb);
  }

  scene.userData.orbiters = orbiters;
}

function educationZone() {
  const gold = createAnimeMaterial('#f1c40f');
  const base = new THREE.Mesh(new THREE.BoxGeometry(10, 1.6, 10), gold);
  base.position.set(getPathX(-245), 0.8, -245);
  addOutline(base, 0.02);
  world.add(base);

  for (let i = 0; i < 4; i += 1) {
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 7, 12), gold);
    const sx = i < 2 ? -3 : 3;
    const sz = i % 2 ? -3 : 3;
    col.position.set(getPathX(-245) + sx, 4.8, -245 + sz);
    addOutline(col, 0.02);
    world.add(col);
  }
}

function contactZone() {
  const torus = new THREE.Mesh(new THREE.TorusGeometry(3.8, 0.8, 20, 60), createAnimeMaterial('#00a8ff'));
  torus.position.set(getPathX(-285), 5, -285);
  addOutline(torus, 0.02);
  world.add(torus);

  const streamers = createPoints(600, '#00ffff', { x: 6, y: 18, z: 14 }, -285, getPathX(-285));
  world.add(streamers);
}

function introZone() {
  const platform = new THREE.Mesh(new THREE.CylinderGeometry(6, 7, 1.2, 24), createAnimeMaterial('#5e60ce'));
  platform.position.set(getPathX(-8), 0.6, -8);
  addOutline(platform, 0.02);
  world.add(platform);

  const ring = new THREE.Mesh(new THREE.TorusGeometry(5.4, 0.2, 14, 44), createAnimeMaterial('#00ffff'));
  ring.position.set(getPathX(-8), 2.2, -8);
  ring.rotation.x = Math.PI / 2;
  addOutline(ring, 0.02);
  world.add(ring);
  scene.userData.introRing = ring;
}

function createPoints(count, color, spread, centerZ = -150, centerX = 0) {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    pos[i * 3] = centerX + THREE.MathUtils.randFloatSpread(spread.x);
    pos[i * 3 + 1] = THREE.MathUtils.randFloat(0, spread.y);
    pos[i * 3 + 2] = centerZ + THREE.MathUtils.randFloatSpread(spread.z);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  return new THREE.Points(g, new THREE.PointsMaterial({ color, size: 0.08, transparent: true, opacity: 0.85 }));
}

function buildParticles() {
  world.add(createPoints(1000, '#ffffff', { x: 120, y: 12, z: WORLD_LENGTH + 40 }, -150));
  world.add(createPoints(2000, '#b8c6ff', { x: 500, y: 200, z: 500 }, -150));
}

function populatePanels() {
  const sections = [
    {
      zone: 'Intro',
      html: `<h2>${config.personal.name}</h2><p>${config.personal.title}</p><div class="card-grid">${config.personal.bio.map((t) => `<div class="card">${t}</div>`).join('')}</div><div class="tags">${config.personal.stats.map((s) => `<span>${s}</span>`).join('')}</div>`
    },
    {
      zone: 'About',
      html: `<h2>About</h2><div class="card-grid">${config.personal.bio.map((text) => `<article class="card">${text}</article>`).join('')}</div>`
    },
    {
      zone: 'Experience',
      html: `<h2>Experience</h2><div class="card-grid">${config.experience.map((e) => `<article class="card"><h3>${e.title}</h3><p><strong>${e.company}</strong></p><p>${e.period}</p><p>${e.description}</p></article>`).join('')}</div>`
    },
    {
      zone: 'Projects',
      html: `<h2>Projects</h2><div class="card-grid">${config.projects.map((p) => `<article class="card" style="background:${p.gradient};color:#091225"><h3>${p.emoji} ${p.name}</h3><p>${p.description}</p><div class="tags">${p.tags.map((t) => `<span style='border-color:#243b88'>${t}</span>`).join('')}</div></article>`).join('')}</div>`
    },
    {
      zone: 'Skills',
      html: `<h2>Skills</h2><div class="card-grid">${config.skills.map((s) => `<article class="card"><h3>${s.category}</h3>${s.items.map((i) => `<p>${i.name} — ${i.level}%</p>`).join('')}</article>`).join('')}</div>`
    },
    {
      zone: 'Education',
      html: `<h2>Education</h2>${config.education.map((e) => `<article class="card"><h3>${e.icon} ${e.degree}</h3><p>${e.institution}</p><p>${e.period}</p><p>${e.description}</p></article>`).join('')}`
    },
    {
      zone: 'Contact',
      html: `<h2>${config.contact.greeting}</h2><p>${config.contact.message}</p><div class="card-grid">${config.contact.links.map((l) => `<a class="card" href="${l.url}" target="_blank" rel="noreferrer">${l.icon} ${l.text}</a>`).join('')}</div>`
    }
  ];

  panelRoot.innerHTML = sections.map((s) => `<section class='panel' data-zone='${s.zone}'>${s.html}</section>`).join('');
  dotsRoot.innerHTML = ZONES.map(() => `<span class='dot'></span>`).join('');
}

function updateUI() {
  const progress = Math.abs(currentZ) / WORLD_LENGTH;
  progressLine.style.width = `${Math.min(100, Math.max(0, progress * 100))}%`;
  const active = ZONES.findIndex((z) => currentZ <= z.start && currentZ > z.end);
  const idx = active === -1 ? ZONES.length - 1 : active;
  zoneIndicator.textContent = `Zone: ${ZONES[idx].name}`;
  [...dotsRoot.children].forEach((dot, i) => dot.classList.toggle('active', i === idx));
}

function updateCameraAndCharacter(delta) {
  currentZ = THREE.MathUtils.lerp(currentZ, targetZ, 0.07);

  const pathX = getPathX(currentZ);
  const lookAhead = 6;
  const nextX = getPathX(currentZ - lookAhead);
  characterRig.position.set(pathX, 0, currentZ);
  characterRig.rotation.y = Math.PI + Math.atan2(nextX - pathX, -lookAhead);

  const walk = Math.sin(clock.elapsedTime * 8) * 0.5;
  character.userData.legL.rotation.x = walk;
  character.userData.legR.rotation.x = -walk;
  character.userData.armL.rotation.x = -walk * 0.8;
  character.userData.armR.rotation.x = walk * 0.8;

  const introT = Math.min((performance.now() - introStart) / 2500, 1);
  if (introT < 1) {
    characterRig.position.y = THREE.MathUtils.lerp(50, 0, introT);
    characterRig.rotation.y += delta * 4;
  } else {
    characterRig.position.y = 0;
  }

  const desiredDistance = 15;
  const desiredHeight = 6;
  const camTarget = new THREE.Vector3(
    pathX + Math.sin(cameraYaw) * desiredDistance * Math.cos(cameraPitch),
    desiredHeight + Math.sin(cameraPitch) * desiredDistance,
    currentZ + Math.cos(cameraYaw) * desiredDistance * Math.cos(cameraPitch)
  );

  camera.position.lerp(camTarget, 0.05);
  camera.lookAt(pathX, 3.6, currentZ - 3);
}

function animate() {
  const delta = clock.getDelta();

  if (scene.userData.introRing) {
    scene.userData.introRing.scale.setScalar(1 + Math.sin(clock.elapsedTime * 2.2) * 0.08);
  }
  if (scene.userData.orbiters) {
    scene.userData.orbiters.forEach((orb, i) => {
      orb.userData.angle += delta * (0.7 + i * 0.03);
      const core = orb.userData.core;
      orb.position.set(
        core.position.x + Math.cos(orb.userData.angle) * orb.userData.radius,
        core.position.y + Math.sin(orb.userData.angle * 2) * 1.5,
        core.position.z + Math.sin(orb.userData.angle) * orb.userData.radius
      );
    });
  }

  updateCameraAndCharacter(delta);
  updateUI();
  composer.render();
  requestAnimationFrame(animate);
}

function attachEvents() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  window.addEventListener('scroll', () => {
    const p = maxScroll <= 0 ? 0 : window.scrollY / maxScroll;
    targetZ = -p * WORLD_LENGTH;
  }, { passive: true });

  canvas.addEventListener('pointerdown', (e) => {
    dragging = true;
    previousMouse = { x: e.clientX, y: e.clientY };
  });
  window.addEventListener('pointerup', () => { dragging = false; });
  window.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - previousMouse.x;
    const dy = e.clientY - previousMouse.y;
    previousMouse = { x: e.clientX, y: e.clientY };
    cameraYaw -= dx * 0.005;
    cameraPitch = THREE.MathUtils.clamp(cameraPitch - dy * 0.003, -0.25, 0.55);
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
  });
}

async function init() {
  loadingStatus.textContent = 'Loading profile data';
  config = await fetch('./config.json').then((r) => r.json());
  loaderFill.style.width = '25%';

  loadingStatus.textContent = 'Generating anime materials';
  createGround();
  introZone();
  scatterTrees();
  experienceCity();
  projectsZone();
  skillsZone();
  educationZone();
  contactZone();
  buildParticles();
  loaderFill.style.width = '65%';

  loadingStatus.textContent = 'Building character and UI';
  character = createCharacter();
  characterRig.add(character);
  populatePanels();
  attachEvents();
  loaderFill.style.width = '100%';

  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    loadingScreen.style.pointerEvents = 'none';
    setTimeout(() => loadingScreen.remove(), 450);
  }, 250);

  animate();
}

init();
