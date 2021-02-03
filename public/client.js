// P5.JS + ML5.JS PART
//🎨🖌🖼.js + 🤖🚜🚗.js

//💧🦄🦄🦄 means detection rotation part
//💚💚💚💧 means acid green tears part

let video;
let poseNet;
let poses = [];
var started = false, tearBrush;
var modelready = false;

//💚💚💚💧
var isthereface = true;
var numbermultyply2 = 0;
let seed = 0;
//💚💚💚💧

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Div");
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on("pose", function(results) {
    poses = results;
    // console.log(poses);
  });
  video.hide();
  noLoop();
  
  //💚💚💚💧
  seed = random(10000);
  //💚💚💚💧
}

function videoMetamorphosis() {
  if (started == true) {
    noLoop();
    started = false;
    document.getElementById('start').innerHTML = 'start play play start start start start';
  } else if (started == false) {
    loop();
    started = true;
    document.getElementById('start').innerHTML = 'stop please stop it stop stop stoppp';
  }
}

function draw() {
  drawKeypoints();
    if (started && modelready) {
      document.getElementById('descriptionText').innerHTML = 'try move your head and leave your computer alone';
    }
  
  //💚💚💚💧
  if (!isthereface) {
    drawAcidGreenTears();
  } 
  if (isthereface){
    clear();
    // seed = random(20000);
    randomSeed(seed);
  }
  //💚💚💚💧
}

function modelReady() {
  // if (started) { 
    // document.getElementById('descriptionText').innerHTML = 'try move your head and leave your computer alone';
  // }
  modelready = true;
}

var rightEye,
  leftEye,
  rightEar,
  leftEar,
  nose,
  rightShoulder,
  leftShoulder,
  rightWrist,
  leftWrist,
  rightKnee,
  leftKnee,
  rightAnkle,
  leftAnkle,
  distanceEye,
  defaultRightEyePosition = [],
  defaultLeftEyePosition = [],
  distanceLeftEarNose,
  distanceRightEarNose,
  side,
  distanceBetweenTwoEars,
  distanceGeneralForEachEar,
  rotationPercent;

var currentRotation = 0;
var oldRotation = 0;
var rotationSpeed = 0;
var rotationUpdated = false;
var rotationAnimationSpeed = 10; // 10 is fast, 30 is slow

var rot = 1;
function drawKeypoints() {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      // if (keypoint.score > 0.2) {
      rightEye = pose.keypoints[2].position;
      leftEye = pose.keypoints[1].position;

      rightEar = pose.keypoints[4].position;
      leftEar = pose.keypoints[3].position;

      if (keypoint.score > 0.4) {
        nose = pose.keypoints[0].position;
        // isthereface = true;
      }
      
      //💧🦄🦄🦄 Read explonation on https://miroru.glitch.me/
      distanceLeftEarNose = Math.round(
        Math.sqrt(
          Math.pow(leftEar.x - nose.x, 2) + Math.pow(leftEar.y - nose.y, 2)
        )
      );
      
      distanceRightEarNose = Math.round(
        Math.sqrt(
          Math.pow(rightEar.x - nose.x, 2) + Math.pow(rightEar.y - nose.y, 2)
        )
      );

      distanceBetweenTwoEars = distanceLeftEarNose + distanceRightEarNose;
      distanceGeneralForEachEar = distanceBetweenTwoEars / 2;
      oldRotation = rotationPercent;
      rotationPercent = (distanceLeftEarNose * 100) / distanceGeneralForEachEar;
      rotationSpeed =
        (rotationPercent - currentRotation) / rotationAnimationSpeed;
      //💧🦄🦄🦄
      // console.log(currentRotation);
      // console.log('LEFT ' + distanceLeftEarNose+'  RIGHT ' + distanceRightEarNose+ '    GENERAL'+ distanceGeneralForEachEar);
      // console.log(rotationPercent);

      if (distanceLeftEarNose > distanceRightEarNose) {
        side = "RIGHT";
      } else if (distanceLeftEarNose < distanceRightEarNose) {
        side = "LEFT";
      }
      
      if (side === "RIGHT") {
        rot = 0.02;
      } else {
        rot = -0.02;
      }
      
      //💚💚💚💧
      // rightEye.score ≺ 0.2 && leftEye.score ≺ 0.2
      if (pose.keypoints[2].score < 0.2 && pose.keypoints[1].score < 0.2) {
        console.log('noface');
        isthereface = false;
      }
      // rightEye.score ≻ 0.5 && leftEye.score ≻ 0.5
      if (pose.keypoints[2].score > 0.5 && pose.keypoints[1].score > 0.5) {
        console.log('fase');
        isthereface = true;
      }
      //💚💚💚💧
      
    }
  }
}

