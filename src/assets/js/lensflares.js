import * as THREE from "three";
import { Clock } from "three";
import { FlyControls } from "three/examples/jsm/controls/FlyControls";

class lensFlares {
  constructor() {
    this.canvas = null;
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.geometry = null;
    this.material = null;
    this.dirlight = null;
    this.clock = null;
    this.controls = null;
    this.delta = null;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.init();
  }
  createScene() {
    this.camera = new THREE.PerspectiveCamera(
      40,
      this.width / this.height,
      1,
      15000
    );
    this.scene = new THREE.Scene();
    const size = 250;
    this.geometry = new THREE.BoxGeometry(size, size, size);
    this.material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: 0xfffffff,
      shininess: 50,
    });
    for (let i = 0; i < 2500; i++) {
      const mesh = new THREE.Mesh(this.geometry, this.material);
      mesh.position.x = 8000 * (2.0 * Math.random() - 1.0);
      mesh.position.y = 8000 * (2.0 * Math.random() - 1.0);
      mesh.position.z = 8000 * (2.0 * Math.random() - 1.0);
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      mesh.rotation.z = Math.random() * Math.PI;
      this.scene.add(mesh);
    }
    this.dirlight = new THREE.DirectionalLight(0xffffff, 0.03);
    this.scene.add(this.dirlight);
    this.addLight(0.08, 0.3, 0.9, 0, 0, -1000);
  }
  addLight(h, s, l, x, y, z) {
    const light = new THREE.PointLight(0xffffff, 1.5, 2000);
    light.color.setHSL(h, s, l);
    light.position.set(x, y, z);
    this.scene.add(light);
  }
  render() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.width, this.height);
    this.canvas = this.renderer.domElement;
    document.getElementById("stage").appendChild(this.canvas);
  }
  mouse() {
    this.clock = new Clock();
    this.controls = new FlyControls(this.camera, this.canvas);
  }
  animate() {
    requestAnimationFrame(this.animate);
    this.delta = this.clock.getDelta();
    this.controls.update(this.delta);
    this.renderer.render(this.scene, this.camera);
  }
  init() {
    this.createScene();
    this.render();
    this.mouse();
    this.animate();
  }
}

new lensFlares();
