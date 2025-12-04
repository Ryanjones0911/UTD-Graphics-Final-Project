import * as THREE from 'three';
import * as Planets from './planets.js';
import * as CameraControls from './cameraControls.js';

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
  // Have target to have camera able to follow with planets
  let followTarget = null;        // the planet the camera should follow
  let followOffset = new THREE.Vector3(0, 0.5, 4); // offset from planet
  // Element to show planet info panel
  const planetInfoPanel = document.createElement('div'); 
  planetInfoPanel.id = 'planet-info-panel';
  planetInfoPanel.style.position = 'fixed';
  planetInfoPanel.style.bottom = '400px';
  planetInfoPanel.style.right = '10px';
  planetInfoPanel.style.width = '400px';
  planetInfoPanel.style.padding = '10px';
  planetInfoPanel.style.background = 'rgba(0,0,0,0.7)';
  planetInfoPanel.style.color = 'white';
  planetInfoPanel.style.fontFamily = 'monospace';
  planetInfoPanel.style.fontSize = '25px';
  planetInfoPanel.style.borderRadius = '20px';
  planetInfoPanel.style.display = 'none'; // Hidden by default
  planetInfoPanel.style.zIndex = '1000';
  document.body.appendChild(planetInfoPanel);

  //Stored planet info:
  const planetData = {
  Sun: {
    mass: '1.989 × 10^30 kg',
    radius: '696,340 km',
    orbitalPeriod: 'N/A',
    type: 'Star'
  },
  Mercury: {
    mass: '3.30 × 10^23 kg',
    radius: '2,440 km',
    orbitalPeriod: '87.97 days',
    type: 'Terrestrial'
  },
  Venus: { 
    mass: '4.86 x 10^24 kg',
    radius: '6,052 km',
    orbitalPeriod: '224.7 days',
    type: 'Terrestrial'
  },
  Earth: { 
    mass: '5.97 x 10^24 kg',
    radius: '6,371 km',
    orbitalPeriod: '365.25 days',
    type: 'Terrestrial'
  }, 
  Moon: { 
    mass: '7.35 × 10^22 kg',
    radius: '1,737 km',
    orbitalPeriod: '29.53 days',
    type: 'Terrestrial'
  },
  Mars: { 
    mass: '6.42 x 10^23 kg',
    radius: '3,389 km',
    orbitalPeriod: '686.98 days',
    type: 'Terrestrial'
  },
  Jupiter: { 
    mass: '1.9 x 10^27 kg',
    radius: '69,911 km',
    orbitalPeriod: '4,332.59 days',
    type: 'Gas giant'
  },
  Saturn: { 
    mass: '5.68 x 10^26',
    radius: '58,232 km',
    orbitalPeriod: '10,755.7 days',
    type: 'Gas giant'
  },
  Uranus: { 
    mass: '8.68 x 10^25 kg',
    radius: '25,362 km',
    orbitalPeriod: '30,688.5 days',
    type: 'Ice giant'
  },
  Neptune: { 
    mass: '1.02 x 10^26 kg',
    radius: '24,622 km',
    orbitalPeriod: '60,195 days',
    type: 'Ice giant'
  },
};

  //create some planets
  const planets = [];

  const sun = Planets.createBody(scene, 5, 0.8, 0, 0, 0, 'assets/sun.jpg', {
    emissive: 0xffaa33,
    emissiveIntensity: 1.5,
    transparent: true,
    opacity: 1
  })
  planets.push(sun);



  const mercury = Planets.createBody(scene, 5, 0.038, 1.5, 0, 0, 'assets/mercury.jpg');
  planets.push(mercury);

  const venus = Planets.createBody(scene, 5, 0.095, 2.2, 0, 0, 'assets/venus.jpg');
  planets.push(venus);

  const earth = Planets.createBody(scene, 5, 0.1, 3.0, 0, 0, 'assets/8k_earth_daymap.jpg');
  planets.push(earth);

  // Add Earth's Moon
  const moon = Planets.createBody(scene, 0.1, 0.037, 3.25, 0, 0, 'assets/moon.jpg');
  moon.earthOrbit = { radius: 0.35, angle: 0, speed: 0.1 };
  planets.push(moon);

  const mars = Planets.createBody(scene, 5, 0.053, 3.8, 0, 0, 'assets/mars6ksurface.jpg');
  planets.push(mars);

  // Create asteroid belt between Mars and Jupiter
  const asteroids = Planets.createAsteroidBelt(scene, 5.0, 6.5, 500);

  const jupiter = Planets.createBody(scene, 5, 0.35, 7.5, 0, 0, 'assets/jupiter.jpg');
  planets.push(jupiter);

  const saturn = Planets.createBody(scene, 5, 0.30, 12.0, 0, 0, 'assets/saturn.jpg');
  planets.push(saturn);

  // Add Saturn's rings
  Planets.createSaturnRings(scene, saturn);

  const uranus = Planets.createBody(scene, 5, 0.15, 18.0, 0, 0, 'assets/uranus.jpg');
  planets.push(uranus);

  const neptune = Planets.createBody(scene, 5, 0.14, 24.0, 0, 0, 'assets/neptune.jpg');
  planets.push(neptune);

  // Add labels for all planets
  const sunLabel = Planets.createLabel('Sun', sun.position, scene);
  sunLabel.text = 'Sun';
  const mercuryLabel = Planets.createLabel('Mercury', mercury.position, scene);
  mercuryLabel.text = 'Mercury';
  const venusLabel = Planets.createLabel('Venus', venus.position, scene);
  venusLabel.text = 'Venus';
  const earthLabel = Planets.createLabel('Earth', earth.position, scene);
  earthLabel.text = 'Earth';
  const moonLabel = Planets.createLabel('Moon', moon.position, scene);
  moonLabel.text = 'Moon';
  const marsLabel = Planets.createLabel('Mars', mars.position, scene);
  marsLabel.text = 'Mars';
  const jupiterLabel = Planets.createLabel('Jupiter', jupiter.position, scene);
  jupiterLabel.text = 'Jupiter';
  const saturnLabel = Planets.createLabel('Saturn', saturn.position, scene);
  saturnLabel.text = 'Saturn';
  const uranusLabel = Planets.createLabel('Uranus', uranus.position, scene);
  uranusLabel.text = 'Uranus';
  const neptuneLabel = Planets.createLabel('Neptune', neptune.position, scene);
  neptuneLabel.text = 'Neptune';

  // Track planet-label pairs for updating positions
  const planetLabels = [
    { planet: sun, label: sunLabel },
    { planet: mercury, label: mercuryLabel },
    { planet: venus, label: venusLabel },
    { planet: earth, label: earthLabel },
    { planet: moon, label: moonLabel },
    { planet: mars, label: marsLabel },
    { planet: jupiter, label: jupiterLabel },
    { planet: saturn, label: saturnLabel },
    { planet: uranus, label: uranusLabel },
    { planet: neptune, label: neptuneLabel }
  ];
  Planets.createOrbitLine(scene, mercury.orbitRadius);
  Planets.createOrbitLine(scene, venus.orbitRadius);
  Planets.createOrbitLine(scene, earth.orbitRadius);
  Planets.createOrbitLine(scene, mars.orbitRadius);
  Planets.createOrbitLine(scene, jupiter.orbitRadius);
  Planets.createOrbitLine(scene, saturn.orbitRadius);
  Planets.createOrbitLine(scene, uranus.orbitRadius);
  Planets.createOrbitLine(scene, neptune.orbitRadius);

  // Define orbital speeds (inner planets faster, outer planets slower)
  const orbitalSpeeds = {
    mercury: 0.04,
    venus: 0.015,
    earth: 0.01,
    mars: 0.008,
    jupiter: 0.002,
    saturn: 0.0009,
    uranus: 0.0004,
    neptune: 0.0001
  };

  mercury.speed = orbitalSpeeds.mercury;
  venus.speed = orbitalSpeeds.venus;
  earth.speed = orbitalSpeeds.earth;
  mars.speed = orbitalSpeeds.mars;
  jupiter.speed = orbitalSpeeds.jupiter;
  saturn.speed = orbitalSpeeds.saturn;
  uranus.speed = orbitalSpeeds.uranus;
  neptune.speed = orbitalSpeeds.neptune;


  //handle mouse clicking on planets
  window.addEventListener('mousedown', onMouseDown);
  function onMouseDown(event) {
  //calculate mouse position in normalized device coordinates (-1 to +1)
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(planets);
  if (intersects.length > 0) { //If mouse on planet
    const planet = intersects[0].object;

    // Set planet as follow target
    const planetEntry = planetLabels.find(entry => entry.planet === planet);

    if (planetEntry) {
      const name = planetEntry.label.text;  // get the attached name
      const data = planetData[name];

      if (data) {
        planetInfoPanel.innerHTML = `
          <div style="text-align: center; font-weight: bold; font-size: 30px; margin-bottom: 6px;">
            ${name}
          </div>
          <div>
            Type: ${data.type}<br>
            Mass: ${data.mass}<br>
            Radius: ${data.radius}<br>
            Orbital Period: ${data.orbitalPeriod}
          </div>
        `;
        planetInfoPanel.style.display = 'block';
      }
    }

    // Set follow target
    followTarget = planet;
  }

}
//Allow to stop following a planet by hitting escape
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    followTarget = null;//Reset follow target to null when esc pressed
    planetInfoPanel.style.display = 'none';//reset planet info panel as well
    console.log("Camera follow stopped");
  }
});



  // Sun as primary light source
  const sunLight = new THREE.PointLight(0xffffff, 2.5, 100);
  sunLight.position.set(0, 0, 0);  // Fixed at Sun's center
  scene.add(sunLight);

  // Gentle ambient light for night-side visibility
  scene.add(new THREE.AmbientLight(0xffffff, 0.15));

  //throw in a temp light
  const light = new THREE.PointLight(0xffffff, 100, 100);
  light.position.set(0, 0, 0);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xffffff, 1))

  function animate() {
    // Rotate planets on their axes
    sun.rotation.y += .002;
    earth.rotation.y += .002;
    mars.rotation.y += .002;
    jupiter.rotation.y += .001;
    saturn.rotation.y += .001;

    // Orbital motion for all planets except Sun
    [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune].forEach(planet => {
      if (planet.speed) {
        planet.orbitAngle += planet.speed;
        planet.position.x = Math.cos(planet.orbitAngle) * planet.orbitRadius;
        planet.position.z = Math.sin(planet.orbitAngle) * planet.orbitRadius;
      }

      // Update rings if they exist (Saturn)
      if (planet.rings) {
        planet.rings.position.copy(planet.position);
      }
    });

    // Moon orbits Earth
    if (moon.earthOrbit) {
      moon.earthOrbit.angle += moon.earthOrbit.speed;
      moon.position.x = earth.position.x + Math.cos(moon.earthOrbit.angle) * moon.earthOrbit.radius;
      moon.position.z = earth.position.z + Math.sin(moon.earthOrbit.angle) * moon.earthOrbit.radius;
    }

    // Move asteroids
    asteroids.forEach(asteroid => {
      asteroid.orbitAngle += asteroid.speed;
      asteroid.position.x = Math.cos(asteroid.orbitAngle) * asteroid.orbitRadius;
      asteroid.position.z = Math.sin(asteroid.orbitAngle) * asteroid.orbitRadius;
    });

    // Update label positions
    planetLabels.forEach(({ planet, label }) => {
      label.position.copy(planet.position);
      label.position.y += 0.4;
    });
    // For camera following target:
    if (followTarget) {
      // Sets the desired position using follow target and offset
      const desiredPosition = new THREE.Vector3().copy(followTarget.position).add(followOffset);
      camera.position.lerp(desiredPosition, 0.05); // 0.05 = smoothing factor

      // Always look at the planet
      CameraControls.changeCameraTarget(controls, followTarget.position);
    }

    CameraControls.updateCamera(controls);
    renderer.render(scene, camera);
  }
  renderer.setAnimationLoop(animate);
}

main();
