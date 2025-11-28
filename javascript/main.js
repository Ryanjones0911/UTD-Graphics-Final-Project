import * as THREE from 'three';
import * as Planets from './planets.js';
import * as CameraControls from './cameraControls.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

function main() {
  //let's just get a sphere on screen
  //NOTE: may be a good idea to give objects their own files

  //simple camera
  const cameraAttributes = {
    fov: 80,
    aspectRatio: window.innerWidth / window.innerHeight,
    near: 0.1,
    far: 1000
  }

  const camera = new THREE.PerspectiveCamera(cameraAttributes.fov, cameraAttributes.aspectRatio, cameraAttributes.near, cameraAttributes.far);
  const scene = new THREE.Scene();


  const bg = new THREE.TextureLoader().load('assets/8k_stars_milky_way.jpg');
  scene.background = bg;

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);


  camera.position.z = 8;

  const controls = CameraControls.controlsInit(camera, renderer.domElement);

  //create some planets
  const planets = [];

  const sun = Planets.createBody(scene, 5, 1, 0, 0, 0, 'assets/8k_sun.jpg', {
    emissive: 0xffaa33,
    emissiveIntensity: .8,
    transparent: true,
    opacity: 1
  })
  planets.push(sun);

  

  const mercury = Planets.createBody(scene, 5, .035, 1.3, 0, 0);
  planets.push(mercury);

  const venus = Planets.createBody(scene, 5, .0869, 1.6, 0, 0);
  planets.push(venus);

  const earth = Planets.createBody(scene, 5, .09168, 2, 0, 0, 'assets/8k_earth_daymap.jpg');
  planets.push(earth);

  const mars = Planets.createBody(scene, 5, .0488, 2.5, 0, 0, 'assets/mars6ksurface.jpg', {
    //color: 0xff0000
  });
  planets.push(mars);

  const jupiter = Planets.createBody(scene, 5, .1028, 4.2, 0, 0);
  planets.push(jupiter);

  const saturn = Planets.createBody(scene, 5, .0866, 8.5, 0, 0);
  planets.push(saturn);

  const uranus = Planets.createBody(scene, 5, .0367, 17, 0, 0);
  planets.push(uranus);

  const neptune = Planets.createBody(scene, 5, .0355, 28, 0, 0);
  planets.push(neptune);


  //handle mouse clicking on planets
  window.addEventListener('mousedown', onMouseDown);
  function onMouseDown(event) {
    //calculate mouse position in normalized device coordinates
    //(-1 to +1) for both components
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(planets);
    if (intersects.length > 0) {
      console.log("Clicked on planet at position: ", intersects[0].object.position);
      CameraControls.changeCameraTarget(controls, intersects[0].object.position);
    }
  }

  //throw in a temp light
  const light = new THREE.PointLight(0xffffff, 100, 100);
  light.position.set(0, 0, 0);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xffffff, 1));




  function animate() {
    sun.rotation.y += .002;
    earth.rotation.y += .002;
    mars.rotation.y += .002;

    CameraControls.updateCamera(controls);
    renderer.render(scene, camera);
  }
  renderer.setAnimationLoop(animate);
}

main();
