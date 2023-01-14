import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let scene,
  person,
  head,
  body,
  light,
  sphere1,
  sphere2,
  sphere3,
  plane,
  ambient,
  camera,
  gridHelper,
  axisHelper,
  lightHelper,
  renderer,
  controls,
  width = 500,
  height = 250,
  theta = 0;
// scene ステージ
scene = new THREE.Scene();

// mesh 物体
// -geometry 形状
// -material 材質
// 操作
// -position
// -scale
// -rotation
head = new THREE.Mesh(
  new THREE.BoxGeometry(20, 20, 20),
  new THREE.MeshLambertMaterial({ color: 0xff0000 })
);
head.position.set(0, 40, 0);

body = new THREE.Mesh(
  new THREE.BoxGeometry(40, 60, 40),
  new THREE.MeshLambertMaterial({ color: 0xff0000 })
);
body.position.set(0, 0, 0);

//物体のグループ化
person = new THREE.Group();
person.add(head);
person.add(body);
scene.add(person);

// sphere1
sphere1 = new THREE.Mesh(
  new THREE.SphereGeometry(50, 20, 20),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
sphere1.position.set(100, 0, -150);
scene.add(sphere1);

// sphere2
sphere2 = new THREE.Mesh(
  new THREE.SphereGeometry(50, 50, 50),
  new THREE.MeshLambertMaterial({ color: 0xff0000, wireframe: true })
);
sphere2.position.set(100, 0, 0);
scene.add(sphere2);

// sphere3
sphere3 = new THREE.Mesh(
  new THREE.SphereGeometry(50, 20, 20),
  new THREE.MeshPhongMaterial({ color: 0xff0000 })
);
sphere3.position.set(100, 0, 150);
scene.add(sphere3);

// plane
plane = new THREE.Mesh(
  new THREE.PlaneGeometry(200, 200),
  new THREE.MeshLambertMaterial({ color: 0x0096d6, side: THREE.DoubleSide })
);
plane.position.set(0, 0, 0);
plane.rotation.x = (90 * Math.PI) / 180;
scene.add(plane);

// light
light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 100, 30);
scene.add(light);
ambient = new THREE.AmbientLight(0x404040, 1);
scene.add(ambient);

// camera
camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
camera.position.set(200, 100, 300);
camera.lookAt(scene.position);

// helper
gridHelper = new THREE.GridHelper(500, 20);
scene.add(gridHelper);
axisHelper = new THREE.AxesHelper(1000);
scene.add(axisHelper);
lightHelper = new THREE.DirectionalLightHelper(light, 20);
scene.add(lightHelper);

//renderer
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setClearColor(0xefefef);
renderer.setPixelRatio(window.devicePixelRatio);

//controls
console.log(renderer.domElement);
controls = new OrbitControls(camera, renderer.domElement);
// controls.autoRotate = true;

document.getElementById("stage").appendChild(renderer.domElement);
// renderer.render(scene, camera);
function render() {
  requestAnimationFrame(render);
  // カメラ回転
  // theta += 0.1;
  // camera.position.x = Math.cos(THREE.MathUtils.degToRad(theta)) * 300;
  // camera.position.z = Math.sin(THREE.MathUtils.degToRad(theta)) * 300;
  // camera.lookAt(scene.position);

  // 物体の回転
  // person.rotation.y += 0.01;

  controls.update();
  renderer.render(scene, camera);
}
render();
