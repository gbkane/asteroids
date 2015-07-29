(function(){
  if(typeof window.Asteroids === "undefined"){
    window.Asteroids = {};
  };

  var GameView = Asteroids.GameView = function(game, ctx){
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function(){
    var game = this.game;
    var ctx = this.ctx;
    window.setInterval(function(){
      game.draw(ctx);
      game.move();}, 20);
  };
})()
