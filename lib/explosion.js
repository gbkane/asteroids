// (function(){
//   if(typeof window.Asteroids === "undefined"){
//     window.Asteroids = {};
//   };
//
//   Asteroids.Explosion = function (pos, game){
//     this.pos = pos;
//     this.game = game;
//     this.img = new Image();
//     this.img.src = './images/boom.png';
//   };
//
//
//
//
// });
(function(){
  if(typeof window.Asteroids === "undefined"){
    window.Asteroids = {};
  };

  var Explosion = Asteroids.Explosion = function (pos, game){

    this.pos = pos;
    this.radius = 75;
    this.game = game
    this.img = new Image ();
    this.img.src = "./images/boom.png";
    this.opacity = 1;
  };

  Asteroids.Util.inherits(Explosion, Asteroids.MovingObject);

  Explosion.prototype.draw = function(ctx){
    // ctx.globalAlpha = this.opacity;
    ctx.drawImage(this.img, this.pos[0] - this.radius, this.pos[1] - this.radius);
    this.opacity -= 0.05;
    if (this.opacity < 0.5){
      this.remove();
      // ctx.globalAlpha = 1;
    }

  };



})();
