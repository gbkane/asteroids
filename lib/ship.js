(function(){
  if(typeof window.Asteroids === "undefined"){
    window.Asteroids = {};
  };

  var Ship = Asteroids.Ship = function (pos, game){
    this.color = "#c9c9c9";
    this.radius = 20;
    this.pos = pos;
    this.vel = [0,0];
    this.game = game;
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.fireBullet = function () {

    var norm = Asteroids.Util.norm(this.vel);

    // if (norm == 0) {
    //   // Can't fire unless moving.
    //   return;
    // }

    var relVel = Asteroids.Util.scale(
      Asteroids.Util.dir(this.vel),
      Asteroids.Bullet.SPEED
    );

    //Add initial velocity for when stopped
    var bulletVel = [
      relVel[0] + this.vel[0], relVel[1] + this.vel[1]
    ];

    var bullet = new Asteroids.Bullet({
      pos: [this.pos[0] + 1, this.pos[1]],
      vel: bulletVel,
      color: this.color,
      game: this.game
    });

    this.game.add(bullet);
  };

  

})();
