const img = document.getElementById("mainImage");
const container = document.querySelector(".container");
let zoomed = false;

// 获取新图
function fetchImage() {
  fetch("https://api.18xo.eu.org/random?type=img")
    .then(res => res.text())
    .then(url => {
      img.classList.remove("loaded");
      img.src = url.trim(); // 避免返回值带空格
    })
    .catch(err => {
      console.error("图片加载失败", err);
    });
}

// 图片加载完成后显示
img.onload = () => {
  img.classList.add("loaded");
};

// 点击放大/缩小
img.addEventListener("click", () => {
  zoomed = !zoomed;
  img.style.transform = zoomed ? "scale(2)" : "scale(1)";
  container.style.cursor = zoomed ? "zoom-out" : "zoom-in";
});

// 首次加载
fetchImage();
