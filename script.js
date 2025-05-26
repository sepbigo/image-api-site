const img = document.getElementById("mainImage");
const resolutionDisplay = document.getElementById("resolution");
const downloadBtn = document.getElementById("downloadBtn");
const toggleBtn = document.getElementById("toggleTheme");
const toggleMusicBtn = document.getElementById("toggleMusic");
const bgMusic = document.getElementById("bgMusic");
const timeDisplay = document.getElementById("timeDisplay");
const thumbnailContainer = document.getElementById("thumbnailContainer");

let musicPlaying = true;
let imageHistory = [];

function loadNewImage() {
  const url = `https://api.18xo.eu.org/random?type=img&t=${Date.now()}`;
  img.src = url;
  img.dataset.src = url;
  imageHistory.unshift(url);
  if (imageHistory.length > 6) imageHistory.pop();
}

function updateResolution() {
  resolutionDisplay.textContent = `分辨率：${img.naturalWidth} x ${img.naturalHeight}`;
}

function updateTime() {
  const now = new Date();
  timeDisplay.textContent = `当前时间：${now.toLocaleTimeString()}`;
}

function renderThumbnails() {
  thumbnailContainer.innerHTML = '';
  imageHistory.forEach((url, index) => {
    if (index === 0) return;
    const thumb = document.createElement("img");
    thumb.src = url;
    if (url === img.dataset.src) {
      thumb.classList.add("active");
    }
    thumb.onclick = () => {
      img.src = url;
      img.dataset.src = url;
    };
    thumbnailContainer.appendChild(thumb);
  });
}

img.addEventListener("load", () => {
  updateResolution();
  renderThumbnails();
});

img.addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = img.dataset.src;
  link.download = "wallpaper.jpg";
  link.click();
});

downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = img.dataset.src;
  link.download = "wallpaper.jpg";
  link.click();
});

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleBtn.textContent = document.body.classList.contains("dark") ? "☀️ 日间模式" : "🌙 夜间模式";
});

toggleMusicBtn.addEventListener("click", () => {
  if (musicPlaying) {
    bgMusic.pause();
    toggleMusicBtn.textContent = "播放音乐";
    localStorage.setItem("musicPlaying", "false");
  } else {
    bgMusic.play();
    toggleMusicBtn.textContent = "暂停音乐";
    localStorage.setItem("musicPlaying", "true");
  }
  musicPlaying = !musicPlaying;
});

if (localStorage.getItem("musicPlaying") === "false") {
  musicPlaying = false;
  bgMusic.pause();
  toggleMusicBtn.textContent = "播放音乐";
} else {
  musicPlaying = true;
  bgMusic.play().catch(() => {});
  toggleMusicBtn.textContent = "暂停音乐";
}

document.addEventListener("DOMContentLoaded", () => {
  loadNewImage();
  updateTime();
  setInterval(loadNewImage, 5000);
  setInterval(updateTime, 1000);
});

document.addEventListener("contextmenu", e => e.preventDefault());