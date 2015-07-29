(function(){
  if(typeof window.Asteroids === "undefined"){
    window.Asteroids = {};
  };

  var Asteroid = Asteroids.Asteroid = function (pos, game){
    this.color = "#D3D3D3";
    this.radius = 40;
    this.pos = pos;
    this.vel = Asteroids.Util.randomVex(3);
    this.game = game;
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);





})()
