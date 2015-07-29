(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (attributes) {
    attributes.radius = Ship.RADIUS;
    attributes.vel = attributes.vel || [0, 0];
    attributes.color = '#000000';

    Asteroids.MovingObject.call(this, attributes)
  };

  Ship.RADIUS = 15;

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

})();
