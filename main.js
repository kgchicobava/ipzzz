var btn = document.getElementById("confirm");
var help = document.getElementById("help");
var modal = document.getElementsByClassName("modal-window")[0];
var result = document.getElementById("result");
var closeModal = document.getElementById("close");
var dotsStorageX = [], dotsStorageY = []; 
var centerStorageX = [], centerStorageY = [];
var counterA = 0;
var counterB = 0;
var counterC = 0;

btn.onclick = function(){
    var radius1 = +document.getElementById("circle1").value;
    var radius2 = +document.getElementById("circle2").value;
    var radius3 = +document.getElementById("circle3").value;
    var qdots = +document.getElementById("dots").value;
    var border = Math.max(radius1, radius2, radius3);
    if (radius1 > 0 && radius1 <= 150 && radius2 > 0 && radius2 <= 150 && radius3 > 0 && radius3 <= 150 && qdots > 0) {
        draw((randomize(150,300)), (randomize(150,450)), radius1, "black");
        draw((randomize(600,750)), (randomize(150,450)), radius2, "black");
        draw((randomize(1050,1200)), (randomize(150,450)), radius3, "black");
    } else {
        alert("Error! Radius must be in interval of 0 and 150. You must input number of dots. Please check your data");
        return;
    }

    if (qdots > 0) {
        for (let i = 0; i < +qdots; i++) {
            drawDots(randomize(5,1300), randomize(5, 600), "red");
        }
    }

    for (let i = 0; i < +qdots; i++) {
        if (distance(dotsStorageX[i], dotsStorageY[i], centerStorageX[0], centerStorageY[0]) < radius1) {
            counterA++;
            } 
        if (distance(dotsStorageX[i], dotsStorageY[i], centerStorageX[1], centerStorageY[1]) < radius2) {
                counterB++;
            }
         if (distance(dotsStorageX[i], dotsStorageY[i], centerStorageX[2], centerStorageY[2]) < radius3) {
                counterC++;
            }
    }
    if ((counterA >= 2) || (counterB >=2) || (counterC >= 2)) {
        result.innerHTML = "True. We have circle with at least two dots in it!"
    } else {
        result.innerHTML = "False. There is no match here!";
    }
    btn.disabled = true;
}



help.onclick = function() {
    modal.style.display = "block";
}

closeModal.onclick = function() {
    modal.style.display = "none";
}

function draw(centerX, centerY, radius, color) {
    centerStorageX.push(centerX);
    centerStorageY.push(centerY);
    var canvas = document.getElementById('holst');
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2*Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawDots(centerX, centerY, color) {
    dotsStorageX.push(centerX);
    dotsStorageY.push(centerY);
    var canvas = document.getElementById('holst');
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(centerX, centerY, 5, 0, 2*Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
}

function randomize(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt( ( ( x2 - x1 ) * ( x2 - x1 ) ) + (( y2 - y1 ) * ( y2 - y1 ) ) );
}
