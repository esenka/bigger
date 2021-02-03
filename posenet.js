let video;
let poseNet;
let poses = [];
var rightEyeIMG, leftEyeIMG, whitePicture;

function setup() {
  const canvas = createCanvas(640, 480); // or use to make fullscreen canvas window.innerWidth, window.innerHeight, but you should to change the formula in changeFontSize()
  canvas.parent('videoContainer');
  
  //Load image: important step, image won't appear without loading.
  rightEyeIMG = loadImage('https://cdn.glitch.com/b621021f-2430-4043-8d8e-3de7ca679c13%2Frighteye.svg?v=1564643209875');
  leftEyeIMG = loadImage('https://cdn.glitch.com/b621021f-2430-4043-8d8e-3de7ca679c13%2Flefteye.svg?v=1564642997442');
  whitePicture = loadImage('https://cdn.glitch.com/b621021f-2430-4043-8d8e-3de7ca679c13%2Fbackground.png?v=1564543059126');


  // Video capture
  video = createCapture(VIDEO);
  video.size(width, height);
  
  if (video == true) {console.log('true');}

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
    
  });
  
  // Hide the video element, and just show the canvas
  video.hide();
}

function draw() {
  //We use white picture as background. You can comment this line and see what will happen. It's cool glitch effect.
  image(whitePicture, 0, 0, width, height);
  
  //Also, you can use image(video, 0, 0, width, height); instead of using a white picture. It will show your amazing face.

  drawEyes();
  changeFontSize(); 
}

function modelReady(){
  select('#text').html('Hmm... What is it? It’s time to move! AI has turned on. You can insert your text here.')
}

var rightEye, leftEye, distanceEye, defaultEyePosition = [];
// A function to draw ellipses over the detected keypoints
function drawEyes()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    console.log()
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      rightEye = pose.keypoints[2].position;
      leftEye = pose.keypoints[1].position;

      //Get to know distance between two eyes.
      distanceEye = Math.round(Math.sqrt(Math.pow((leftEye.x - rightEye.x), 2) + Math.pow((leftEye.y - rightEye.x), 2)));
      console.log(distanceEye);
      
      //Position of eyes when a human opens experiment page. Start position.
      while(defaultEyePosition.length < 1) {
        defaultEyePosition.push(distanceEye);
      }
      
      // Only draw an eye is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2 ) {
        image(rightEyeIMG, rightEye.x, rightEye.y);
        image(leftEyeIMG, leftEye.x, leftEye.y);
      }
    }
  }
}

var fontSize;
function changeFontSize() {
  //I use Math.round, divide and multiply by 6 to make font size multiple to two. 
  //Font will jump without it because ML Model detects every motion.
  //The formula ((0.25 / distanceEye) * 19000) makes font size smaller if a face is closer to a computer and vice versa
  //Change 19000 if you want make the font bigger or smaller
  fontSize = Math.round(((0.25 / distanceEye) * 19000)/6)*6;
  document.getElementById('text').style.fontSize = fontSize + 'px';
}

//4 is too jumpy
//8 is too big
//Maybe, 6?