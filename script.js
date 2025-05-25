const img = document.getElementById("mainImage");
const toggleBtn = document.getElementById("toggleTheme");
const toggleMusicBtn = document.getElementById("toggleMusic");
const timeDisplay = document.getElementById("timeDisplay");
const bgMusic = document.getElementById("bgMusic");

let musicPlaying = true;

function loadNewImage() {
  const url = "https://api.18xo.eu.org/random?type=img&t=" + Date.now();
  img.classList.remove("loaded");
  img.src = url;
  img.dataset.src = url;
}

function updateTime() {
  const now = new Date();
  timeDisplay.textContent = `当前时间：${now.toLocaleTimeString()}`;
}

function fadeVolume(audio, from, to, duration = 1000) {
  const step = (to - from) / (duration / 50);
  let vol = from;
  const fade = setInterval(() => {
    vol += step;
    audio.volume = Math.min(1, Math.max(0, vol));
    if ((step > 0 && vol >= to) || (step < 0 && vol <= to)) {
      clearInterval(fade);
      audio.volume = to;
    }
  }, 50);
}

document.addEventListener("DOMContentLoaded", () => {
  loadNewImage();
  updateTime();
  setInterval(loadNewImage, 5000);
  setInterval(updateTime, 1000);

  img.addEventListener("load", () => {
    img.classList.add("loaded");
  });

  img.addEventListener("click", () => {
    img.classList.toggle("zoomed");
  });

  img.addEventListener("dblclick", () => {
    const link = document.createElement("a");
    link.href = img.dataset.src;
    link.download = "random-image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggleBtn.textContent = document.body.classList.contains("dark")
      ? "☀️ 切换日间模式"
      : "🌙 切换夜间模式";
  });

  toggleMusicBtn.addEventListener("click", () => {
    if (musicPlaying) {
      fadeVolume(bgMusic, bgMusic.volume, 0);
      setTimeout(() => bgMusic.pause(), 1000);
      toggleMusicBtn.textContent = "🔇 播放音乐";
    } else {
      bgMusic.play().then(() => fadeVolume(bgMusic, 0, 1));
      toggleMusicBtn.textContent = "🔊 暂停音乐";
    }
    musicPlaying = !musicPlaying;
  });

  document.addEventListener("contextmenu", e => e.preventDefault());
});
