/* 
Mess #1: Gravity

Falling ball with a trail, will always drop in the center, clicking to the right or left or center will have it fall at at angle. 
*/ 

// Tunable variables
let trailLength = 500;  // Length of the trail in pixels
let gravity = 0.5;     // Strength of gravity
let maxHorizontalVelocity = 5; // Maximum initial horizontal velocity

// Circle properties
let circleRadius = 30;
let x, y;
let velocityX = 0;
let velocityY = 0;
let damping = 0.8;     // Energy loss on bounce
let circleColor; // color of the ball 

// Trail array
let trail = [];

// Flag to check if the ball has been launched
let launched = false;

function setup() {
  createCanvas(500, 500);
  circleColor = color(255, 153, 153); 
}

function draw() {
  background(220);
  
  if (launched) {
    // Update physics
    velocityY += gravity;
    x += velocityX;
    y += velocityY;
    
    // Check for vertical bounce
    if (y + circleRadius > height) {
      y = height - circleRadius;
      velocityY *= -damping;
    }
    
    // Check for horizontal bounce
    if (x - circleRadius < 0 || x + circleRadius > width) {
      velocityX *= -damping;
      x = constrain(x, circleRadius, width - circleRadius);
    }
    
    // Add current position to trail
    trail.push({x: x, y: y});
    
    // Remove old trail points if trail is too long
    if (trail.length > trailLength) {
      trail.shift();
    }
    
    // Draw trail
    noFill();
    beginShape();
    for (let i = 0; i < trail.length; i++) {
      let alpha = map(i, 0, trail.length, 0, 255);
      stroke(red(circleColor), green(circleColor), blue(circleColor), alpha);
      vertex(trail[i].x, trail[i].y);
    }
    endShape();
    
    // Draw circle
    fill(circleColor);
    noStroke();
    ellipse(x, y, circleRadius * 2);
    
    // Stop the animation when the ball comes to rest
    if (abs(velocityY) < 0.1 && abs(velocityX) < 0.1 && y > height - circleRadius - 1) {
      noLoop();
    }
  }
}

function mousePressed() {
  // Initialize the ball at the click position
  x = constrain(mouseX, circleRadius, width - circleRadius);
  y = constrain(mouseY, circleRadius, height - circleRadius);
  
  // Calculate initial horizontal velocity based on distance from center
  let distanceFromCenter = mouseX - width / 2;
  velocityX = map(distanceFromCenter, -width/2, width/2, -maxHorizontalVelocity, maxHorizontalVelocity);
  
  // Reset vertical velocity
  velocityY = 0;
  
  // Clear the trail
  trail = [];
  
  // Set launched flag to true
  launched = true;
  
  // Ensure the draw loop is running
  loop();
}
