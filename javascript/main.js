import * as THREE from 'three';
import * as Planets from './planets.js';

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

  //let's try to get a (really quite bad) camera control system
  document.addEventListener("keydown", onKeyDown)
  function onKeyDown(event) {
    var key = event.key
    if (key == "w") {
      camera.position.y += 1;
    }
    if (key == "s") {
      camera.position.y -= 1;
    }
    if (key == "a") {
      camera.position.x -= 1;
    }
    if (key == "d") {
      camera.position.x += 1;
    }
    if (key == "q") {
      camera.position.z -= 1;
    }
    if (key == "e") {
      camera.position.z += 1;
    }
    //rotation
    if (key == "ArrowLeft") {
      camera.rotation.y += .1;
    }
    if (key == "ArrowRight") {
      camera.rotation.y -= .1;
    }
    if (key == "ArrowDown") {
      camera.rotation.x -= .1;
    }
    if (key == "ArrowUp") {
      camera.rotation.x += .1;
    }
    if (key == ",") {
      camera.rotation.z -= .1;
    }
    if (key == ".") {
      camera.rotation.z += .1;
    }
  }

  camera.position.z = 8;

  const sun = Planets.createBody(scene, 5, 1, 0, 0, 0, 'assets/8k_sun.jpg', {
    emissive: 0xffaa33,
    emissiveIntensity: .8,
    transparent: true,
    opacity: 1
  })

  const earth = Planets.createBody(scene, 5, .09168, 2, 0, 0, 'assets/8k_earth_daymap.jpg');

  const mars = Planets.createBody(scene, 5, .0488, 2.5, 0, 0, 'assets/mars6ksurface.jpg', {
    //color: 0xff0000
  });

  //throw in a temp light
  const light = new THREE.PointLight(0xffffff, 100, 100);
  light.position.set(0, 0, 0);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xffffff, 1));



  function animate() {
    sun.rotation.y += .002;
    earth.rotation.y += .002;
    mars.rotation.y += .002;




    renderer.render(scene, camera);
  }
  renderer.setAnimationLoop(animate);
}

main();
