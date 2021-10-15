var circles;
var spots;
var img;
//p5.js starter function
function preload() {
img = loadImage('files/helloworld.png');
  
}
var newimg = documentgetElementbyId("image");

//another important function of p5.js
function setup() {
  createCanvas(newimg.naturalWidth, newimg.naturalHeight);
  var density = displayDensity();
  pixelDensity(1);
  img.loadPixels();
  spots = [];
  circles = [];
  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      var index = x + y * img.width;
      var c = img.pixels[index * 4];
      var b = brightness([c]);
      if (b > 1) {
        spots.push(createVector(x, y)); //createVector: p5.js function to create a 2d or 3d vector according to passed parameters.
      }
    }
  }

  console.log(img.width);
  console.log(img.height);
  console.log('pixels', img.pixels.length);
  console.log('spots', spots.length);
  console.log(density);
}
//p5.js draw function
function draw() {
  background(0);
  // frameRate(20)

  var total = 10;
  var count = 0;
  var attempts = 0;

  while (count < total) {
    var newC = newCircle();
    if (newC !== null) {
      circles.push(newC);
      count++;
    }
    attempts++;
    if (attempts > 10) {
      noLoop();
      console.log('finished');
      break;
    }
  }

  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];

    if (circle.growing) {
      if (circle.edges()) {
        circle.growing = false;
      } else {
        for (var j = 0; j < circles.length; j++) {
          var other = circles[j];
          if (circle !== other) {
            var d = dist(circle.x, circle.y, other.x, other.y);
            var distance = circle.r + other.r;

            if (d - 5 < distance) {
              circle.growing = false;
              break;
            }
          }
        }
      }
    }

    circle.show();
    circle.grow();
  }
}

function newCircle() {
  var r = int(random(0, spots.length));
  var spot = spots[r];
  var x = spot.x;
  var y = spot.y;

  var valid = true;
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];
    var d = dist(x, y, circle.x, circle.y);
    if (d < circle.r) {
      valid = false;
      break;
    }
  }
  if (valid) {
    return new Circle(x, y);
  } else {
    return null;
  }
}

function processNewFile(file_list){
  let file = file_list[0];
  console.log(URL.createObjectURL(file))
  img = loadImage(URL.createObjectURL(file));
  setup();
}


const fileInput = document.getElementById('image');

fileInput.addEventListener('change', (e) => processNewFile(e.target.files));
