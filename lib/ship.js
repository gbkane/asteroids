(function () {
  if(typeof window.Asteroids === "undefined"){
    window.Asteroids = {};
  };

  var Ship = Asteroids.Ship = function (pos, game){
    this.color = "#D3D3D3";
    this.radius = 20;
    this.pos = pos;
    this.vel = [0,0];
    this.game = game;
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

})();
