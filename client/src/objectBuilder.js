const THREE = require('three');

const LoadTexture = function LoadTexture(texturePath) {
  return new THREE.TextureLoader().load(texturePath);
};

const MeshLambertMaterial = function MeshLambertMaterial(texturePath) {
  return new THREE.MeshLambertMaterial({map: LoadTexture(texturePath)})
};
const RedBall = function RedBall() {
  const redBall = new THREE.TextureLoader().load( 'textures/redball2.jpg' );
  redBall.wrapS = THREE.RepeatWrapping;
  redBall.wrapT = THREE.RepeatWrapping;
  redBall.repeat.set( 1, 1 );
  return redBall;
}
const redBallMaterial = new THREE.MeshLambertMaterial( {map: RedBall()} );
const playerMaterial = new THREE.MeshPhongMaterial({ color: 'red' });
const metalCrateMaterial = MeshLambertMaterial('textures/metalcratesm.jpg');
const questionCrateMaterial = MeshLambertMaterial('textures/questioncrate.jpg');
const woodCrateMaterial = MeshLambertMaterial('textures/woodcratesm.jpg');
const ancientCrateMaterial = MeshLambertMaterial('textures/ancientcrate.jpg');






const BoxGeometry = function BoxGeometry(size) {
  return new THREE.BoxGeometry(size.width, size.height, size.depth);
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
    quaternion.w = quaternion.w || quaternion._w || 0;
    quaternion.x = quaternion.x || quaternion._x || 0;
    quaternion.y = quaternion.y || quaternion._y || 0;
    quaternion.z = quaternion.z || quaternion._z || 0;
    mesh.quaternion.copy(quaternion);
  }
}

const volumeOf = function volumeOf(size) {
  return size.width * size.height * size.depth;
}

module.exports = {
  grassFloor: function(size, position, quaternion) { // {width, depth, segments}, {x, y, z}, {w, x, y, z}
    const grass = new THREE.TextureLoader().load( 'textures/grass-repeating4.jpg' );
    grass.wrapS = THREE.RepeatWrapping;
    grass.wrapT = THREE.RepeatWrapping;
    grass.repeat.set( 40, 40 );
    const geometry = BoxGeometry( size );
    const material = new THREE.MeshLambertMaterial({ map: grass });
    const mesh = new THREE.Mesh(geometry, material);
    addShadow(mesh);
    initPosition(mesh, position, quaternion);
    mesh.userData.name = 'grassFloor'
    mesh.userData.mass = 0;
    return mesh;
  },
  metalCrate: function(size, position, quaternion) {
    const mesh = new THREE.Mesh(BoxGeometry(size), metalCrateMaterial);
    addShadow(mesh);
    initPosition(mesh, position, quaternion);
    mesh.userData.name = 'metalCrate';
    mesh.userData.mass = volumeOf(size) * 10;
    return mesh;
  },
  questionCrate: function(size, position, quaternion) {
    const mesh = new THREE.Mesh(BoxGeometry(size), questionCrateMaterial);
    addShadow(mesh);
    initPosition(mesh, position, quaternion);
    mesh.userData.name = 'questionCrate';
    mesh.userData.mass = volumeOf(size) * 1;
    return mesh;
  },
  woodCrate: function(size, position, quaternion) {
    const mesh = new THREE.Mesh(BoxGeometry(size), woodCrateMaterial);
    addShadow(mesh);
    initPosition(mesh, position, quaternion);
    mesh.userData.name = 'woodCrate';
    mesh.userData.mass = volumeOf(size) * 5;
    return mesh;
  },
  ancientCrate: function(size, position, quaternion) {
    const mesh = new THREE.Mesh(BoxGeometry(size), ancientCrateMaterial);
    addShadow(mesh);
    initPosition(mesh, position, quaternion);
    mesh.userData.name = 'ancientCrate';
    mesh.userData.mass = volumeOf(size) * 100;
    return mesh;
  },
  playerModel: function(position, quaternion) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const mesh = new THREE.Mesh(geometry, playerMaterial);
    initPosition(mesh, position, quaternion);
    addShadow(mesh);
    mesh.userData.name = 'playerModel';
    return mesh;
  },
  redBall: function(size, position, quaternion) {
    let redBall = redBall;
    const geometry = new THREE.SphereGeometry( size.radius, size.widthSegments, size.heightSegments );
    const mesh = new THREE.Mesh( geometry, redBallMaterial );
    addShadow(mesh);
    initPosition(mesh, position, quaternion);
    mesh.userData.name = 'redBall';
    return mesh;
  },
  sidePanel: function(size, position, quaternion) {
    let yquat = new THREE.Quaternion();
    yquat.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 6);
    // let zquat = new THREE.Quaternion();
    // zquat.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 4);
    // let quat = yquat.multiply(zquat);
    console.log(yquat)
    let texture = new THREE.TextureLoader().load( 'textures/futuretile.jpg' );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 15, 2.5/3 );
    let material = new THREE.MeshLambertMaterial({});
    let mesh = new THREE.Mesh(BoxGeometry(size), material);
    initPosition(mesh, position);
    mesh.userData.name = 'sidePanel';
    mesh.rotation.x = - Math.PI / 6; //(30degrees)
    addShadow(mesh);
    mesh.userData.mass = 0;
    return mesh;
  },
  scoreBoardPole: function(size, position, quaternion) {
    const material = new THREE.MeshLambertMaterial({ color: new THREE.Color( 0x0e1c33 )  });
    const cylinder = new THREE.CylinderGeometry(.1, .1, 12, 10, 10, false);
    let mesh = new THREE.Mesh(cylinder, material);
    addShadow(mesh);
    initPosition(mesh, position, quaternion);
    mesh.userData.name = 'scoreBoardPole';
    mesh.userData.mass = 0;
    mesh.rotation.x = - Math.PI / 6; //(30degrees)
    return mesh;
  },
  scoreBoard: function(size, position, quaternion) {
    let texture = new THREE.TextureLoader().load( 'textures/futuretile.jpg' );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 9/4 , 1 );
    let material = new THREE.MeshPhongMaterial({ map: texture, transparent: true, opacity: .8  });
    let mesh = new THREE.Mesh(BoxGeometry(size), material);
    initPosition(mesh, position, quaternion);
    mesh.userData.name = 'scoreBoard';
    addShadow(mesh);
    mesh.userData.mass = 0;
    return mesh;
  },
  text: function(cb, fontPath, text, color, size, position, quaternion) {
    const quat = new THREE.Quaternion();
    quat.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);
    let loader = new THREE.FontLoader();
    loader.load( fontPath, function(font) {
      size.font = font;
      const geometry = new THREE.TextGeometry(text, size);
      const material = new THREE.MeshPhongMaterial({ color: color,  transparent: true, opacity: 1  });
      let mesh = new THREE.Mesh(geometry, material);
      initPosition(mesh, position, quat);
      mesh.userData.name = 'text';
      addShadow(mesh);
      mesh.userData.mass = 0;
      cb(mesh);
    });
  }
}

