(function(){
  if(typeof window.Asteroids === "undefined"){
    window.Asteroids = {};
  };

  var Util = Asteroids.Util = {};

  Asteroids.Util.inherits = function (ChildClass, ParentClass){
    var Surrogate = function(){};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  // Return a randomly oriented vector with the given length.
  Asteroids.Util.randomVex = function(length){
    var x, y;
      x = length * Math.random();
      y = Math.pow(Math.pow(length, 2) - Math.pow(x, 2),0.5);
    if (Math.random()>0.5){
      x *= -1;
    }
    if (Math.random()>0.5){
      y *= -1;
    }

    return [x,y];
  };

  // Find distance between two points.
 var dist = Util.dist = function (pos1, pos2) {
   return Math.sqrt(
     Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
   );
 };

 // Find the length of the vector.
  var norm = Util.norm = function (vex) {
    return Util.dist([0, 0], vex);
  };

  // Normalize the length of the vector to 1, maintaining direction.
  var dir = Util.dir = function (vec) {
    var norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  };

  // Scale the length of a vector by the given amount.
 var scale = Util.scale = function (vec, m) {
   return [vec[0] * m, vec[1] * m];
 };

})()
