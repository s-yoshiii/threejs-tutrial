import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
let scene,
  light,
  ambient,
  camera,
  renderer,
  controls,
  count = 200,
  i,
  size,
  box,
  mouse = new THREE.Vector2(-2, -2),
  width = 1200,
  height = 900;
// scene ステージ
scene = new THREE.Scene();

// camera
camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
camera.position.set(200, 100, 300);
camera.lookAt(scene.position);

// light
light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 100, 30);
scene.add(light);
ambient = new THREE.AmbientLight(0x404040, 1);
scene.add(ambient);

// picking
for (i = 0; i < count; i++) {
  size = Math.random() * 20 + 10;
  box = new THREE.Mesh(
    new THREE.BoxGeometry(size, size, size),
    new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff })
  );
  box.position.set(
    Math.random() * 200 - 100,
    Math.random() * 200 - 100,
    Math.random() * 200 - 100
  );
  scene.add(box);
}

// マウス座標を取得
// WebGLの座標系に変換してみよう
document.addEventListener("mousemove", (e) => {
  let rect = e.target.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
  mouse.y = ((e.clientX - rect.top) / height) * -1 * 2 + 1;
});

//renderer
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setClearColor(0xefefef);
renderer.setPixelRatio(window.devicePixelRatio);

//controls
controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;

document.getElementById("stage").appendChild(renderer.domElement);
// renderer.render(scene, camera);
function render() {
  let raycaster = new THREE.Raycaster();
  let objs;

  requestAnimationFrame(render);
  // マウスから3D空間に光線を射出
  raycaster.setFromCamera(mouse, camera);
  //光線にあたった物体を取得、操作
  objs = raycaster.intersectObjects(scene.children);
  if (objs.length > 0) {
    objs[0].object.material.emissive = new THREE.Color(0x999999);
  }

  controls.update();
  renderer.render(scene, camera);
}
render();
