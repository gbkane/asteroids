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
  Bullet.BIG_EXP_RAD = 75;
  Bullet.SM_EXP_RAD = 37.5;

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {

      this.remove();
      if (otherObject.radius === this.game.bigAsteroidRadius){
        this.game.addExplosion(otherObject.pos, Bullet.BIG_EXP_RAD);
        this.game.addSmallAsteroids(otherObject.pos);
      }else{
        this.game.addExplosion(otherObject.pos, Bullet.SM_EXP_RAD);

      }

      otherObject.remove();
      this.game.score += (50 * this.game.level);
    }
  };


})();
