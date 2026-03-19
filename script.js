const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

/* 🎆 FIREWORKS */
function createFirework(x, y) {
  for (let i = 0; i < 80; i++) {
    particles.push({
      x,
      y,
      speedX: (Math.random() - 0.5) * 6,
      speedY: (Math.random() - 0.5) * 6,
      size: Math.random() * 3,
      color: ⁠ hsl(${Math.random()*360},100%,50%) ⁠,
      life: 100
    });
  }
}

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  particles.forEach((p,i)=>{
    p.x += p.speedX;
    p.y += p.speedY;
    p.life--;

    ctx.beginPath();
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctx.fillStyle = p.color;
    ctx.fill();

    if(p.life<=0) particles.splice(i,1);
  });

  requestAnimationFrame(animate);
}
animate();

/* 🎬 SLIDESHOW + 🎵 MUSIC */
let images = [
  "img1.jpeg",
  "img2.jpeg",
  "img3.jpeg",
  "img4.jpeg",
  "img5.jpeg"
];

let index = 0;
let interval;

function startCelebration() {
  const slideshow = document.getElementById("slideshow");
  const img = document.getElementById("slideImage");
  const music = document.getElementById("bgMusic");

  // SHOW SLIDESHOW
  slideshow.classList.remove("hidden");

  // PLAY MUSIC
  music.play();

  // ✅ SHOW FIRST IMAGE IMMEDIATELY
  img.src = images[index];

  // SLIDESHOW LOOP
  interval = setInterval(()=>{
    index = (index + 1) % images.length;
    img.src = images[index];
  },2000);

  // FIREWORKS LOOP
  setInterval(()=>{
    createFirework(
      Math.random()*canvas.width,
      Math.random()*canvas.height/2
    );
  },500);
}

function closeSlideshow() {
  document.getElementById("slideshow").classList.add("hidden");
  clearInterval(interval);
  document.getElementById("bgMusic").pause();
}
