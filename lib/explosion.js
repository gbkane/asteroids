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

  var Explosion = Asteroids.Explosion = function (pos, game, radius){

    this.pos = pos;
    this.radius = radius;
    this.game = game
    this.img = new Image ();
    if(radius > 50){
    this.img.src = "./images/boom.png";
    }else{
      this.img.src = "./images/boom2.png";
    }

    this.opacity = 1;
  };

  Asteroids.Util.inherits(Explosion, Asteroids.MovingObject);

  Explosion.prototype.draw = function(ctx){

    if (this.opacity < 0){
      this.remove();
    }
    else{
      ctx.globalAlpha = this.opacity;
      ctx.drawImage(this.img, this.pos[0] - this.radius, this.pos[1] - this.radius);
    }

    this.opacity -= 0.05;
  };



})();
