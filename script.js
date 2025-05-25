const img = document.getElementById("mainImage");
const downloadBtn = document.getElementById("downloadBtn");

// 设置图片源
function loadNewImage() {
  const url = "https://api.18xo.eu.org/random?type=img&t=" + Date.now();
  img.src = url;
  downloadBtn.href = url;
}

// 初始加载
document.addEventListener("DOMContentLoaded", () => {
  loadNewImage();

  img.addEventListener("click", () => {
    img.classList.toggle("zoomed");
  });

  // 每 5 秒自动切换图片
  setInterval(loadNewImage, 5000);
});
