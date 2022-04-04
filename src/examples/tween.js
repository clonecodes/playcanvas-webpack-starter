import {app, pc} from "../initApp";

const plane = new pc.Entity();

export default() => {
  app.start();

  // Create camera entity
  const camera = new pc.Entity();
  camera.addComponent('camera', {
    clearColor: new pc.Color(0.1, 0.2, 0.3)
  });
  camera.name = 'camera';

  // Create directional light entity
  const light = new pc.Entity();
  light.addComponent('light');
  light.name = 'light';

  // Set up initial positions and orientations
  camera.setPosition(0, 0, 6);
  light.setEulerAngles(45, 0, 0);

// Add to hierarchy
  app.root.addChild(camera);
  app.root.addChild(light);

  const container = new pc.Entity();
  container.setPosition(2,0,0);
  container.name = 'container';
  app.root.addChild(container);
  container.setPosition(2,0,0);

  plane.addComponent('model', {type: 'plane'});
  plane.name = 'plane'
  // might wanna rotate it to look at the camera
  plane.setLocalEulerAngles(90, 0, 0);
  plane.setPosition(-1,1,0);
  // to add the plane to an existing entity
  app.root.addChild(plane);
  plane.setLocalEulerAngles( 45, 0, 0);


  const ball = createShape('sphere', 0,-1.21,1);
  ball.name = 'ball'

  ball.tween(ball.getLocalPosition())
      .to(new pc.Vec3(0, 2, 0), 1.0, pc.SineOut)
      .loop(true)
      .yoyo(true)
      .start();
};


function createShape(type, x, y, z, angle = 0, length = 1) {
  const shape = new pc.Entity();
  shape.addComponent('model', { type: type });
  plane.addChild(shape);
  shape.model.castShadows = true;
  const material = shape.model.model.meshInstances[0].material;
  material.diffuse.set(1, 1, 1);
  material.specular.set(0.4, 0.4, 0.4);
  material.shininess = 70;
  material.update();
  if(type === 'box')shape.setLocalScale(1, 0.2, length);
  if(type === 'sphere')shape.setLocalScale(0.2, 0.2, 0.2);
  return shape;
}