
document.addEventListener("DOMContentLoaded", function(event) {
  window.WIDTH  = 800;
  window.HEIGHT = 600;

  var app = new PIXI.Application({ width: WIDTH, height: HEIGHT });

  app.view.style = "margin: 0 auto; display: block;"

  document.body.appendChild(app.view);

  Keyboard.initialize();

  // setup the game elements

  ball         = new Ball(app);
  left_paddle  = new Paddle(app, WIDTH/10);
  right_paddle = new Paddle(app, WIDTH - WIDTH/10);

  Keyboard.on('w', right_paddle.up  .bind(right_paddle));
  Keyboard.on('s', right_paddle.down.bind(right_paddle));

  app.ticker.add(function() {
    // check for collisions
    if (ball.ball.x >= right_paddle.paddle.x) {
      ball.speed[0] = -1
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

Ball = function(app) {
  this.ball = new PIXI.Graphics();
  this.ball.beginFill(0x5cafe2);
  this.ball.drawRect(0, 0, 20, 20);
  this.ball.x = WIDTH/2.0;
  this.ball.y = HEIGHT/2.0;

  this.speed = [1, 0];

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
  this.speed[1] = -2;
}

Paddle.prototype.down = function() {
  this.speed[1] = 2;
}
