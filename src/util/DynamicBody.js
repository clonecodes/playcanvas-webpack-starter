import { pc } from "../initApp";

let DynamicBody = pc.createScript('dynamicBody');

// initialize code called once per entity
DynamicBody.prototype.initialize = function() {
  this.torque = 7;
  this.app.keyboard.on(pc.EVENT_KEYDOWN, this.onKeyDown, this);

  this.on('destroy', function() {
    this.app.keyboard.offv(pc.EVENT_KEYDOWN, this.onKeyDown, this);
  }, this);
};

DynamicBody.prototype.onKeyDown = function (event) {
  event.event.preventDefault();
};

// update code called every frame
DynamicBody.prototype.update = function() {
  //update player's position
  this.playerPos = this.entity.getLocalPosition();

  let app = this.app;


  //keyboard controls and applying forces and moments.
  if (app.keyboard.isPressed(pc.KEY_LEFT) ) {
    this.entity.rigidbody.applyImpulse(-1, 0, 0);
  }
  if (app.keyboard.isPressed(pc.KEY_RIGHT) ) {
    this.entity.rigidbody.applyImpulse(1, 0, 0);
  }
  if (app.keyboard.isPressed(pc.KEY_UP) ) {
    this.entity.rigidbody.applyImpulse(0, 1, 0);
  }
  if (app.keyboard.isPressed(pc.KEY_A) ) {
    this.entity.rigidbody.applyTorque(0, this.torque, 0);
  }
  if (app.keyboard.isPressed(pc.KEY_D) ) {
    this.entity.rigidbody.applyTorque(0, -this.torque, 0);
  }
  if (app.keyboard.isPressed(pc.KEY_W) ) {
    this.entity.rigidbody.applyTorque(-this.torque, 0, 0);
  }
  if (app.keyboard.isPressed(pc.KEY_S) ) {
    this.entity.rigidbody.applyTorque(this.torque, 0, 0);
  }
  if (app.keyboard.isPressed(pc.KEY_F) ) {
    this.entity.rigidbody.applyForce(0, 9.8, 0);
  }

  // Keeping the cube on screen - cube moves off of one screen edge then appears from the opposite edge.
  if (this.playerPos.x < -9.0) {
    this.entity.rigidbody.teleport(8.8, this.playerPos.y, this.playerPos.z);
  }
  if (this.playerPos.x > 9.0) {
    this.entity.rigidbody.teleport(-8.8, this.playerPos.y, this.playerPos.z);
  }

  // cube reset control
  if (app.keyboard.wasPressed(pc.KEY_R) ) {
    this.reset();
  }
};

DynamicBody.prototype.reset = function () {
  this.entity.rigidbody.teleport(0, 4, 0);
  this.entity.rigidbody.linearVelocity = pc.Vec3.ZERO;
  this.entity.rigidbody.angularVelocity = pc.Vec3.ZERO;
};