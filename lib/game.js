(function(){
  if(typeof window.Asteroids === "undefined"){
    window.Asteroids = {};
  };

  var Game = Asteroids.Game = function(){
    this.DIM_X = 800;
    this.DIM_Y = 500;
    this.NUM_ASTEROIDS = 4;
    this.asteroids = [];
    this.bullets = [];
    this.ships = [];
    this.addAsteroids();

  };


  Game.prototype.addAsteroids = function(){
    for(var i = 0; i < this.NUM_ASTEROIDS; i++){
      // this.asteroids.push(new Asteroids.Asteroid(this.randomPosition(), this));
      this.add(new Asteroids.Asteroid(this.randomPosition(), this));
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
    debugger
    return ship;
    // this.ships.push(ship);
  }

  Game.prototype.randomPosition = function(){
    var x = Math.random()*this.DIM_X;
    var y = Math.random()*this.DIM_Y;
    return [x,y];
  };

  Game.prototype.draw = function(ctx){

    ctx.clearRect(0,0,this.DIM_X, this.DIM_Y);
    // for(var i = 0; i < this.NUM_ASTEROIDS; i++){
    //   this.asteroids[i].draw(ctx);
    // };
    // this.ships[0].draw(ctx);

    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
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

          console.log("aaaahhhh!!");
        }
      });
    });
  };

  Game.prototype.step = function (){
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function (object) {
    if (object instanceof Asteroids.Asteroid) {
      var idx = this.asteroids.indexOf(object);
      // this.asteroids.splice(idx, 1);
      // this.NUM_ASTEROIDS--;
      // console.log(this.asteroids[idx]);
      // = new Asteroids.Asteroid({ game: this });
    }
  };



})()
