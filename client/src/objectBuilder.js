const THREE = require('three');

const BoxGeometry = function BoxGeometry(size) {
  return new THREE.BoxGeometry(size.width, size.height, size.depth);
};

const LoadTexture = function LoadTexture(texturePath) {
  return new THREE.TextureLoader().load(texturePath);
};

const MeshLambertMaterial = function MeshLambertMaterial(texturePath) {
  return new THREE.MeshLambertMaterial({map: LoadTexture(texturePath)})
};

const addShadow = function addShadow(mesh) {
  mesh.castShadow = true;
  mesh.receiveShadow = true;
}

const initPosition = function initPosition(mesh, position, quaternion) {
  if (position) {
    mesh.position.copy(position);
  }
  if (quaternion) {
    quaternion.w = quaternion._w;
    quaternion.x = quaternion._x;
    quaternion.y = quaternion._y;
    quaternion.z = quaternion._z;
    mesh.quaternion.copy(quaternion);
  }
}

const volumeOf = function volumeOf(size) {
  return size.width * size.height * size.depth;
}

module.exports = {
  grassFloor: function(size, position, quaternion) { // {width, height, depth}, {x, y, z}, {w, x, y, z}
    const grass = new THREE.TextureLoader().load( 'textures/grass-repeating4.jpg' );
    grass.wrapS = THREE.RepeatWrapping;
    grass.wrapT = THREE.RepeatWrapping;
    grass.repeat.set( 40, 40 );
    const geometry = BoxGeometry(size);
    const material = new THREE.MeshLambertMaterial({ map: grass });
    const mesh = new THREE.Mesh(geometry, material);
    addShadow(mesh);
    initPosition(mesh, position, quaternion);
    mesh.userData.name = 'grassFloor'
    mesh.userData.mass = 0;
    return mesh;
  },
  metalCrate: function(size, position, quaternion) {
    const mesh = new THREE.Mesh(BoxGeometry(size), MeshLambertMaterial('textures/metalcratesm.jpg'));
    addShadow(mesh);
    initPosition(mesh, position, quaternion);
    mesh.userData.name = 'metalCrate';
    mesh.userData.mass = volumeOf(size);
    return mesh;
  },
  questionCrate: function(size, position, quaternion) {
    const mesh = new THREE.Mesh(BoxGeometry(size), MeshLambertMaterial('textures/questioncrate.jpg'));
    addShadow(mesh);
    initPosition(mesh, position, quaternion);
    mesh.userData.name = 'questionCrate';
    mesh.userData.mass = volumeOf(size);
    return mesh;
  },
  woodCrate: function(size, position, quaternion) {
    const mesh = new THREE.Mesh(BoxGeometry(size), MeshLambertMaterial('textures/woodcratesm.jpg'));
    addShadow(mesh);
    initPosition(mesh, position, quaternion);
    mesh.userData.name = 'woodCrate';
    mesh.userData.mass = volumeOf(size);
    return mesh;
  },
  ancientCrate: function(size, position, quaternion) {
    const mesh = new THREE.Mesh(BoxGeometry(size), MeshLambertMaterial('textures/ancientcrate.jpg'));
    addShadow(mesh);
    initPosition(mesh, position, quaternion);
    mesh.userData.name = 'ancientCrate';
    mesh.userData.mass = volumeOf(size);
    return mesh;
  },
  playerModel: function(position, quaternion) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 'red' });
    const mesh = new THREE.Mesh(geometry, material);
    initPosition(mesh, position, quaternion);
    addShadow(mesh);
    mesh.userData.name = 'playerModel';
    return mesh;
  }
}