import {app, pc} from "../initApp";
import "../util/FlyCamera";

export default() => {
  app.start();

  // ***********    Create Boxes    *******************

  // create a few boxes in our scene
  const red = createMaterial(pc.Color.RED);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 2; j++) {
      createBox(new pc.Vec3(i * 2, 0, j * 4), pc.Vec3.ONE, red);
    }
  }

  // create a floor
  const white = createMaterial(pc.Color.WHITE);
  createBox(new pc.Vec3(0, -0.5, 0), new pc.Vec3(10, 0.1, 10), white);

  // ***********    Create lights   *******************

  // make our scene prettier by adding a directional light
  const light = new pc.Entity();
  light.addComponent("light", {
    type: "omni",
    color: new pc.Color(1, 1, 1),
    range: 100,
  });

  light.setLocalPosition(0, 0, 2);

  // add the light to the hierarchy
  app.root.addChild(light);

  // ***********    Create camera    *******************

  // Create an Entity with a camera component
  const camera = new pc.Entity();
  camera.addComponent("camera", {
    clearColor: new pc.Color(0.5, 0.5, 0.8),
    nearClip: 0.3,
    farClip: 30,
  });

  // add the fly camera script to the camera
  camera.addComponent("script");
  camera.script.create("flyCamera");

  // add the camera to the hierarchy
  app.root.addChild(camera);

  // Move the camera a little further away
  camera.translate(2, 0.8, 9);
};


function createMaterial(color) {
  const material = new pc.StandardMaterial();
  material.diffuse = color;
  // we need to call material.update when we change its properties
  material.update();
  return material;
}

function createBox(position, size, material) {
  // create an entity and add a model component of type 'box'
  const box = new pc.Entity();
  box.addComponent("render", {
    type: "box",
    material: material,
  });

  // move the box
  box.setLocalPosition(position);
  box.setLocalScale(size);

  // add the box to the hierarchy
  app.root.addChild(box);
}