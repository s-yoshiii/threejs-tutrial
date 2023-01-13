import * as THREE from "three";

let scene,
  box,
  light,
  ambient,
  camera,
  gridHelper,
  axisHelper,
  lightHelper,
  renderer,
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
box = new THREE.Mesh(
  new THREE.BoxGeometry(50, 50, 50),
  new THREE.MeshLambertMaterial({ color: 0xff0000 })
);
box.position.set(0, 0, 0);
box.scale.x = 2;
box.rotation.x = (45 * Math.PI) / 180;
scene.add(box);

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
gridHelper = new THREE.GridHelper(200, 20);
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

document.getElementById("stage").appendChild(renderer.domElement);
renderer.render(scene, camera);
// function render() {
//   requestAnimationFrame(render);
//   // カメラ回転
//   theta += 0.1;
//   camera.position.x = Math.cos(THREE.MathUtils.degToRad(theta)) * 300;
//   camera.position.z = Math.sin(THREE.MathUtils.degToRad(theta)) * 300;
//   camera.lookAt(scene.position);

//   // 物体の回転
//   box.rotation.y += 0.01;
//   renderer.render(scene, camera);
// }
// render();
