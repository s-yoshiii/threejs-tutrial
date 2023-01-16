import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
let scene,
  text,
  camera,
  renderer,
  controls,
  loader,
  width = 1200,
  height = 900;
// scene ステージ
scene = new THREE.Scene();

// camera
camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
camera.position.set(200, 100, 300);
camera.lookAt(scene.position);

// texture
loader = new FontLoader();
loader.load("./assets/Roboto_Regular.json", function (font) {
  createText(font);
  render();
});

function createText(font) {
  text = new THREE.Mesh(
    new TextGeometry("S-YOSHII", {
      font: font,
      size: 24,
      height: 8,
    }),
    new THREE.MeshBasicMaterial({ color: 0x39800, side: THREE.DoubleSide })
  );
  text.position.set(-80, 0, 0);
  scene.add(text);
}

//renderer
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setClearColor(0xefefef);
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
