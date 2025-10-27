import * as THREE from 'three';

export function createBody(currScene, mass, radius, x, y, z, texture = null, options = {}) {
  var bodyTexture = null;
  if (texture != null) {
    bodyTexture = new THREE.TextureLoader().load(texture);
  }


  const bodyGeo = new THREE.SphereGeometry(radius);
  const bodyMat = new THREE.MeshPhongMaterial({
    map: bodyTexture,
    ...options
    //this will be replaced with custom shaders at some point in the future 
  })

  const body = new THREE.Mesh(bodyGeo, bodyMat);

  body.position.set(x, y, z);

  currScene.add(body);
  return body;

}

