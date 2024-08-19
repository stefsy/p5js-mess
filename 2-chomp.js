// p5.js code for a looping mouth animation... CHOMP CHOMP! 

// Declare all the variables at the beginning of the file for clarity and ease of adjustment
let yellowBallDiameter = 300; // Diameter of the yellow ball
let redBallDiameter = 50; // Diameter of the red ball inside the mouth
let cutAngle = 30; // Angle of the mouth cut in degrees
let maxCutAngle; // The maximum angle in radians (calculated later)
let angleStep = 0.02; // Speed of opening/closing animation (step size for angle increment)
let currentAngle = 0; // Current angle of the cut
let direction = 1; // Direction of movement (1 for opening, -1 for closing)

let centerX, centerY; // Center coordinates of the yellow ball

function setup() {
  createCanvas(600, 600); // Set up the canvas size
  centerX = width / 2; // Calculate the center X coordinate
  centerY = height / 2; // Calculate the center Y coordinate
  
  maxCutAngle = radians(cutAngle); // Convert cut angle to radians for trigonometric functions
}

function draw() {
  background(255); 
  drawYellowMouth();
  updateMouthAngle();
  drawRedBall();
  drawEyebrow();
  drawEye();
}

// Function to draw the yellow mouth with a cut
// issue, flashes white when it's fully open! something wrong with fill of the cut when mouth closes? 
function drawYellowMouth() {
  // Draw the entire yellow circle first
  fill(255, 204, 0); // Yellow color
  noStroke(); // No border
  ellipse(centerX, centerY, yellowBallDiameter); // Draw the yellow ball
  
  // Draw the "cut" using the same background color to cover part of the yellow circle
  fill(255); // Same as background color
  arc(centerX, centerY, yellowBallDiameter, yellowBallDiameter, 
      -maxCutAngle + currentAngle, maxCutAngle - currentAngle, PIE);
}

// Function to update the angle and direction of the mouth's opening and closing
function updateMouthAngle() {
  // Increment or decrement the angle based on the current direction
  currentAngle += angleStep * direction;
  
  // Reverse direction when the mouth reaches fully open or fully closed state
  if (currentAngle >= maxCutAngle || currentAngle <= 0) {
    direction *= -1; // Reverse the direction
  }
}

// Function to draw the red ball inside the mouth
function drawRedBall() {
  // Calculate the horizontal position of the red ball
  let redBallX = centerX + (yellowBallDiameter / 2 - redBallDiameter / 2 + 80) * cos(currentAngle);
  
  // Set the vertical position of the red ball to be centered vertically
  let redBallY = centerY;
  
  // Draw the red ball
  fill(255, 0, 0); // Red color
  noStroke(); // No border for the red ball
  ellipse(redBallX, redBallY, redBallDiameter); // Draw the red ball as an ellipse
}

// Function to draw the grumpy eyebrow
function drawEyebrow() {
  push(); // Save the current transformation matrix
  fill(0); // Black color
  
  let eyebrowWidth = 120;
  let eyebrowHeight = 20;
  let eyebrowX = centerX - centerX / 4 - eyebrowWidth / 2; 
  let eyebrowY = centerY - yellowBallDiameter / 4 - 30; // Positioned above the yellow ball
  
  // Move the origin to the right center of the rectangle
  translate(eyebrowX + eyebrowWidth, eyebrowY + eyebrowHeight / 2);
  
  // Rotate the rectangle based on the current angle of the mouth's opening/closing
  rotate(radians(30) * sin(currentAngle));

  // Draw the rectangle pivoted at its right center
  rect(-eyebrowWidth, -eyebrowHeight / 2, eyebrowWidth, eyebrowHeight);

  pop(); // Restore the original transformation matrix
}

// Function to draw the eye
function drawEye() {
  // Draw a black circle as the eye
  fill(0); // Black color
  let eyeDiameter = 30;
  let eyeX = centerX - centerX / 4;
  let eyeY = centerY - yellowBallDiameter / 2 + 100; // Positioned slightly below the eyebrow
  
  ellipse(eyeX, eyeY, eyeDiameter); // Draw the eye
}
