(function(){
  if(typeof window.Asteroids === "undefined"){
    window.Asteroids = {};
  };

  var GameView = Asteroids.GameView = function(game, ctx){
    this.game = game;
    this.ctx = ctx;
    this.ship = this.game.addShip();

  };

  GameView.MOVES = {
    "w": [ 0, -1],
    "a": [-1,  0],
    "s": [ 0,  1],
    "d": [ 1,  0]
  }

  GameView.prototype.start = function(){
    var game = this.game;
    var ctx = this.ctx;
    window.setInterval(function(){
      game.draw(ctx);
      game.step();
      // game.move();
    }, 30);

    this.bindKeyHandlers();
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.ship;

    Object.keys(GameView.MOVES).forEach(function (k) {
      var move = GameView.MOVES[k];
      key(k, function () {ship.power(move); });
    });

    key("space", function () { ship.fireBullet () });
  };
})()