// var loader = new THREE.FontLoader();
// let font = loader.load( 'Arial_Regular.json', function(font) {
//   geometry = new THREE.TextGeometry("5", { font: font, size: 1.3, height: .06, curveSegments: 3})
//   material = new THREE.MeshPhongMaterial({ color: 'yellow',  transparent: true, opacity: 1  });
//   mesh = new THREE.Mesh(geometry, material);
//   mesh.position.x = -22.3;
//   mesh.position.y = 6.3;
//   mesh.position.z = 2.9;
//   mesh.rotation.y = Math.PI / 2;
//   scene.add(mesh);

//   geometry = new THREE.TextGeometry("5", { font: font, size: 1.3, height: .06, curveSegments: 3})
//   material = new THREE.MeshPhongMaterial({ color: 'yellow',  transparent: true, opacity: 1  });
//   mesh = new THREE.Mesh(geometry, material);
//   mesh.position.x = -22.3;
//   mesh.position.y = 6.3;
//   mesh.position.z = -1.9;
//   mesh.rotation.y = Math.PI / 2;
//   scene.add(mesh);

//   geometry = new THREE.TextGeometry("2:51", { font: font, size: .8, height: .06, curveSegments: 3})
//   material = new THREE.MeshPhongMaterial({ color: 'yellow',  transparent: true, opacity: 1  });
//   mesh = new THREE.Mesh(geometry, material);
//   mesh.position.x = -22.3;
//   mesh.position.y = 8.3;
//   mesh.position.z = 1.1;
//   mesh.rotation.y = Math.PI / 2;
//   scene.add(mesh);
// });


// futureTile = new THREE.TextureLoader().load( 'textures/scoreboard.png' );
// // futureTile.wrapS = THREE.RepeatWrapping;
// // futureTile.wrapT = THREE.RepeatWrapping;
// // futureTile.repeat.set( 9/4 , 1 );
// geometry = new THREE.BoxGeometry(9, 0.1, 4);
// material = new THREE.MeshPhongMaterial({ map: futureTile,  transparent: true, opacity: 1 });
// mesh = new THREE.Mesh(geometry, material);
// mesh.position.y = 7.5;
// mesh.position.x = -22.3;
// mesh.receiveShadow = true;
// mesh.rotation.x = - Math.PI / 2;
// mesh.rotation.z = Math.PI / 2;
// scene.add(mesh);

