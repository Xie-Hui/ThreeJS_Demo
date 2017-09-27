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

function transform(position, target, duration){
    TWEEN.removeAll();
    //move camera to starting location
    new TWEEN.Tween(position)
        .to(target, duration )
        .easing( TWEEN.Easing.Exponential.InOut )
        .onUpdate(function(){
            camera.position.x = position.x
            camera.position.y = position.y
            camera.position.z = position.z
        })
        .start();
}

function createCvElements(){
    //create the css obj for container 1
    c1 = document.getElementById("container-1")
    var object = new THREE.CSS3DObject(c1);

    object.position.x = 0;
    object.position.y = 0;
    object.position.z = -200;
    scene.add( object );

    //create the css obj for container 1
    c2 = document.getElementById("container-2")
    console.log(c2);
    var object = new THREE.CSS3DObject(c2);
    object.position.x = 0;
    object.position.y = 0;
    object.position.z = -200;
    scene.add( object );

    position = {
        x: 0,
        y: 0,
        z: 1000
    }
    target = {
        x: -200,
        y: 0,
        z: 1000
    }

    c1.addEventListener("click", function(){
        console.log("Click-A");
        transform(position, target, 1000);
    }, false)

    position = {
        x: 0,
        y: 0,
        z: 1000
    }
    target = {
        x: 200,
        y: 0,
        z: 1000
    }

    c2.addEventListener("click", function(){
        console.log("Click-B");
        transform(position, target, 1000);
    }, false)

}

function setup(){

    camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;
    //camera.fov = 10;
    scene = new THREE.Scene();
    vanishPt = new THREE.Vector3(0,0,1000);
    camera.lookAt(vanishPt);
    renderer = new THREE.CSS3DRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild(renderer.domElement);
    //document.getElementById( 'container' ).appendChild( renderer.domElement );

    scene.add( camera );

    //createParticles();
    createCvElements();
}


function animate() {
    requestAnimationFrame( animate );
    TWEEN.update();
    render();
}

function render() {
    //particleUpdate();
    renderer.render( scene, camera );
    //rendererWebgl.render( sceneWebgl, camera );
    //cameraWander();
}
