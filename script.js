document.addEventListener("DOMContentLoaded", () => {
  const img = document.getElementById("mainImage");
  // 设置图片直接外链
  img.src = "https://api.18xo.eu.org/random?type=img";

  img.addEventListener("click", () => {
    img.classList.toggle("zoomed");
  });
});
