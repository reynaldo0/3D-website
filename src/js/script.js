import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from 'dat.gui'

//canvas
const canvas = document.getElementById("canvas");

//renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();

//object dan material
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
});

//menyatukan box elemen dengan material
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

// Membuat dataran
const planeGeometry = new THREE.PlaneGeometry(30,30)
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xFFFFFF,
  side : THREE.DoubleSide
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(plane)

plane.rotation.x = -0.5 * Math.PI

const sphereGeometry = new THREE.SphereGeometry(4, 50, 60)
const sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0x0000FF
})

const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.position.set (-10, 10, 0)
scene.add(sphere)

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


//untuk menampilkan grid pada layar
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

//membuat kamera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(-10, 10, 30);

//untuk orbit
const orbit = new OrbitControls(camera, canvas);

//update posisi orbit
orbit.update();


// Render Element
const gui = new dat.GUI();

const options = {
  sphereColor: '#ffea00',
  wireframe:  false,
  speed: 0.01,
};

gui.addColor(options, 'sphereColor').onChange(function(e){
  sphere.material.color.set(e);
})

gui.add(options, 'wireframe').onChange((e) =>{
  sphere.material.wireframe = e
})

gui.add(options, 'speed', 0.01)


let step = 0
function animate(time) {
  box.rotation.x = time / 1000
  box.rotation.y = time / 1000
  renderer.render(scene, camera); 

  step += options.speed
  sphere.position.y = 10 * Math.abs(Math.sin(step))
}

renderer.setAnimationLoop(animate);
