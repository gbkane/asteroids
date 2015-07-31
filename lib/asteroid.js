(function(){
  if(typeof window.Asteroids === "undefined"){
    window.Asteroids = {};
  };

  var Asteroid = Asteroids.Asteroid = function (pos, game){
    this.color = "#c47900";
    this.radius = 40;
    this.pos = pos;
    this.vel = Asteroids.Util.randomVex(3);
    this.game = game;
    this.img = new Image();
    this.img.src = './asteroid.png';
    // this.img.src = './asteroid2.png';
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.draw = function(ctx){
		ctx.drawImage(this.img, this.pos[0] - this.radius, this.pos[1] - this.radius);
	};

  Asteroid.prototype.collideWith = function (object){
    if (object instanceof Asteroids.Ship) {
      this.game.lives -= 1;

      object.relocate();

      this.game.asteroids.forEach( function(asteroid) {
  		  asteroid.relocate();
  	  });

    }else if (object instanceof Asteroids.Asteroid){
      console.log("aaaahhhh!!");
        //this has a problem when the asteroids start on top of each othera
        // this.vel[0] *= -1;
        // this.vel[1] *= -1;
      }
  };

  Asteroid.prototype.relocate = function () {
    this.pos = this.game.randomPosition(this);
  };
})();
