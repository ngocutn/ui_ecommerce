const ImageZoom = () => {
  let imageZoom = document.getElementById("imageZoom");
  let image = document.getElementById("image");
  imageZoom.addEventListener("mousemove", (e) => {
    image.style.setProperty("display", "block");
    let pointer = {
      x: (e.offsetX * 100) / image.offsetWidth,
      y: (e.offsetY * 100) / image.offsetHeight,
    };

    // image.style.setProperty("--zom-x", pointer.x + "%");
    // image.style.setProperty("--zom-y", pointer.y + "%");

    imageZoom.style.transformOrigin = `${pointer.x}% ${pointer.y}%`;
    imageZoom.classList.add("zoomed");
  });

  imageZoom.addEventListener("mouseout", () => {
    image.style.setProperty("display", "none");
    imageZoom.classList.remove("zoomed");
  });
};

export default ImageZoom;
