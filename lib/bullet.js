(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (options) {
    options.radius = Bullet.RADIUS;

    Asteroids.MovingObject.call(this, options);
  };

  Bullet.RADIUS = 2;
  Bullet.SPEED = 15;

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      var numSmallAsteroids = 4;
      this.remove();
      if (otherObject.radius === this.game.bigAsteroidRadius){
        var rad = this.game.smallAsteroidRadius;
        var pos = otherObject.pos;
        this.game.addAsteroids(
          this.game.smallAsteroidRadius, 1, [pos[0]+rad, pos[1]+rad]
        );
        this.game.addAsteroids(
          this.game.smallAsteroidRadius, 1, [pos[0]-rad, pos[1]+rad]
        );
        this.game.addAsteroids(
          this.game.smallAsteroidRadius, 1, [pos[0]-rad, pos[1]-rad]
        );
        this.game.addAsteroids(
          this.game.smallAsteroidRadius, 1, [pos[0]+rad, pos[1]-rad]
        );
          this.game.numAsteroids += numSmallAsteroids;
      }
      otherObject.remove();
      this.game.score += (50 * this.game.level);
    }
  };


})();
