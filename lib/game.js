(function(){
  if(typeof window.Asteroids === "undefined"){
    window.Asteroids = {};
  };

  var Game = Asteroids.Game = function(){
    this.DIM_X = 800;
    this.DIM_Y = 500;
    this.numAsteroids = 2;
    this.asteroids = [];
    this.bullets = [];
    this.ships = [];
    this.explosions = [];
    this.bigAsteroidRadius = 40;
    this.smallAsteroidRadius = 20;
    this.addAsteroids(this.bigAsteroidRadius, this.numAsteroids);
    this.BG_COLOR = "#031159"
    this.level = 1;
    this.score = 0;
    this.lives = 5;
    this.addShip();
    this.paused = true;
    this.newGame = true;
  };

  Game.prototype.reset = function (){
    this.asteroids = [];
    this.bullets = [];
    this.explosions = [];
    this.numAsteroids = 2;
    this.addAsteroids(this.bigAsteroidRadius, this.numAsteroids);
    this.level = 1;
    this.score = 0;
    this.lives = 5;
    this.ships[0].relocate();
    // this.newGame = true;
  };

  Game.prototype.addAsteroids = function(radius, asteroidCount, pos){

    for(var i = 0; i < asteroidCount; i++){
      // this.asteroids.push(new Asteroids.Asteroid(this.randomPosition(), this));
      var asteroid = new Asteroids.Asteroid;

  	  asteroid.game = this;
      asteroid.radius = radius;
      if (radius === this.bigAsteroidRadius){
        asteroid.pos = this.randomPosition(asteroid);
        asteroid.img.src = './images/asteroid.png';
      }else {
        asteroid.pos = pos;
        asteroid.img.src = './images/asteroid2.png';
      }
  	  this.add(asteroid);
    };
  };

  Game.prototype.addSmallAsteroids = function(pos){
    var numSmallAsteroids = 4;
    var rad = this.bigAsteroidRadius;
    this.addAsteroids(
      this.smallAsteroidRadius, 1, [pos[0]+rad, pos[1]+rad]
    );
    this.addAsteroids(
      this.smallAsteroidRadius, 1, [pos[0]-rad, pos[1]+rad]
    );
    this.addAsteroids(
      this.smallAsteroidRadius, 1, [pos[0]-rad, pos[1]-rad]
    );
    this.addAsteroids(
      this.smallAsteroidRadius, 1, [pos[0]+rad, pos[1]-rad]
    );
    this.numAsteroids += numSmallAsteroids;
  };

  Game.prototype.addExplosion = function(pos, radius){
    var explosion = new Asteroids.Explosion(pos, this, radius);
    this.add(explosion);
  }

  Game.prototype.add = function (object) {
    if (object instanceof Asteroids.Asteroid) {
      this.asteroids.push(object);
    } else if (object instanceof Asteroids.Bullet) {
      this.bullets.push(object);
    } else if (object instanceof Asteroids.Ship) {
      this.ships.push(object);
    } else if (object instanceof Asteroids.Explosion){
      this.explosions.push(object);
    } else {
      throw "wtf?";
    }
  };

  Game.prototype.addShip = function(){
    var ship = new Asteroids.Ship(this.randomPosition(), this);
    this.add(ship);

    return ship;
  }

  Game.prototype.randomPosition = function(object){
    var x = Math.random()*this.DIM_X;
  	if (object instanceof Asteroids.Asteroid){
  		var y = Math.random()*this.DIM_Y*0.6 + this.DIM_Y * 0.1;
  	}else{
  		var y = Math.random()*this.DIM_Y*0.25 + this.DIM_Y * 0.75;
  	}
      return [x,y];

  };

  Game.prototype.draw = function(ctx, img, yOffset){

    ctx.clearRect(0,0,this.DIM_X, this.DIM_Y);
    // ctx.fillStyle = this.BG_COLOR;
    // ctx.fillRect(0,0,this.DIM_X, this.DIM_Y);
    ctx.globalAlpha = 1;
    ctx.drawImage(img, 0, yOffset);

    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
    this.explosions.forEach(function (object) {
      object.draw(ctx);
    });

    ctx.fillStyle = "#0f0";
    ctx.font = "20px Orbitron";
    ctx.textBaseline = "top";
    ctx.fillText("Level: " + this.level, 10, 5);
    ctx.fillText("Score: " + this.score, 330, 5);
    ctx.fillText("Lives: " + this.lives, 700, 5);

  };

  Game.prototype.moveObjects = function(){

    this.allObjects().forEach(function (object) {
      object.move();
    });
  };

  Game.prototype.wrap = function(pos){
    if(pos[0] > this.DIM_X){
      pos[0] = 0;
    }else if(pos[0] < 0){
      pos[0] = this.DIM_X;
    };
    if(pos[1] > this.DIM_Y){
      pos[1] = 0;
    }else if(pos[1] < 0){
      pos[1] = this.DIM_Y;
    };
  };

  Game.prototype.allObjects = function () {
    return [].concat(this.ships, this.asteroids, this.bullets);
  };

  Game.prototype.checkCollisions = function()
  {
    var game = this;

    this.allObjects().forEach(function (obj1) {
      game.allObjects().forEach(function (obj2) {
        if (obj1 == obj2) {
          // don't allow self-collision
          return;
        }

        if (obj1.isCollidedWith(obj2)) {
          obj1.collideWith(obj2);
        }
      });
    });
  };

  Game.prototype.step = function (){
    ctx.fillStyle = "#fff";
    ctx.font = "48px Orbitron";
    ctx.textBaseline = "top";

    if(this.newGame){

      ctx.fillText("Press 'p' to start", 200, 200);

    }else if(this.lives > 0 && !this.paused){
      this.moveObjects();
      this.checkCollisions();
    }else if(this.lives > 0 && this.paused){
      ctx.fillText("PAUSE", 310, 200);
    }else{
      ctx.fillText("GAME OVER!", 230, 200);
      ctx.font = "20px Orbitron";
      ctx.fillText("Press 'c' to play again", 280, 250);
      var that = this;
      key("c", function () {
        that.reset();
      });
    }
  };

  Game.prototype.remove = function (object) {
    if (object instanceof Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Asteroids.Asteroid) {
      var idx = this.asteroids.indexOf(object);
      this.asteroids.splice(idx, 1);
      this.numAsteroids--;
      if (this.numAsteroids === 0) {
        this.numAsteroids = 2 + this.level;
        this.level += 1;
        this.addAsteroids(this.bigAsteroidRadius, this.numAsteroids);
      }

    } else if (object instanceof Asteroids.Ship) {
      this.ships.splice(this.ships.indexOf(object), 1);
    } else if (object instanceof Asteroids.Explosion){
      this.explosions.splice(this.explosions.indexOf(object), 1);
    }else{
      throw "wtf?";
    }
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > this.DIM_X) || (pos[1] > this.DIM_Y);
  };
})();
