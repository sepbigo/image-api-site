const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");
let width, height, dots = [];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

for (let i = 0; i < 50; i++) {
  dots.push({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 2 + 1,
    dx: Math.random() - 0.5,
    dy: Math.random() - 0.5
  });
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  for (let dot of dots) {
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.fill();
    dot.x += dot.dx;
    dot.y += dot.dy;
    if (dot.x < 0 || dot.x > width) dot.dx *= -1;
    if (dot.y < 0 || dot.y > height) dot.dy *= -1;
  }
  requestAnimationFrame(draw);
}
draw();