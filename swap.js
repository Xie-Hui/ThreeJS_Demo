var json = {
    "A":{
        "title": "This is A",
        "AA":{
            "content": "AAA"
        },
        "AB":{
            "content": "BBB"
        },
        "AC":{
            "content": "CCC"
        }
    }
}

var camera, scene, renderer
var vanishPt
var objects = []
    targets = []
    locations = []

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

function moveCamera( target, duration ) {

    TWEEN.removeAll();

    new TWEEN.Tween( camera.position )
        .to({ x: target.position.x, y: target.position.y, z: target.position.z }, duration )
        .easing( TWEEN.Easing.Exponential.InOut )
        .onUpdate( function(){

            //camera.position.x = objects[0].position.x
            //camera.position.y = objects[0].position.y

        } )
        .start();

}

Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

function createDOM(

    parentNode,
    JsonData = json,  //default

){

    for (var key in JsonData){

        //console.log(key);
        var newNode = document.createElement("div")

        if (JsonData[key] instanceof Object){

            newNode.className = key + "-menu"
            createDOM(newNode, JsonData[key])


            //create a button portal
            var btn = document.createElement("BUTTON")
            btn.className = "myButton"
            btn.textContent = key
            parentNode.appendChild(btn)



        }
        else {

            newNode.className = key
            newNode.textContent = JsonData[key]

        }

        parentNode.appendChild(newNode)

    }

}

function getPosition( depth, index, centerPosition ) {

    var r = 500 / (depth + 1) //radius depend on depth

    //root start from [0,0,0]
    if (depth == 0) {

        return ( [0, 0, 0] )

    }

    return([

        centerPosition[0] + r * Math.sin(Math.radians(index * 120)),  // x
        centerPosition[1] + r * Math.cos(Math.radians(index * 120)),  // y
        centerPosition[2] //z

    ])

}

function createCSSobjs(

    currentNode,
    parentNode,
    parentNode_position = [0, 0, 0],
    nodeDepth = 0,
    nodeIndex = 0

){

    console.log("currentNode: ", currentNode);
    console.log("depth: ", nodeDepth);
    console.log("index: ", nodeIndex);
    var object = new THREE.CSS3DObject(currentNode)

    //update position
    var position = getPosition( nodeDepth, nodeIndex, parentNode_position )
    object.position.x = position[0]
    object.position.y = position[1]
    object.position.z = position[2]
    console.log("position: ", position);
    objects.push(object)
    scene.add( object )
    //

    //set targets
    var object = new THREE.Object3D();
    object.position.x = 1000
    object.position.y = 1000
    object.position.z = 1000
    targets.push( object );


    var children = currentNode.childNodes
    var k = 0
    for ( var i = 0; i < currentNode.childElementCount; i++ ) {

        //console.log( children[ i ] );

        if ( children[ i ].className.indexOf("menu") != -1 ) {

            console.log(children[ i ].className);
            createCSSobjs( children[ i ], currentNode, position, nodeDepth+1, k)
            k++

        }

    }

}

function createCvElements(){

    //tmp = document.createElement("div")
    //tmp.className = "root"
    var container = document.getElementById("container")
    createDOM(container)

    console.log(container.childNodes[2]);
    createCSSobjs(container.childNodes[2], container )

    var btns = document.getElementsByClassName("myButton");
    console.log("myButtons: ", btns);

    console.log("object CLASS:", objects[1].element.className);

    for ( var i = 0; i < btns.length; i++ ) {

        btns[i].addEventListener('click', function() {

            console.log(this.textContent);
            console.log(camera.position);
            console.log("objects: ", objects);

            var targetClass = this.textContent + "-menu"
            for ( var j = 0; j < objects.length; j++ ){

                    var object = objects[ j ]
                    if (object.element.className == targetClass) {

                        var tmp = new THREE.Object3D();
                        tmp.position.x = object.position.x
                        tmp.position.y = object.position.y
                        tmp.position.z = 200
                        moveCamera( tmp, 1000)

                    }

            }

        }, false);

    }

}

function setup() {

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 1000;
	scene = new THREE.Scene();

    //vanishPt = new THREE.Vector3(0,0,-100);
    //camera.lookAt(vanishPt);


    createCvElements()

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
