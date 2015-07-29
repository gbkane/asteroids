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

})()
