//copied from fiddle i was given https://jsfiddle.net/pj5qx081/29/

var renderer, scene, camera, controls;

// init();
// animate();

function init() {

  // renderer
  renderer = new THREE.WebGLRenderer();
  document.body.appendChild(renderer.domElement);
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';

  // scene
  scene = new THREE.Scene();

  // camera
  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(20, 20, 20);

  // controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);

  var light = new THREE.HemisphereLight(0xeeeeee, 0x888888, 1);
  light.position.set(0, 20, 0);
  scene.add(light);

  // material
  var material = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    flatShading: THREE.FlatShading,
    polygonOffset: true,
    polygonOffsetFactor: 1, // positive value pushes polygon further away
    polygonOffsetUnits: 1
  });


  // dot example
  var dotGeometry = new THREE.BufferGeometry();
  var dotVertices = new Float32Array([
		4.0, 4.0,  0.0
	]);
	dotGeometry.setAttribute('position', new THREE.BufferAttribute(dotVertices, 3));
  
  var dotMaterial = new THREE.PointsMaterial({
    size: 1,
    sizeAttenuation: true
  });
  var dot = new THREE.Points(dotGeometry, dotMaterial);
  scene.add(dot);
  
  var sphereGeo = new THREE.SphereGeometry( 4 );
  const sphereMat = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
  const sphere = new THREE.Mesh( sphereGeo, sphereMat )
  sphere.translateZ(4.0);
  /* sphere.position.set(0, 0, 4); */
  scene.add( sphere );
	/* var thing = getCenterPoint(sphere)
	  console.log('yoooooo', thing); */

}
//Trying to use the getCenter() function to see exactly where my sphere was.
//Taken from https://stackoverflow.com/questions/38305408/threejs-get-center-of-object
//Realised that it will always show the initial sphere location when you add it (0,0,0), even after it updates it on screen.
//Had to make fucntions async, to show the coordinates of the sphere after it was moved to (0,0,4)
/* function getCenterPoint(mesh) {
    var geo = mesh.geometry;
    geo.computeBoundingBox();
    var center = new THREE.Vector3();
    geo.boundingBox.getCenter( center );
    mesh.localToWorld( center );
    return center;
} */


function animate() {
  requestAnimationFrame(animate);

  var width = renderer.domElement.clientWidth;
  var height = renderer.domElement.clientHeight;
  
  renderer.setPixelRatio(1);

  renderer.setSize(renderer.domElement.clientWidth, renderer.domElement.clientHeight, false);

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
}

