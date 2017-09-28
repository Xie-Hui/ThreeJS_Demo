var camera, scene, renderer
var vanishPt
var objects = []
    targets = []

var sceneWebgl, rendererWebgl;

window.onload = function(){
    setup();
    animate();
}

function transform(targets, duration){

    TWEEN.removeAll();
    //move camera to starting location
    for ( i = 0; i < objects.length; i++ ) {

        var object = objects[i]
        var target = targets[i]

        new TWEEN.Tween( object.position )
            .to({ x: target.position.x, y: target.position.y, z: target.position.z }, duration )
            .easing( TWEEN.Easing.Exponential.InOut )
            .onUpdate( function(){

                //camera.position.x = objects[0].position.x
                //camera.position.y = objects[0].position.y

            } )
            .start();

    }

    new TWEEN.Tween( this )
            .to( {}, duration * 2 )
            .onUpdate( render )
            .start();

}

function createCvElements(){
    //create the css obj for container 1

}

function setup(){

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 1500;
	scene = new THREE.Scene();

    //vanishPt = new THREE.Vector3(0,0,-100);
    //camera.lookAt(vanishPt);
    //create the css obj for container 1
    c1 = document.createElement("div")
    c1.className = "element"
    c1.textContent = "AAAA"
    var object = new THREE.CSS3DObject(c1);
    console.log(c1);

    object.position.x = -100;
    object.position.y = 0;
    object.position.z = 1000;

    objects.push(object)
    scene.add( object )

    //create the css obj for container 1
    c2 = document.createElement("div")
    c2.className = "element"
    c2.textContent = "BBB"
    console.log(c2);
    var object = new THREE.CSS3DObject(c2);
    object.position.x = 100;
    object.position.y = 0;
    object.position.z = 1000;
    scene.add( object );
    objects.push(object);
    targets[0] = objects[1]
    targets[1] = objects[0]
    console.log(objects);
    console.log(targets);
    console.log(objects[0].position, objects[1].position);
    position = (0, 0, 100)
    target = (-100, 0, 100)

    c1.addEventListener("click", function(){
        console.log("Click-A");
        transform(targets, 1000);

    }, false)

    position = (0, 0, 100)
    target = (100, 0, 100)

    c2.addEventListener("click", function(){
        console.log("Click-B");
        transform(targets, 1000);
    }, false)

    renderer = new THREE.CSS3DRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.domElement.style.position = 'absolute';
	document.getElementById( 'container' ).appendChild( renderer.domElement );

    //createParticles();
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
