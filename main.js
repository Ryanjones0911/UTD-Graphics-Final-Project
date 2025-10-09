import * as THREE from 'three';

function main() {
    //let's just get a sphere on screen
    
    //simple camera

    const cameraAttributes = {
        fov: 75,
        aspectRatio: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 1000
    }

    const camera = new THREE.PerspectiveCamera(cameraAttributes.fov, cameraAttributes.aspectRatio, cameraAttributes.near, cameraAttributes.far);
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x202030);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //define materials for it
    function newSphere(radius, color, x, y, z) {
    const geometry = new THREE.SphereGeometry(radius);
    const material = new THREE.MeshPhongMaterial({color});
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(x,y,z)
    scene.add(sphere);
    return sphere;
    }

    const sphere = newSphere(2, 0x00ff00, 0, 0, 0);
    const sphere2 = newSphere(.4, 0xffffff, 6, 0, 0);
    camera.position.z = 5;

    //throw in a temp light
    const light = new THREE.DirectionalLight(0xffffff,2);
    light.position.set(5,5,5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, .2));


    function animate() {
        sphere.rotation.x += 2;

        renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);
}

main();