(function(){
  if(typeof window.Asteroids === "undefined"){
    window.Asteroids = {};
  };

  var Game = Asteroids.Game = function(){
    this.DIM_X = 800;
    this.DIM_Y = 500;
    this.NUM_ASTEROIDS = 2;
    this.asteroids = [];
    this.bullets = [];
    this.ships = [];
    this.addAsteroids();
    this.BG_COLOR = "#031159"
    this.level = 1;
    this.score = 0;
    this.lives = 5;
    this.addShip();
  };

  Game.prototype.reset = function (){
    this.NUM_ASTEROIDS = 2;
    this.level = 1;
    this.score = 0;
    this.lives = 5;
  };

  Game.prototype.addAsteroids = function(){
    for(var i = 0; i < this.NUM_ASTEROIDS; i++){
      // this.asteroids.push(new Asteroids.Asteroid(this.randomPosition(), this));
      var asteroid = new Asteroids.Asteroid;
  	  asteroid.pos = this.randomPosition(asteroid);
  	  asteroid.game = this;
  	  this.add(asteroid);
    };
  };

  Game.prototype.add = function (object) {
    if (object instanceof Asteroids.Asteroid) {
      this.asteroids.push(object);
    } else if (object instanceof Asteroids.Bullet) {
      this.bullets.push(object);
    } else if (object instanceof Asteroids.Ship) {
      this.ships.push(object);
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

  Game.prototype.draw = function(ctx){

    ctx.clearRect(0,0,this.DIM_X, this.DIM_Y);
    ctx.fillStyle = this.BG_COLOR;
    ctx.fillRect(0,0,this.DIM_X, this.DIM_Y);

    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });

    ctx.fillStyle = "#fff";
    ctx.font = "20px serif";
    ctx.textBaseline = "top";
    ctx.fillText("Level: " + this.level, 5, 5);
    ctx.fillText("Score: " + this.score, 350, 5);
    ctx.fillText("Lives: " + this.lives, 730, 5);

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
    if(this.lives > 0){
      this.moveObjects();
      this.checkCollisions();
    }else{
      ctx.fillStyle = "#fff";
      ctx.font = "48px serif";
      ctx.textBaseline = "top";
      ctx.fillText("GAME OVER!", 250, 200);
      var that = this;
      key("y", function () {
        that.reset();

        return;
      });
    }
  };

  Game.prototype.remove = function (object) {
    if (object instanceof Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Asteroids.Asteroid) {
      var idx = this.asteroids.indexOf(object);
      this.asteroids.splice(idx, 1);
      this.NUM_ASTEROIDS--;
      if (this.NUM_ASTEROIDS === 0) {
        this.NUM_ASTEROIDS = 2 + this.level;
        this.level += 1;
        this.addAsteroids();
      }

      // this.asteroids[idx] = new Asteroids.Asteroid({ game: this });
    } else if (object instanceof Asteroids.Ship) {
      this.ships.splice(this.ships.indexOf(object), 1);
    } else {
      throw "wtf?";
    }
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > this.DIM_X) || (pos[1] > this.DIM_Y);
  };
})();
