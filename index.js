

function drawRect() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    // ctx.fillStyle = 'green';
    ctx.fillRect(25,25,100,100);
    ctx.clearRect(45,45,60,60);
    ctx.strokeRect(50,50,50,50);
}
drawRect();

function drawTriangle() {
    var canvas = document.getElementById('canvas2');
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    ctx.fill();

}
drawTriangle();

function drawFace() {
    var canvas = document.getElementById('canvas3');
    var ctx = canvas.getContext('2d');
   
    ctx.beginPath();
    ctx.arc(75, 75, 50, 0, Math.PI * 2, true);
    ctx.moveTo(110, 75);
    ctx.arc(75, 75, 35, 0, Math.PI, false);
    ctx.moveTo(65, 65);
    ctx.arc(60, 65, 5, 0, Math.PI * 2, true);
    ctx.moveTo(95, 65);
    ctx.arc(90, 65, 5, 0, Math.PI * 2, true);
    ctx.stroke();
}
drawFace();

function drawArc() {
    var canvas = document.getElementById('canvas4');
    var ctx = canvas.getContext('2d');

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
            ctx.beginPath();
            var x = 25 + j * 50;
            var y = 25 + i * 50;
            var radius = 20;
            var startAngle = 0;
            var endAngle = Math.PI + (Math.PI * j) / 2;
            var anticlockwise = i % 2 === 0 ? false : true;
            
            ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

            if ( i > 1) {
                ctx.fill();
            } else {
                ctx.stroke();
            }

        }
    }
}
drawArc();

function draw() {
    var canvas = document.getElementById('canvas5');
    var ctx = canvas.getContext('2d');

    var rectangle = new Path2D();
    rectangle.rect(10, 10, 50, 50);

    var circle = new Path2D();
     circle.arc(100, 35, 25, 0, 2 * Math.PI);

    ctx.stroke(rectangle);
    ctx.fill(circle);
}
draw();
function write() {
    var canvas = document.getElementById('canvas6');
    var ctx = canvas.getContext('2d');

   ctx.font = "48px serif";
   ctx.strokeText('Hello World', 10, 50);
}
write();

function drawStarCilp() {
    var canvas = document.getElementById('canvas7');
    var ctx = canvas.getContext('2d');
    ctx.fillRect(0,0,150,150);
    ctx.translate(75,75);

    ctx.beginPath();
    ctx.arc(0,0,60,0,Math.PI * 2, true);
    ctx.clip();

    var lingrad = ctx.createLinearGradient(0,-75,0,75)
    lingrad.addColorStop(0, '#232256');
    lingrad.addColorStop(1, '#143778');

    ctx.fillStyle = lingrad;
    ctx.fillRect(-75, -75, 150, 150);

    for( var j = 1; j < 50; j++) {
        ctx.save();
        ctx.fillStyle = '#fff';
        ctx.translate(75 - Math.floor(Math.random() * 150),
            75 - Math.floor(Math.random() * 150));
        drawStar(ctx, Math.floor(Math.random() * 4) + 2);
        ctx.restore();
    }

}
function drawStar(ctx, r) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(r, 0);
    for (var i = 0; i < 9; i++) {
        ctx.rotate(Math.PI / 5);
        if (i % 2 === 0) {
            ctx.lineTo((r / 0.525731) * 0.200811, 0);

        } else {
            ctx.lineTo(r, 0);
        }
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}
drawStarCilp();

var sun = new Image();
var moon = new Image();
var earth = new Image();
function init() {
    sun.src = 'Canvas_sun.png';
    moon.src = 'Canvas_moon.png';
    earth.src = 'Canvas_earth.png';
    window.requestAnimationFrame(drawSun);
}

function drawSun() {
    var ctx = document.getElementById('canvas8').getContext('2d');

    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, 300, 300);

    ctx.fillStyle = 'rgba(0, 0, 0, .4)';
    ctx.strokeStyle = 'rgba(0, 153, 255, .4)';
    ctx.save();
    ctx.translate(150, 150);

    var time = new Date();
    ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
    ctx.translate(105, 0);
    ctx.fillRect(0, -12, 50, 24);
    ctx.drawImage(earth, -12, -12);

    ctx.save();
    ctx.rotate(((2 * Math.PI) / 6) * time.getSeconds()+ ((2 * Math.PI) / 6000) * time.getMilliseconds());
    ctx.translate(0, 28.5);
    ctx.drawImage(moon, -3.5, -3.5);
    ctx.restore();

    ctx.restore();

    ctx.beginPath();
    ctx.arc(150, 150, 105, 0, Math.PI * 2, false);
    ctx.stroke();

    ctx.drawImage(sun, 0, 0, 300, 300);
    window.requestAnimationFrame(drawSun);
}

init();

(function(){
    var canvas = document.getElementById('canvas9');
    var ctx = canvas.getContext('2d');
    var raf;

    var ball = {
        x: 100,
        y: 100,
        vx: 5,
        vy: 2,
        radius: 5,
        color: 'blue',
        draw: function() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    };

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ball.draw();
        ball.x += ball.vx;
        ball.y += ball.vy;
        raf = window.requestAnimationFrame(draw);

        if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
            ball.vy = -ball.vy;
        }

        if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
            ball.vx = -ball.vx;
        }

        ball.vy += .25;

    }

    canvas.addEventListener('mouseover', (e) => {
        raf = window.requestAnimationFrame(draw);
    });

    canvas.addEventListener('mouseout', (e) => {
        window.cancelAnimationFrame(raf);
    });

    ball.draw();

})();
(function() {
    var img = new Image();
    img.src = 'rhino.jpg';
    var canvas = document.getElementById('canvas7');
    var ctx = canvas.getContext('2d');
    // img.onload = function() {
    //     ctx.drawImage(img, 0, 0);
    //     img.style.display = "none";
    // };
    // ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, 100, 100);
    var color = document.getElementById('color');
    function pick(e) {
        var x = e.layerX;
        var y = e.layerY;
        var pixel = ctx.getImageData(x, y, 1, 1);
        var data = pixel.data;
        var rgba = 'rgba(' + data[0] + ',' + data[1] + ',' + data[2] + ',' + data[3] / 255 + ')';
        color.style.background = rgba;
        color.textContent = rgba;
    }
    canvas.addEventListener('mousemove', pick, false);
})();