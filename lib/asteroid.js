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
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (object){
    if (object instanceof Asteroids.Ship) {
      object.relocate();
    }
  };
})();
