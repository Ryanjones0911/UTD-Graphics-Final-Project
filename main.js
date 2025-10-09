import * as THREE from 'three';

function main() {
    //let's just get a sphere on screen
    
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

    //define materials for it
    function newSphere(radius, color, texture = null, x, y, z, options = {}) {
    const geometry = new THREE.SphereGeometry(radius);
    const material = new THREE.MeshPhongMaterial({
        map: texture,
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(x,y,z)
    scene.add(sphere);
    return sphere;
    }
    
    const sunTexture = new THREE.TextureLoader().load('assets/8k_sun.jpg');
    const earthTexture = new THREE.TextureLoader().load('assets/8k_earth_daymap.jpg');
    const sun = newSphere(2, 0x00ff00, sunTexture, 0, 0, 0, {emissive: 0xffaa33, emissiveIntensity: 1000000000});
    const earth = newSphere(.4, 0xffffff, earthTexture, 6, 0, 0);
    camera.position.z = 5;

    //throw in a temp light
    const light = new THREE.PointLight(0xffffff,100,100);
    light.position.set(0,0,0);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, .4));


    function animate() {
        sun.rotation.y += .002;
        earth.rotation.y += .002;


        renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);
}

main();