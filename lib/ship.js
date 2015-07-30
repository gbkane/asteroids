(function(){
  if(typeof window.Asteroids === "undefined"){
    window.Asteroids = {};
  };

  var Ship = Asteroids.Ship = function (pos, game){
    this.color = "#000";
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
  }

})();
