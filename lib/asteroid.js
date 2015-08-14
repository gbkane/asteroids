(function(){
  if(typeof window.Asteroids === "undefined"){
    window.Asteroids = {};
  };

  var Asteroid = Asteroids.Asteroid = function (pos, game, radius){
    this.color = "#c47900";
    this.radius = radius;
    this.pos = pos;
    this.vel = Asteroids.Util.randomVex(3);
    this.game = game;
    this.img = new Image();
    this.img.src = './images/asteroid.png';
    // this.img.src = './asteroid2.png';
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.draw = function(ctx){
    ctx.globalAlpha = 1;
  
		ctx.drawImage(
      this.img, this.pos[0] - this.radius*1.1,
      this.pos[1] - this.radius*1.17
    ); // 1.1 and 1.17 are extra movement of the image to get proper center

	};

  Asteroid.prototype.collideWith = function (object){
    if (object instanceof Asteroids.Ship && object.hit === false) {
      this.game.lives -= 1;

      if(this.game.lives > 0){
        object.relocate();
        object.hit = true;

        this.game.asteroids.forEach( function(asteroid) {
    		  asteroid.relocate();
    	  });
      }
    }else if (object instanceof Asteroids.Asteroid){
      // console.log("aaaahhhh!!");
        //this has a problem when the asteroids start on top of each othera
        // this.vel[0] *= -1;
        // this.vel[1] *= -1;
      }
  };

  Asteroid.prototype.relocate = function () {
    this.pos = this.game.randomPosition(this);
  };
})();
