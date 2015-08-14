(function(){
  if(typeof window.Asteroids === "undefined"){
    window.Asteroids = {};
  };

  var Ship = Asteroids.Ship = function (pos, game){
    this.color = "#f00";
    this.radius = 21;
    this.pos = pos;
    this.vel = [0,0];
    this.game = game;
    this.img = new Image ();
    this.img.src = "./images/ship.png";
    this.hit = false;
    this.hitTimer = 10;
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.draw = function(ctx){
    if (this.hit){
      if (Math.floor(this.hitTimer) % 2 !== 0){
        ctx.globalAlpha = 0.5;
      } else {
        ctx.globalAlpha = 1;
      }
      this.hitTimer -= 0.1;
      if (this.hitTimer < 0){
        this.hit = false;
        this.hitTimer = 10;
      }
    }

		ctx.drawImage(
      this.img,
      this.pos[0] - this.radius - 2,
      this.pos[1] - this.radius - 14
    );
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

    var relVel = Asteroids.Util.scale(
      Asteroids.Util.dir(this.vel),
      Asteroids.Bullet.SPEED
    );

    var bulletVel = [
      // relVel[0] + this.vel[0], relVel[1] + this.vel[1]
      this.vel[0], (Asteroids.Bullet.SPEED * -1 + this.vel[1])
    ];

    var bullet = new Asteroids.Bullet({
      pos: [this.pos[0] , this.pos[1]-18],
      vel: bulletVel,
      color: this.color,
      game: this.game
    });

    this.game.add(bullet);
  };



})();
