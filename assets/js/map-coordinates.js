const map = document.querySelector(".adventure-map[data-coordinate-readout]");
const image = map?.querySelector(".adventure-map-image");
const readout = map?.querySelector(".map-coordinate-readout");

if (map && image && readout) {
  map.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") {
      readout.hidden = true;
      return;
    }

    const bounds = image.getBoundingClientRect();
    const withinImage =
      event.clientX >= bounds.left &&
      event.clientX <= bounds.right &&
      event.clientY >= bounds.top &&
      event.clientY <= bounds.bottom;

    if (!withinImage) {
      readout.hidden = true;
      return;
    }

    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    readout.textContent = `x: ${x.toFixed(1)}, y: ${y.toFixed(1)}`;
    readout.hidden = false;
  });

  map.addEventListener("pointerleave", () => {
    readout.hidden = true;
  });
}
