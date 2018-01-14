
document.addEventListener("DOMContentLoaded", function(event) {
  window.WIDTH        = 800;
  window.HEIGHT       = 600;
  window.SPEED_FACTOR = 5;

  var app = new PIXI.Application({ width: WIDTH, height: HEIGHT });

  app.view.style = "margin: 0 auto; display: block;"

  document.body.appendChild(app.view);

  Keyboard.initialize();

  // setup the game elements

  var ball         = new Ball(app);
  var left_paddle  = new Paddle(app, WIDTH/10);
  var right_paddle = new Paddle(app, WIDTH - WIDTH/10);
  var window_obj   = {};
  window_obj.x = 0;
  window_obj.y = 0;
  window_obj.width  = WIDTH;
  window_obj.height = HEIGHT;

  Keyboard.on('w', right_paddle.up  .bind(right_paddle));
  Keyboard.on('s', right_paddle.down.bind(right_paddle));

  app.ticker.add(function() {
    // check for collisions
    if (
      rect_overlap(ball.ball, right_paddle.paddle) ||
      rect_overlap(ball.ball, left_paddle.paddle) ||
      !rect_overlap(ball.ball, window_obj)
    ) {
      ball.speed[0] *= -1;
      ball.speed[1] *= -1;
    }

    // move objects
    ball.update();
    left_paddle.update();
    right_paddle.update();
  });
});

//
//
//

function rect_overlap(a, b) {
  var a_left   = a.x;
  var a_right  = a.x + a.width;
  var a_top    = a.y;
  var a_bottom = a.y + a.height;

  var b_left   = b.x;
  var b_right  = b.x + b.width;
  var b_top    = b.y;
  var b_bottom = b.y + b.height;

  var x_overlap = (
    (a_left  > b_left && a_left  < b_right) ||
    (a_right > b_left && a_right < b_right)
  );

  var y_overlap = (
    (a_top    > b_top && a_top    < b_bottom) ||
    (a_bottom > b_top && a_bottom < b_bottom)
  );

  return x_overlap && y_overlap;
}

function distance(a, b) {
  var x = a.x - b.x;
  var y = a.y - b.y;

  return Math.sqrt(x*x + y*y);
}

//
//
//

Ball = function(app) {
  this.ball = new PIXI.Graphics();
  this.ball.beginFill(0x5cafe2);
  this.radius = 20;
  this.ball.drawRect(0, 0, this.radius, this.radius);
  this.ball.x = WIDTH/2.0;
  this.ball.y = HEIGHT/2.0;

  this.speed = [SPEED_FACTOR/2, -SPEED_FACTOR/3];

  app.stage.addChild(this.ball);

  return this;
}

Ball.prototype.update = function() {
  this.ball.x += this.speed[0];
  this.ball.y += this.speed[1];

  // TODO check for collision
}

//
//
//

Paddle = function(app, x) {
  this.paddle = new PIXI.Graphics();
  this.paddle.beginFill(0x5cafe2);
  this.paddle.drawRect(0, 0, 8, 60);
  this.paddle.x = x;
  this.paddle.y = HEIGHT/2.0 - 30;

  this.speed = [0, 0];

  app.stage.addChild(this.paddle);

  return this;
}

Paddle.prototype.update = function() {
  this.paddle.x += this.speed[0];
  this.paddle.y += this.speed[1];
}

Paddle.prototype.up = function() {
  this.speed[1] = -SPEED_FACTOR;
}

Paddle.prototype.down = function() {
  this.speed[1] = SPEED_FACTOR;
}
