
const canvas = document.getElementById("Paddlebouncer");
const context = canvas.getContext("2d");

let count = 0;

const user = {
  x: 250,
  y: 385,
  width: 100,
  height: 15,
  color: "white",
  score:0
}

const ball = {
  x: canvas.width/2,
  y: canvas.height/2,
  radius: 15,
  speed: 5,
  velocityX: 5, 
  velocityY: 5,
  color: "WHITE",
}

const obstacle1 = {
  x: 200,
  y: 100,
  width: 50,
  height: 50,
  color: "WHITE",
}


function drawRect(x, y, w, h, color){
  context.fillStyle = color;
  context.fillRect(x, y, w, h);
}


function drawCircle(x, y, r, color){
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, r, 0, Math.PI*2, false);
  context.closePath();
  context.fill();
}


function drawText(text, x, y, color){
  context.fillStyle = color;
  context.font = "75px fantasy";
  context.fillText(text, x, y);
}

function update(){
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;
  if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0){
    ball.velocityX*=-1; 
  }
  if(collision(ball, user)){
    let collidePoint = (ball.x - (user.x + user.width/2));
    collidePoint = collidePoint/(user.width/2);
    let angleRad = (Math.PI/4)*collidePoint;
    //direction maybe let direction = -1* -1 idk
    ball.velocityX = ball.speed*Math.sin(angleRad);
    ball.velocityY = -ball.speed*Math.cos(angleRad); //-
    ball.speed += 0.2;
  }
  if(collision(ball, obstacle1)){
    //if(ball.y-ball.radius<obstacle1.y+obstacle1.height){
     // ball.velocityY*=-1;
    //}
    if(ball.y+ball.radius>obstacle1.y && ball.y-ball.radius<obstacle1.y && ball.x+ball.radius-5>obstacle1.x && ball.x-ball.radius+5<obstacle1.x+obstacle1.width){//top collision 
      ball.velocityY*=-1; //+5 improves the physics stopping the ball from logging a side and top hit at the same time work on more infinite solution
    }
    if(ball.y+ball.radius>obstacle1.y+obstacle1.height && ball.y-ball.radius<obstacle1.y+obstacle1.height && ball.x+ball.radius-5>obstacle1.x && ball.x-ball.radius+5<obstacle1.x+obstacle1.width){//bottom collision 
      ball.velocityY*=-1;
    }
    if(ball.x+ball.radius>obstacle1.x && ball.x-ball.radius<obstacle1.x && ball.y+ball.radius-5>obstacle1.y && ball.y-ball.radius+5<obstacle1.y+obstacle1.height){//left collision
      ball.velocityX*=-1;
    }
    if(ball.x+ball.radius>obstacle1.x+obstacle1.width && ball.x-ball.radius<obstacle1.x+obstacle1.width && ball.y+ball.radius-5>obstacle1.y && ball.y-ball.radius+5<obstacle1.y+obstacle1.height){//right collision
      ball.velocityX*=-1;
    }
    ball.speed += 0.2;
 }
  
  count++;
  if(count%50===0){
    user.score += 1;
  }
  
  if(ball.y - ball.radius < 0){
    ball.velocityY*=-1;
  }
  
  if(ball.y + ball.radius > canvas.height){
    resetBall();
    user.score = 0;
    count=0
  }
}

canvas.addEventListener("mousemove", movePaddle); 
function movePaddle(evt){
  let rect = canvas.getBoundingClientRect();
  
  user.x = evt.clientX - rect.left - user.width/2;
}
  function resetBall(){//add a wait
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.speed = 5;
    ball.velocityY = -ball.velocityY;
  }

function collision(b, p){
  p.top = p.y;
  p.bottom = p.y + p.height;
  p.left = p.x;
  p.right = p.x + p.width;
  
  b.top = b.y - b.radius;
  b.bottom = b.y + b.radius;
  b.left = b.x - b.radius;
  b.right = b.x + b.radius;
  
  return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom;
} 


function render(){
  drawRect(0, 0, canvas.width, canvas.height, "BLACK");
  drawText(user.score, 3*canvas.width/4, canvas.height/5, "WHITE");
  drawRect(user.x, user.y, user.width, user.height, user.color);
  drawRect(obstacle1.x, obstacle1.y, obstacle1.width, obstacle1.height, obstacle1.color);
  drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

function game(){
  update(); //movements collision score 
  render();
}

const framePerSecond = 50;
setInterval(game, 1000/framePerSecond); //calls game() 50 times every second/1000ms/1s

















