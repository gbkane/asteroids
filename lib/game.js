(function(){
  if(typeof window.Asteroids === "undefined"){
    window.Asteroids = {};
  };

  var Game = Asteroids.Game = function(){
    this.DIM_X = 800;
    this.DIM_Y = 500;
    this.NUM_ASTEROIDS = 10;
    this.asteroids = [];
    this.addAsteroids();
  };

  Game.prototype.addAsteroids = function(){
    for(var i = 0; i < this.NUM_ASTEROIDS; i++){
      this.asteroids.push(new Asteroids.Asteroid(this.randomPosition(), this));
    };
  };

  Game.prototype.randomPosition = function(){
    var x = Math.random()*this.DIM_X;
    var y = Math.random()*this.DIM_Y;
    return [x,y];
  };

  Game.prototype.draw = function(ctx){

    ctx.clearRect(0,0,this.DIM_X, this.DIM_Y);
    for(var i = 0; i < this.NUM_ASTEROIDS; i++){
      this.asteroids[i].draw(ctx);
    };
  };

  Game.prototype.move = function(){
    for(var i = 0; i < this.NUM_ASTEROIDS; i++){
      this.asteroids[i].move();
    };
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

})()
