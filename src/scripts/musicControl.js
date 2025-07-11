const bgm = document.getElementById("bgm");
const volumeSlider = document.getElementById("volume-slider");

bgm.volume = 0.5;

volumeSlider.addEventListener("input", () => {
    bgm.volume = volumeSlider.value / 10;
});