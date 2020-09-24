function changeFontSize(target) {
  var demo = document.getElementById("main");
  var computedStyle = window.getComputedStyle
    ? getComputedStyle(demo) // Standards
    : demo.currentStyle; // Old IE
  var fontSize;

  if (computedStyle) {
    fontSize = parseFloat(computedStyle && computedStyle.fontSize);

    if (target == document.getElementById("font-increase") && fontSize <= 20) {
      fontSize += 5;
    } else if (
      target == document.getElementById("font-decrease") &&
      fontSize > 10
    ) {
      fontSize -= 5;
    }
    demo.style.fontSize = fontSize + "px";
  }
}
