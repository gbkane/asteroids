(function(){
  if(typeof window.Asteroids === "undefined"){
    window.Asteroids = {};
  };

  var Ship = Asteroids.Ship = function (pos, game){
    this.color = "#f00";
    this.radius = 20;
    this.pos = pos;
    this.vel = [0,0];
    this.game = game;
    this.img = new Image ();
    this.img.src = "./ship.png";
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.draw = function(ctx){
		 ctx.drawImage(this.img, this.pos[0] - this.radius - 10, this.pos[1] - this.radius - 10);
	};

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
      // relVel[0] + this.vel[0], relVel[1] + this.vel[1]
      this.vel[0], (Asteroids.Bullet.SPEED * -1 + this.vel[1])
    ];

    var bullet = new Asteroids.Bullet({
      pos: [this.pos[0] - 7, this.pos[1]-10],
      vel: bulletVel,
      color: this.color,
      game: this.game
    });

    this.game.add(bullet);
  };



})();
