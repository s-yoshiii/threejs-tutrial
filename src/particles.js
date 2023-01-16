import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
let scene,
  box,
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
  let pGeometry, pMaterial, count, i;
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
  controls.update();
  renderer.render(scene, camera);
}
// render();
