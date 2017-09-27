var camera, scene, renderer;
var fixcamera;
var controler;
var cameraHelper;
var activecamera;
var vanishPt;

var sceneWebgl, rendererWebgl;

window.onload = function(){
    setup();
    animate();
}

function createCvElements(){
    //create the css obj for container 1
    c1 = document.getElementById("container-1")
    var object = new THREE.CSS3DObject(c1);
    object.position.x = 0;
    object.position.y = 0;
    object.position.z = 0;
    scene.add( object );

    //create the css obj for container 1
    c2 = document.getElementById("container-2")
    var object = new THREE.CSS3DObject(c2);
    object.position.x = 100;
    object.position.y = 0;
    object.position.z = 0;
    scene.add( object );

}

function setup(){

    camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 7500;
    //camera.fov = 10;
    scene = new THREE.Scene();
    vanishPt = new THREE.Vector3(0,0,6000);
    camera.lookAt(vanishPt);
    renderer = new THREE.CSS3DRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = 0;
    document.body.appendChild(renderer.domElement);
    //document.getElementById( 'container' ).appendChild( renderer.domElement );

    scene.add( camera );

    //createParticles();
    createCvElements();

    window.addEventListener( 'resize', onWindowResize, false );
    //window.addEventListener( 'mousewheel', mousewheel, false );
}


function animate() {
    requestAnimationFrame( animate );
    //TWEEN.update();
    render();
}

function render() {
    //particleUpdate();
    renderer.render( scene, camera );
    //rendererWebgl.render( sceneWebgl, camera );
    //cameraWander();
}
