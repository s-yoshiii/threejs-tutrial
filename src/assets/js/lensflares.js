import * as THREE from "three";
import { FlyControls } from "three/examples/jsm/controls/FlyControls";
import {
  Lensflare,
  LensflareElement,
} from "three/examples/jsm/objects/Lensflare";
import Stats from "three/examples/jsm/libs/stats.module";

class lensFlares {
  constructor() {
    this.container = null;
    this.stats = null;
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.controls = null;
    this.delta = null;

    this.init();
    this.animate();
  }
  setup() {
    // setup
    this.container = document.getElementById("stage");
    this.clock = new THREE.Clock(true);
    // scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color().setHSL(0.51, 0.4, 0.01);
    this.scene.fog = new THREE.Fog(this.scene.background, 3500, 15000);
  }
  cameraSetup() {
    // camera
    this.camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      1,
      15000
    );
    this.camera.position.z = 250;
  }
  helper() {
    // helper
    const axes = new THREE.AxesHelper(250);
    this.scene.add(axes);
  }
  createMesh() {
    // geometry
    const size = 250;
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: 0xffffff, //鏡面反射
      shininess: 50, //輝度
    });
    //立方体を2500個生成
    for (let i = 0; i < 2500; i++) {
      const mesh = new THREE.Mesh(geometry, material);

      //位置をランダムに決める
      mesh.position.x = 8000 * (2.0 * Math.random() - 1.0);
      mesh.position.y = 8000 * (2.0 * Math.random() - 1.0);
      mesh.position.z = 8000 * (2.0 * Math.random() - 1.0);

      //回転度合をランダムに決める
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      mesh.rotation.z = Math.random() * Math.PI;

      mesh.matrixAutoUpdate = false; //自動で行列計算されるのを制御する
      mesh.updateMatrix(); //手動で行列更新する。

      this.scene.add(mesh);
    }
  }
  createLight() {
    // 平行光線
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.03);
    dirLight.position.set(0, -1, 0).normalize(); //Y軸下方向から光源が出てる。
    dirLight.color.setHSL(0.1, 0.7, 0.5);
    this.scene.add(dirLight);
    this.addLight(0.08, 0.3, 0.9, 0, 0, -1000);
  }
  setTexture() {
    // レンズフレア
    const textureLoader = new THREE.TextureLoader();
    const textureFlare = textureLoader.load("/assets/img/LensFlare.png");
  }
  setRender() {
    // renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.container.appendChild(this.renderer.domElement);
  }
  controlsSet() {
    // controles
    this.controls = new FlyControls(this.camera, this.renderer.domElement);
    this.controls.movementSpeed = 2500;
    this.controls.domElement = this.container;
    this.controls.rollSpeed = Math.PI / 20;
    this.controls.autoForward = false;
    this.controls.dragToLook = false;
  }
  setStats() {
    // stats
    this.stats = new Stats();
    this.container.appendChild(this.stats.dom);
  }
  listeners() {
    // リサイズしたら自動でウインドウをリサイズする
    window.addEventListener("resize", this.onWindowResize);
  }
  addLight(h, s, l, x, y, z) {
    const light = new THREE.PointLight(0xffffff, 1.5, 2000); //色、強さ、減衰
    light.color.setHSL(h, s, l);
    light.position.set(x, y, z);
    this.scene.add(light);

    const lensflare = new Lensflare();
    lensflare.addElement(
      new LensflareElement(this.textureFlare, 700, 0, light.color)
    );
    light.add(lensflare);
  }
  onWindowResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }
  animate() {
    requestAnimationFrame(() => this.animate());
    this.render();
    this.stats.update();
  }
  render() {
    const delta = this.clock.getDelta();
    this.controls.update(delta);
    this.renderer.render(this.scene, this.camera);
  }
  init() {
    this.setup();
    this.cameraSetup();
    this.helper();
    this.createMesh();
    this.createLight();
    this.setTexture();
    this.setRender();
    this.controlsSet();
    this.setStats();
    this.listeners();
  }
}

new lensFlares();
