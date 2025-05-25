document.addEventListener("DOMContentLoaded", async () => {
  const img = document.getElementById("mainImage");

  try {
    const response = await fetch("https://api.18xo.eu.org/random?type=img");
    const result = await response.json();
    img.src = result.url || result.data || result.image || ''; // 自动适配字段

    img.addEventListener("click", () => {
      img.classList.toggle("zoomed");
    });

  } catch (err) {
    img.alt = "图片加载失败";
    console.error("图片加载失败：", err);
  }
});
