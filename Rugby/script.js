
var gameTime = 0
if(gameTime < 450){
var canvasField = document.getElementById("canvasField");opposition
var ctx1 = canvasField.getContext("2d");

var canvasPlay = document.getElementById("canvasPlay");
var ctx2 = canvasPlay.getContext("2d");

var canvasBall = document.getElementById("canvasBall");
var ctx3 = canvasBall.getContext("2d");

var opposition = document.getElementById("opposition");
var ctx4 = opposition.getContext("2d");

var tryScore = 7;
var score = 0;

var knockOn = 0;

var knockOnCount = 0;
var tackleCount = 0;

var yPosUp = 0;
var yPosDown = 0;
var xPosRight = 50;
var xPosLeft = 50;

var keepInTouch = 1;
var tryline = 0;

var currentPos = 0;

var tackleChance = 0;
var slipTackleChance = 0;

ctx1.lineWidth = 5;

ctx1.strokeStyle = "white";


drawField();
drawPlayers();
drawBall();
drawOpposition();

function drawOpposition(){
    //player 1
    ctx4.beginPath();
    ctx4.fillStyle = "black";
    ctx4.arc(50 , 130, 3, 0, 2 * Math.PI);
    ctx4.fill();
    //payer 2
    ctx4.beginPath();
    ctx4.fillStyle = "black";
    ctx4.arc(100, 130, 3, 0, 2 * Math.PI);
    ctx4.fill();
    //p4ayer 3
    ctx4.beginPath();
    ctx4.fillStyle = "black";
    ctx4.arc(150, 130, 3, 0, 2 * Math.PI);
    ctx4.fill();
    //payer 4
    ctx4.beginPath();
    ctx4.fillStyle = "black";
    ctx4.arc(200, 130, 3, 0, 2 * Math.PI);
    ctx4.fill();
    //payer 5
    ctx4.beginPath();
    ctx4.fillStyle = "black";
    ctx4.arc(250, 130, 3, 0, 2 * Math.PI);
    ctx4.fill();
    //payer 6
    ctx4.beginPath();
    ctx4.fillStyle = "black";
    ctx4.arc(300, 130, 3, 0, 2 * Math.PI);
    ctx4.fill();
}
function drawBall(){
    ctx3.beginPath();
    ctx3.fillStyle = "white";
    ctx3.arc(50 , 330, 2, 0, 2 * Math.PI);
    ctx3.fill();
}
function movePlayersUp(){
    ctx2.clearRect(0, 0, canvasPlay.width, canvasPlay.height);
    ctx3.clearRect(0, 0, canvasBall.width, canvasBall.height);
    ctx4.clearRect(0, 0, opposition.width, canvasBall.height);
    yPosUp = -6;
    currentPos += yPosUp;
    tryline ++;
    if (tryline >= 0 && tryline <= 50){
        ctx2.translate(0, yPosUp);
        ctx3.translate(0, yPosUp);
        if(currentPos > -102){
            ctx4.translate(0, Math.abs(yPosUp));
        }
        
        if(currentPos == -102){
            tackleChance = Math.floor((Math.random() * 6) + 1);
            if(tackleChance <= 6 - slipTackleChance){
                ctx2.translate(0, Math.abs(currentPos));
                ctx3.translate(0, Math.abs(currentPos));
                ctx4.translate(0, currentPos + 6);
                ctx2.clearRect(0, 0, canvasPlay.width, canvasPlay.height);
                ctx3.clearRect(0, 0, canvasBall.width, canvasBall.height);
                ctx4.clearRect(0, 0, opposition.width, canvasBall.height);
                currentPos = 0;
                tryline = 0;
                document.getElementById("Commentator").innerHTML ="Great Tackle";
                tackleCount ++;
            }
            else{
                document.getElementById("Commentator").innerHTML ="Slipped the Tackle" + " " + gameTime;
                ctx4.clearRect(0, 0, opposition.width, canvasBall.height);
                slipTackleChance = 0;
            }
        }
        if(currentPos < -102){
            ctx4.clearRect(0, 0, opposition.width, canvasBall.height);
        }
    }else{
        tryline = 50;
        ctx2.translate(0, 0);
    }
    if(tryline >= 50){
        document.getElementById("Commentator").innerHTML ="TRY!!!";
        document.getElementById("Score").innerHTML = score += tryScore;
        ctx2.translate(0, 300);
        ctx3.translate(0, 300);
        ctx4.translate(0, -96);
        ctx2.clearRect(0, 0, canvasPlay.width, canvasPlay.height);
        ctx3.clearRect(0, 0, canvasBall.width, canvasBall.height);
        ctx4.clearRect(0, 0, opposition.width, canvasBall.height);
        tryline = 0;
        currentPos = 0;
    }else{
       // document.getElementById("Commentator").innerHTML =currentPos; 
    }
}

function passRight(){
    slipTackleChance = Math.floor((Math.random() * 6) + 1);
    if(slipTackleChance > 6){
        slipTackleChance = 0;
    }
    ctx2.clearRect(0, 0, canvasPlay.width, canvasPlay.height);
    ctx3.clearRect(0, 0, canvasBall.width, canvasBall.height);
    keepInTouch ++;
    if(keepInTouch <= 6 && keepInTouch >= 1 ){
        ctx3.translate(50, 0);
        var knockOn = Math.floor((Math.random() * 10) + 1);
        if(knockOn ==  keepInTouch){
            document.getElementById("Commentator").innerHTML ="Knock Forward!!!"
            ctx2.translate(0, Math.abs(currentPos));
            ctx3.translate(0, Math.abs(currentPos));
            ctx4.translate(0, currentPos);
            ctx2.clearRect(0, 0, canvasPlay.width, canvasPlay.height);
            ctx3.clearRect(0, 0, canvasBall.width, canvasBall.height);
            ctx4.clearRect(0, 0, opposition.width, canvasBall.height);
            currentPos = 0;
            tryline = 0;
            knockOnCount++;
        }else{
            document.getElementById("Commentator").innerHTML ="Great Offload";
        }
    }else if(keepInTouch > 6){
        keepInTouch = 6;
        ctx3.translate(0, 0);
    }
}
function passLeft(){
    slipTackleChance = Math.floor((Math.random() * 6) + 1);
    if(slipTackleChance > 6){
        slipTackleChance = 0;
    }
    ctx2.clearRect(0, 0, canvasPlay.width, canvasPlay.height);
    ctx3.clearRect(0, 0, canvasBall.width, canvasBall.height);
    keepInTouch --;
    if(keepInTouch >= 1 && keepInTouch <= 6){
        ctx3.translate(-50, 0);
        var knockOn = Math.floor((Math.random() * 10) + 1);
        if(knockOn ==  keepInTouch){
            document.getElementById("Commentator").innerHTML ="Knock Forward!!!";
            
            ctx2.translate(0, Math.abs(currentPos));
            ctx3.translate(0, Math.abs(currentPos));
            ctx4.translate(0, currentPos);
            ctx2.clearRect(0, 0, canvasPlay.width, canvasPlay.height);
            ctx3.clearRect(0, 0, canvasBall.width, canvasBall.height);
            ctx4.clearRect(0, 0, opposition.width, canvasBall.height);
            currentPos = 0;
            tryline = 0;
            knockOnCount++;
        }else{
            document.getElementById("Commentator").innerHTML ="Great Offload";
        }
    } else if(keepInTouch < 1){
        keepInTouch = 1;
        ctx3.translate(0, 0);
    }
}
function drawField(){
    //left side line
    ctx1.beginPath();
    ctx1.moveTo(0, 0);
    ctx1.lineTo(0, 600);
    ctx1.stroke();

    //right side line
    ctx1.beginPath();
    ctx1.moveTo(350, 0);
    ctx1.lineTo(350, 600);
    ctx1.stroke();

    //top try line
    ctx1.beginPath();
    ctx1.moveTo(0, 30);
    ctx1.lineTo(350, 30);
    ctx1.stroke();

    //bottom try line
    ctx1.beginPath();
    ctx1.moveTo(0, 570);
    ctx1.lineTo(350, 570);
    ctx1.stroke();

    //halfway line
    ctx1.beginPath();
    ctx1.moveTo(0, 300);
    ctx1.lineTo(350, 300);
    ctx1.stroke();

    //22 line top
    ctx1.beginPath();
    ctx1.strokeStyle = "yellow";
    ctx1.moveTo(0, 130);
    ctx1.lineTo(350, 130);
    ctx1.lineWidth = 1;
    ctx1.stroke();

    //22 line bottom
    ctx1.beginPath();
    ctx1.strokeStyle = "yellow";
    ctx1.moveTo(0, 475);
    ctx1.lineTo(350, 475);
    ctx1.lineWidth = 1;
    ctx1.stroke();

    //10 line top
    ctx1.beginPath();
    ctx1.strokeStyle = "yellow";
    ctx1.moveTo(0, 240);
    ctx1.lineTo(350, 240);
    ctx1.lineWidth = 1;
    ctx1.stroke();

    //10 line bottom
    ctx1.beginPath();
    ctx1.strokeStyle = "yellow";
    ctx1.moveTo(0, 360);
    ctx1.lineTo(350, 360);
    ctx1.lineWidth = 1;
    ctx1.stroke();

    //5 line top
    ctx1.beginPath();
    ctx1.strokeStyle = "grey";
    ctx1.moveTo(0, 60);
    ctx1.lineTo(350, 60);
    ctx1.lineWidth = 1;
    ctx1.stroke();

    //5 line bottom
    ctx1.beginPath();
    ctx1.strokeStyle = "grey";
    ctx1.moveTo(0, 540);
    ctx1.lineTo(350, 540);
    ctx1.lineWidth = 1;
    ctx1.stroke();

    //posts top
    ctx1.beginPath();
    ctx1.strokeStyle = "grey";
    ctx1.moveTo(150, 30);
    ctx1.lineTo(200, 30);
    ctx1.lineWidth = 5;
    ctx1.stroke();

    //posts bottom
    ctx1.beginPath();
    ctx1.strokeStyle = "grey";
    ctx1.moveTo(150, 570);
    ctx1.lineTo(200, 570);
    ctx1.lineWidth = 5;
    ctx1.stroke();
}
function drawPlayers(){
    //player 1
    ctx2.beginPath();
    ctx2.fillStyle = "darkgreen";
    ctx2.arc(50 , 330, 3, 0, 2 * Math.PI);
    ctx2.fill();

    //player 2
    ctx2.beginPath();
    ctx2.fillStyle = "darkgreen";
    ctx2.arc(100, 330, 3, 0, 2 * Math.PI);
    ctx2.fill();

    //player 3
    ctx2.beginPath();
    ctx2.fillStyle = "darkgreen";
    ctx2.arc(150, 330, 3, 0, 2 * Math.PI);
    ctx2.fill();

    //player 4
    ctx2.beginPath();
    ctx2.fillStyle = "darkgreen";
    ctx2.arc(200, 330, 3, 0, 2 * Math.PI);
    ctx2.fill();

    //player 5
    ctx2.beginPath();
    ctx2.fillStyle = "darkgreen";
    ctx2.arc(250, 330, 3, 0, 2 * Math.PI);
    ctx2.fill();

    //player 6
    ctx2.beginPath();
    ctx2.fillStyle = "darkgreen";
    ctx2.arc(300, 330, 3, 0, 2 * Math.PI);
    ctx2.fill();
}

document.onkeydown = function(event) {
    if(event.keyCode == 87){
        gameTime++;
        if(gameTime > 400 && event.keyCode == 87){
            document.getElementById("Commentator").innerHTML ="Full Time!!!";
            ctx2.translate(0, 0);
            ctx3.translate(0, 0);
            ctx4.translate(0, 0);
            ctx2.clearRect(0, 0, canvasPlay.width, canvasPlay.height);
            ctx3.clearRect(0, 0, canvasBall.width, canvasBall.height);
            ctx4.clearRect(0, 0, opposition.width, canvasBall.height);
        }else{
        movePlayersUp();
        drawPlayers();
        drawOpposition();
        drawBall();
        document.getElementById("Time").innerHTML = gameTime / 5 + " min" + "<br>" + "Tackles " + tackleCount + "<br>" + "Forward "+  knockOnCount;
        } 
    }
    if(event.keyCode == 68){
        if(gameTime > 400 && event.keyCode == 68){
            document.getElementById("Commentator").innerHTML ="Full Time!!!";
            ctx2.translate(0, 0);
            ctx3.translate(0, 0);
            ctx4.translate(0, 0);
            ctx2.clearRect(0, 0, canvasPlay.width, canvasPlay.height);
            ctx3.clearRect(0, 0, canvasBall.width, canvasBall.height);
            ctx4.clearRect(0, 0, opposition.width, canvasBall.height);
            
        }else{
        passRight();
        drawPlayers();
        drawOpposition();
        drawBall();
        }
    }
    if(event.keyCode == 65){
        if(gameTime > 400 && event.keyCode == 65){
            document.getElementById("Commentator").innerHTML ="Full Time!!!";
            ctx2.translate(0, 0);
            ctx3.translate(0, 0);
            ctx4.translate(0, 0);
            ctx2.clearRect(0, 0, canvasPlay.width, canvasPlay.height);
            ctx3.clearRect(0, 0, canvasBall.width, canvasBall.height);
            ctx4.clearRect(0, 0, opposition.width, canvasBall.height);
        }else{
        passLeft();
        drawPlayers();
        drawOpposition();
        drawBall();
        }
    }
}

}

