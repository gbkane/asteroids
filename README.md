# ASTEROIDS [Play Game](http://gregorykane.co/asteroids)

This is a game based on the arcade classic built for the browser
using JavaScript and HTML5 Canvas.  The ship and asteroids will
wrap around the canvas, but the bullets will fly off.


### Collisions

The collisions of all objects are based on the proximity of the
center of an object to another being no closer than the sum of two
radii. This of course assumes that every object is a circle, which
is close enough to true to work well.

### Ship Movement & Firing

The ship can move in any direction through acceleration. It will
maintain a velocity in a given direction until it is decelerated
with an impulse in the opposite direction.  

Originally the bullet firing was set to be in the normal direction
of the ships movement.  This made game play overly difficult, so it
was changed to fire vertically up the screen.  The bullets are also
given a horizontal velocity equivalent to the ships horizontal speed.
The vertical velocity of the bullets is also dependent on the ship's
current vertical velocity.


### To Do's

* [x] Split asteroids into smaller ones on first impact
* [x] Add explosions for hit asteroids
* [x] Bind arrow keys for a secondary ship movement
* [x] Time delay after ship is hit
* [ ] Allow for 2-player mode
* [ ] Keep track of high score with user initials input
