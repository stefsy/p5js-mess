3-waves.js
// p5.js experiment to understand sine wave function in p5
// 3 overlapping ocean waves with different frequencies

let slider;
let time = 0;
const waves = [];
const numWaves = 3;

function setup() {
  // Create a square canvas
  const size = min(windowWidth * 0.8, windowHeight * 0.8);
  createCanvas(size, size);
  
  // Create slider for wave intensity
  slider = createSlider(0, 100, 30);
  slider.position(width * 0.1, 20);
  slider.style('width', '60%');
  
  // Initialize wave objects
  for (let i = 0; i < numWaves; i++) {
    waves.push({
      frequency: random(0.005, 0.03),
      phase: random(TWO_PI)
    });
  }
}

function draw() {
  background('#B4D8E7');
  
  // Get wave intensity from slider (0-1)
  const intensity = slider.value() / 100;
  
  // Draw waves
  drawWaves(intensity);
  
  time += 0.03;
}

function drawWaves(intensity) {
  // Draw each wave layer
  for (let w = 0; w < waves.length; w++) {
    const wave = waves[w];
    const baseHeight = height * 0.6;
    
    // Draw main wave body
    fill('#1E64A8');
    noStroke();
    beginShape();
    vertex(0, height);
    vertex(0, baseHeight);
    
    // Create wave points
    for (let x = 0; x <= width; x += 5) {
      const xOff = x * wave.frequency + time + wave.phase;
      const yOff = noise(xOff * 0.5) * 2;
      const y = baseHeight + 
                sin(xOff) * (50 * intensity) * (1 + yOff) * (1 - w * 0.2);
      vertex(x, y);
    }
    
    vertex(width, baseHeight);
    vertex(width, height);
    endShape(CLOSE);
    
    // Draw foam (white caps)
    stroke(255);
    strokeWeight(2 + intensity * 3);
    noFill();
    beginShape();
    for (let x = 0; x <= width; x += 5) {
      const xOff = x * wave.frequency + time + wave.phase;
      const yOff = noise(xOff * 0.5) * 2;
      const y = baseHeight + 
                sin(xOff) * (50 * intensity) * (1 + yOff) * (1 - w * 0.2);
      vertex(x, y);
    }
    endShape();
  }
}

function windowResized() {
  const size = min(windowWidth * 0.8, windowHeight * 0.8);
  resizeCanvas(size, size);
  slider.position(width * 0.1, 20);
  slider.style('width', '80%');
}