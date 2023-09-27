let can = document.getElementById("table");
let draw = can.getContext('2d');

const ball = {
    x : can.width/2,
    y : can.height/2,
    radius : 10,
    velX : 5,
    velY : 5,
    speed : 7,
    color : "Green"

}

const sep = {
    x : (can.width -2)/2,
    y : 0,
    height : 10,
    width : 2,
    color : "white"
}

const user = {
x : 0,
y :(can.height - 100)/2,
width : 10,
height : 100,
score : 0,
color : "red"
}

const cpu = {
    x : can.width -10,
    y : (can.height - 100)/2,
    width : 10,
    height : 100,
    score : 0,
    color : "red"
}

function drawRectangle(x,y,w,h,color){
    draw.fillStyle = color;
    draw.fillRect(x,y,w,h);
}

function drawCircle(x,y,r,color){
    draw.fillStyle = color;
    draw.beginPath();
    draw.arc(x,y,r,0,Math.PI*2,true);
    draw.closePath();
    draw.fill();
}

can.addEventListener("mousemove",getMousePos);

function getMousePos(evt){
    let rect = can.getBoundingClientRect();
    user.y = evt.clientY - rect.top - user.height/2;
}

function drawScore(text,x,y){
  draw.fillStyle = "white";
  draw.font = "60px Arial";
  draw.fillText(text,x,y);
}

function drawSeparator(){
    for(let i = 0; i<=can.height ; i+=20){
        drawRectangle(sep.x ,sep.y +i,sep.width,sep.height,"white");
    }
}


function restart(){
    ball.x = can.width/2;
    ball.y = can.height/2;
    ball.velX = -ball.velX;
    ball.speed = 5;
}




function detect_collision(ball,player){
    player.top = player.y;
    player.bottom = player.y + player.height;
    player.left = player.x;
    player.right = player.x + player.width;
    
    ball.top = ball.y - ball.radius;
    ball.bottom = ball.y + ball.radius;
    ball.left = ball.x - ball.radius;
    ball.right = ball.x + ball.radius;
   
    return player.left < ball.right && player.top < ball.bottom && player.right > ball.left && player.bottom >ball.top;
}


function cpu_movement(){
    if(cpu.y<ball.y){
        cpu.y+=5;
    }
    else{
        cpu.y-=5;
    }
}


function update(){
    if(ball.x - ball.radius < 0){
        cpu.score++;
        if(cpu.score == 10){
            draw.fillText("Computer won the game",10,20);
            s
        }
        
        restart();

    }
    else if(ball.x + ball.radius > can.width){
        user.score++;
        if(user.score == 10){
            draw.fillText("User won the game",x,y);
            exit;
        }
    
        restart();
    }

    ball.x += ball.velX;
    ball.y += ball.velY;

    cpu_movement();
    if(ball.y - ball.radius < 0 || ball.y + ball.radius > can.height){
        ball.velY = -ball.velY;

    }

    let player = (ball.x + ball.radius <can.width/2)? user : cpu;

    if(detect_collision(ball,player)){
        let collidePoint = (ball.y - (player.y + player.height/2));

        collidePoint = collidePoint / (player.height/2);
        
        let angleRad = (Math.PI/4) * collidePoint;

        let direction = (ball.x + ball.radius < can.width/2) ? 1 : -1;
        ball.velX = direction * ball.speed * Math.cos(angleRad);
        ball.velY = ball.speed * Math.sin(angleRad);

        ball.speed += 0.1;
    }

}



function helper(){
    drawRectangle(0,0,can.width,can.height,"black");
    drawScore(user.score,can.width/4,can.height/5);
    drawScore(cpu.score,3*can.width/4,can.height/5);
    drawSeparator();
    drawRectangle(user.x,user.y,user.width,user.height,user.color);
    drawRectangle(cpu.x,cpu.y,cpu.width,cpu.height,cpu.color);
    drawCircle(ball.x,ball.y,ball.radius,ball.color);
}


function call_back(){
    update();
    helper();
}

let fps = 50;
let looper = setInterval(call_back,1000/fps);