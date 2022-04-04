import pc from "./initPC";
import "playcanvas-tween";

// Create a PlayCanvas application
const canvas = document.getElementById("application-canvas");
const app = new pc.Application(canvas, {
  mouse: new pc.Mouse(canvas),
  keyboard: new pc.Keyboard(window),
});

// add addTweenManager obviously
app.addTweenManager();

// delay start until ammo.js is loaded async
//app.start();

// Fill the available space at full resolution
app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
app.setCanvasResolution(pc.RESOLUTION_AUTO);

// Resize the canvas when the window is resized
window.addEventListener('resize', function () {
  app.resizeCanvas(canvas.width, canvas.height);
});

export { app, pc };