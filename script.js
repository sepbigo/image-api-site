const img = document.getElementById("mainImage");
const toggleBtn = document.getElementById("toggleTheme");
const toggleMusicBtn = document.getElementById("toggleMusic");
const timeDisplay = document.getElementById("timeDisplay");
const resolutionDisplay = document.getElementById("resolution");
const downloadBtn = document.getElementById("downloadBtn");
const bgMusic = document.getElementById("bgMusic");
const thumbnailContainer = document.getElementById("thumbnailContainer");

let musicPlaying = true;
let imageHistory = [];

function loadNewImage() {
  const url = "https://api.18xo.eu.org/random?type=img&t=" + Date.now();
  img.src = url;
  img.dataset.src = url;
  imageHistory.unshift(url);
  if (imageHistory.length > 6) imageHistory.pop();
}

function renderThumbnails() {
  thumbnailContainer.innerHTML = '';
  imageHistory.forEach((url, index) => {
    if (index === 0) return;
    const thumb = document.createElement("img");
    thumb.src = url;
    thumb.title = "点击切换此图";
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

function updateResolution() {
  resolutionDisplay.textContent = `分辨率：${img.naturalWidth} x ${img.naturalHeight}`;
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
    updateResolution();
    renderThumbnails();
  });

  img.addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = img.dataset.src;
    link.download = "random-image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  downloadBtn.addEventListener("click", () => {
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
      ? "日间模式"
      : "夜间模式";
  });

  toggleMusicBtn.addEventListener("click", () => {
    if (musicPlaying) {
      fadeVolume(bgMusic, bgMusic.volume, 0);
      setTimeout(() => bgMusic.pause(), 1000);
      toggleMusicBtn.textContent = "播放音乐";
      localStorage.setItem("musicPlaying", "false");
    } else {
      bgMusic.play().then(() => fadeVolume(bgMusic, 0, 1));
      toggleMusicBtn.textContent = "暂停音乐";
      localStorage.setItem("musicPlaying", "true");
    }
    musicPlaying = !musicPlaying;
  });

  if (localStorage.getItem("musicPlaying") === "false") {
    musicPlaying = false;
    bgMusic.volume = 0;
    bgMusic.pause();
    toggleMusicBtn.textContent = "播放音乐";
  } else {
    musicPlaying = true;
    bgMusic.volume = 1;
    bgMusic.play().catch(() => {});
    toggleMusicBtn.textContent = "暂停音乐";
  }

  document.addEventListener("contextmenu", e => e.preventDefault());
});