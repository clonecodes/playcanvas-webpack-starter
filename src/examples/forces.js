import {app, pc} from "../initApp";
import ammo from 'ammo.js';
import "../util/DynamicBody";

// based on: https://developer.playcanvas.com/en/tutorials/Using-forces-on-rigid-bodies/
// TODO match colors and lights

export default() => {
  const start = Date.now();
  ammo().then(() => {
    const millis = Date.now() - start;
    console.log('ammo loaded', millis,'ms')
    demo();
  })
}

const demo = () => {

  app.start();

  //app.scene.ambientLight = new pc.Color(0.2, 0.2, 0.2);

  // Set the gravity for our rigid bodies
  app.systems.rigidbody.gravity.set(0, -9.81, 0);

  // ***********    Create lights   *******************
  // make our scene prettier by adding a directional light
  const light = new pc.Entity();
  light.addComponent("light", {
    type: "directional",
    color: new pc.Color(1, 1, 1),
    castShadows: true,
    shadowBias: 0.2,
    shadowDistance: 25,
    normalOffsetBias: 0.05,
    shadowResolution: 2048,
  });
  // set the direction for our light
  light.setLocalEulerAngles(45, 30, 0);
  // Add the light to the hierarchy
  app.root.addChild(light);

  // ***********    Create camera    *******************
  // Create an Entity with a camera component
  const camera = new pc.Entity();
  camera.addComponent("camera", { clearColor: new pc.Color(0.5, 0.5, 0.8), farClip: 50 });
  // add the camera to the hierarchy
  app.root.addChild(camera);
  // Move the camera a little further away
  camera.translate(0, 5, 18);

  function createMaterial(color) {
    const material = new pc.StandardMaterial();
    material.diffuse = color;
    // we need to call material.update when we change its properties
    material.update();
    return material;
  }

  // create a few materials for our objects
  const red = createMaterial(new pc.Color(1, 0.3, 0.3));
  const gray = createMaterial(new pc.Color(0.7, 0.7, 0.7));

  // ***********    Create our floor   *******************

  const floor = new pc.Entity();
  floor.addComponent("render", { type: "box", material: gray });
  // scale it
  floor.setLocalScale(22, 1, 10);
  // add a rigidbody component so that other objects collide with it
  floor.addComponent("rigidbody", { type: "static", restitution: 0.5 });
  // add a collision component
  floor.addComponent("collision", { type: "box", halfExtents: new pc.Vec3(11, 0.5, 5) });
  // add the floor to the hierarchy
  app.root.addChild(floor);

  // ***********    Create our roof   *******************

  const roof = new pc.Entity();
  roof.addComponent("render", { type: "box", material: gray });
  // scale it
  roof.setLocalScale(22, 1, 10);
  roof.setPosition(0, 10, 0);
  // add a rigidbody component so that other objects collide with it
  roof.addComponent("rigidbody", { type: "static", restitution: 0.5 });
  // add a collision component
  roof.addComponent("collision", { type: "box", halfExtents: new pc.Vec3(11, 0.5, 5) });
  // add the floor to the hierarchy
  app.root.addChild(roof);

  // ***********    Create cylinder   *******************

  const cylinder = new pc.Entity();
  cylinder.addComponent("render", { type: "cylinder", material: red });
  cylinder.addComponent("rigidbody", { type: "dynamic", mass: 1, restitution: 0.5, friction: 0.5, angularDamping: 0.6 });
  cylinder.addComponent("collision", { type: "cylinder", radius: 0.5, height: 1 });
  // adding dynamicBody enables keyboard controlled movement
  cylinder.addComponent("script");
  cylinder.script.create("dynamicBody");
  app.root.addChild(cylinder);

  // ***********    Create cube   *******************

  const cube = new pc.Entity();
  cube.addComponent("render", { type: "box", material: red });
  cube.addComponent("rigidbody", { type: "dynamic", mass: 1, restitution: 1, friction: 0.5, angularDamping: 0.6 });
  cube.addComponent("collision", { type: "box", halfExtents: new pc.Vec3(0.5, 0.5, 0.5) });
  // adding dynamicBody enables keyboard controlled movement
  cube.addComponent("script");
  cube.script.create("dynamicBody");
  cube.setPosition(0, 3, 0);
  app.root.addChild(cube);

};