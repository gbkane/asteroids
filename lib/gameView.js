(function(){
  if(typeof window.Asteroids === "undefined"){
    window.Asteroids = {};
  };

  var GameView = Asteroids.GameView = function(game, ctx){
    this.game = game;
    this.ctx = ctx;
    this.gameOver = false;
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
    var gameView = this;
    window.setInterval(function(){
      game.draw(ctx);
      game.step();
    }, 30);   //refresh rate

    this.bindKeyHandlers();
  };

  GameView.prototype.bindKeyHandlers = function () {

    var ship = this.game.ships[this.game.ships.length-1];

    Object.keys(GameView.MOVES).forEach(function (k) {
      var move = GameView.MOVES[k];
      key(k, function () {ship.power(move); });
    });

    key("space", function () { ship.fireBullet () });
  };

  GameView.prototype.reset = function () {
    this.game = new Asteroids.Game (this.ctx);
  }
})()
