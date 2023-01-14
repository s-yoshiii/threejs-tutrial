import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
let scene,
  box,
  camera,
  renderer,
  controls,
  loader,
  width = 1200,
  height = 900;
const drawFunction = () => {
  // scene ステージ
  scene = new THREE.Scene();

  // camera
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
  camera.position.set(200, 100, 300);
  camera.lookAt(scene.position);

  // texture
  loader = new THREE.TextureLoader();
  loader.load("./assets/logo_s02.png", function (texture) {
    createBox(texture);
    render();
  });

  function createBox(texture) {
    box = new THREE.Mesh(
      new THREE.BoxGeometry(50, 50, 50),
      new THREE.MeshBasicMaterial({ map: texture })
    );
    box.position.set(0, 0, 0);
    scene.add(box);
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
};
drawFunction();