//💚💚💚💧
function drawAcidGreenTears() {
  var ypos = 20, xpos1 = 40, xpos2 = 100; 
  randomSeed(seed);
  noStroke();
  fill(66, 250, 0);
  ypos = (window.innerHeight * 35)/100;
  xpos1 = (window.innerWidth * 30)/100;
  xpos2 = (window.innerWidth * 36)/100;
        
  if (numbermultyply2 < 20 * 2) {
    //the bigger this numbermultyply2 the faster speed of drawing tears
    numbermultyply2 += 3;
  }

  for (let g = 0; g < numbermultyply2; g++) {
    ypos = ypos + 5;
    xpos1 += random(-5, 5);
    xpos2 += random(-5, 5);
    ellipse(xpos1, ypos, 20, 20);
    ellipse(xpos2, ypos, 20, 20);
  }
  // filter(BLUR, 1);
  // setTimeout(clearTears, 5000);
}

// function clearTears() {
//   clear();
//   randomSeed(seed);
// }
//💚💚💚💧

var renderer,
  scene,
  camera,
  myCanvas = document.getElementById("myCanvas");

//RENDERER
renderer = new THREE.WebGLRenderer({
  canvas: myCanvas,
  antialias: true,
  alpha: true
});
var cam = new THREE.PerspectiveCamera(18, window.innerWidth / window.innerHeight, 0.1, 1000);
renderer.setClearColor( 0x000000, 0 );
renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize(window.innerWidth/1.2, window.innerHeight/1.2);
renderer.setSize(window.innerWidth, window.innerHeight);
cam.position.z = 1;
//CAMERA
camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//SCENE
scene = new THREE.Scene();

//LIGHTS
// var light = new THREE.AmbientLight(0xfa00ff, 0.5);
var light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

var light2 = new THREE.PointLight(0xffffff, 0.4);
scene.add(light2);

var light3 = new THREE.PointLight(0x098000, 0.8);
scene.add(light3);
camera.add(light3);

scene.add( new THREE.AmbientLight( 0x040404 ) );

var loader = new THREE.GLTFLoader();

loader.load(
  "https://cdn.glitch.com/be4e0882-abe9-46e4-bdcf-b0fd11d076d8%2Fsmall%20david.glb?v=1579495202135",
  handle_load
);

var mesh;

function handle_load(gltf) {
  console.log(gltf);
  mesh = gltf.scene;
  console.log(mesh.children[0]);
  // mesh.children[0].material = new THREE.MeshLambertMaterial();
  mesh.children[0].material = new THREE.MeshPhongMaterial({color: 0xffffff});
  scene.add(mesh);
  mesh.position.z = -10;
  mesh.position.x = -0.8;
  mesh.position.y = -0.4;
}
function err (error) { console.error(error); }

//RENDER LOOP
var delta = 0;
var prevTime = Date.now();

function render() {
  requestAnimationFrame(render);
  delta += 0.1;

  if (mesh) {
    // mesh.rotation.y += 0.01;
    if(!isthereface) {
      // currentRotation = 0;
      mesh.rotation.y = THREE.Math.degToRad(90);
    }
    //💧🦄🦄🦄
  currentRotation += rotationSpeed;
  mesh.rotation.y = THREE.Math.degToRad(currentRotation * 0.5);
    //💧🦄🦄🦄
    
    //animation mesh
    // mesh.morphTargetInfluences[ 0 ] = Math.sin(delta) * 20.0;
  }

  renderer.render(scene, cam);
}

render();
