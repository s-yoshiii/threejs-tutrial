import { render } from "sass";
import * as THREE from "three";

let scene,
  box,
  camera,
  renderer,
  width = 500,
  height = 250;
// scene ステージ
scene = new THREE.Scene();

// mesh 物体
// -geometry 形状
// -material 材質
box = new THREE.Mesh(
  new THREE.BoxGeometry(50, 50, 50),
  new THREE.MeshLambertMaterial({ color: 0xff000 })
);
box.position.set(0, 0, 0);
scene.add(box);

// camera
camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
camera.position(200, 100, 300);
camera.lookAt(scene.position);

//renderer
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
