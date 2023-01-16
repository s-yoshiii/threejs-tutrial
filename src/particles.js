import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
let scene,
  camera,
  renderer,
  controls,
  particles,
  loader,
  width = 1200,
  height = 900;
// scene ステージ
scene = new THREE.Scene();

// camera
camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
camera.position.set(100, 100, 100);
camera.lookAt(scene.position);

// particles
loader = new THREE.TextureLoader();
loader.load("./assets/star.png", function (texture) {
  createParticles(texture);
  render();
});
function createParticles(texture) {
  let pGeometry,
    pMaterial,
    vertices,
    count = 100;
  pGeometry = new THREE.BufferGeometry();
  vertices = new Float32Array(count * 3);
  for (let i = 0; i < vertices.length; i += 3) {
    let x = Math.random() * 200 - 100;
    let y = Math.random() * 200 - 100;
    let z = Math.random() * 200 - 100;
    vertices[i] = x;
    vertices[i + 1] = y;
    vertices[i + 2] = z;
    pGeometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
  }
  pMaterial = new THREE.PointsMaterial({
    map: texture,
    size: 32,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthTest: false,
  });
  particles = new THREE.Points(pGeometry, pMaterial);
  scene.add(particles);
}

//renderer
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);

//controls
controls = new OrbitControls(camera, renderer.domElement);

document.getElementById("stage").appendChild(renderer.domElement);
// renderer.render(scene, camera);
function render() {
  requestAnimationFrame(render);
  particles.rotation.y += 0.001;
  controls.update();
  renderer.render(scene, camera);
}
// render();
