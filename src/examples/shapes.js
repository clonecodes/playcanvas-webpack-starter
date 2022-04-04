import {app, pc} from "../initApp";

export default () => {
  app.start();

  const camera = new pc.Entity();
  camera.addComponent("camera", { clearColor: new pc.Color(0.8, 0.8, 0.8) });
  camera.setPosition(0, 0, 7);
  app.root.addChild(camera);

  // Create light
  const light = new pc.Entity();
  light.addComponent('light');
  light.rotate(45, 0, 0);
  app.scene.ambientLight = new pc.Color(0.2, 0.2, 0.2);
  app.root.addChild(light);

  // Create cube
  let box = new pc.Entity();
  box.name = 'box';
  box.addComponent("model", { type: "box" });
  app.root.addChild(box);
  box.rotate(10, 15, 0);
  box.translate(-2, 0, 0);

  // Create cube's material
  const boxMaterial = new pc.PhongMaterial();
  boxMaterial.diffuse.set(0, 0.58, 0.86);
  boxMaterial.update();
  box.model.model.meshInstances[0].material = boxMaterial;


  const cylinder = new pc.Entity();
  cylinder.name = 'cylinder';
  cylinder.addComponent("model", { type: "cylinder" });
  app.root.addChild(cylinder);
  cylinder.rotate(15, 0, 0);
  const cylinderMaterial = new pc.PhongMaterial();
  cylinderMaterial.diffuse.set(1, 0.58, 0);
  cylinderMaterial.update();
  cylinder.model.model.meshInstances[0].material = cylinderMaterial;


  const cone = new pc.Entity();
  cone.name = 'cone';
  cone.addComponent("model", { type: "cone" });
  app.root.addChild(cone);
  cone.translate(2, 0, 0);
  const coneMaterial = new pc.PhongMaterial();
  coneMaterial.diffuse.set(0.9, 0.9, 0.9);
  coneMaterial.update();
  cone.model.model.meshInstances[0].material = coneMaterial;

  let timer = 0;
  app.on("update", function (deltaTime) {
    timer += deltaTime;
    // code executed on every frame
    if(box){
      box.rotate(deltaTime*10, deltaTime*20, deltaTime*30);
      //box.translate(0, 0, deltaTime*0.2);
      box.setPosition(-2, 0, -timer*0.2);
      box.setLocalScale(1, Math.abs(Math.sin(timer)), 1);
      // if(box.localPosition.z < -1){
      //   box.destroy();
      //   console.log(box);
      //   console.log(app.root._children);
      //   box = null;
      //   //console.log(box);
      // }
    }
    cylinder.setLocalScale(1, Math.abs(Math.sin(timer)), 1);
    cone.setPosition(2, Math.sin(timer*2), 0);
  });
};
