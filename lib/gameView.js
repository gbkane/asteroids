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
    "d": [ 1,  0],
    "up": [ 0, -1],
    "left": [-1,  0],
    "down": [ 0,  1],
    "right": [ 1,  0]
  }

  GameView.prototype.start = function(){
    var game = this.game;
    var ctx = this.ctx;
    var gameView = this;

    var img = new Image();
    img.src = './images/space2.jpg';
    var yOffset = -500;

    img.onload = function (){
      gameView.ctx.drawImage(img, 0, 0);
    };


    window.setInterval(function(){
      var scrollSpeed = game.level;

      yOffset += scrollSpeed;
      if(yOffset >= 0){ yOffset = -500 };
        if(!game.paused && game.lives > 0){
          game.draw(gameView.ctx, img, yOffset);
        }else if(game.lives === 0){
          yOffset -= scrollSpeed;
          game.draw(gameView.ctx, img, yOffset);
        }
        game.step();
    }, 30);   //refresh rate

    this.bindKeyHandlers();
  };

  GameView.prototype.bindKeyHandlers = function () {
    var game = this.game
    var ship = game.ships[game.ships.length-1];

    Object.keys(GameView.MOVES).forEach(function (k) {
      var move = GameView.MOVES[k];
      key(k, function () {
        event.preventDefault();
        ship.power(move);
      });
    });

    key("space", function () {
      event.preventDefault();
      // if (!ship.hit){
        ship.fireBullet ()
      // }
    });
    key("p", function(){
      game.newGame = false;
      if(game.paused === false){
        game.paused = true
      }else {
        game.paused = false;
      }
    });
  };

  GameView.prototype.reset = function () {
    this.game = new Asteroids.Game (this.ctx);
  }
})()
