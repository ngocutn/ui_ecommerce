const ImageZoom = () => {
  let imageZoom = document.getElementById("imageZoom");
  let image = document.getElementById("image");
  let imageWrapper = document.getElementById("image-wrapper");
  let imageContainer = document.getElementById("image-container");

  if (!imageZoom || !image || !imageWrapper || !imageContainer) {
    console.error("One or more required elements are missing");
    return; // Ngưng hàm nếu các phần tử không tồn tại
  }

  let x, y, width, height;

  imageZoom.addEventListener("mouseenter", (e) => {
    imageWrapper.style.setProperty("display", "block");

    const size = imageContainer.getBoundingClientRect();

    x = size.x;
    y = size.y;
    width = size.width;
    height = size.height;
  });

  imageZoom.addEventListener("mousemove", (e) => {
    const offsetX = e.clientX - x;
    const offsetY = e.clientY - y;

    const horizontal = (offsetX / width - 0.5) * 100;
    const vertical = (offsetY / height - 0.5) * 100;

    // Đặt transform-origin dựa trên vị trí chuột
    image.style.setProperty("--x", `${40 + horizontal}%`);
    image.style.setProperty("--y", `${40 + vertical}%`);
    image.style.setProperty("--zoom", "3");
  });

  imageZoom.addEventListener("mouseout", function () {
    image.style.setProperty("--zoom", "1");
    imageWrapper.style.setProperty("display", "none");
  });
};

export default ImageZoom;
