var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 550;
canvas.height = 455;
document.body.appendChild(canvas);

//pozadinska slika
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/pozadinaCopy.jpg";

//hero slika
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};
heroImage.src = "images/hero2.png";

//čudovište slika
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
    monsterReady = true;
};
monsterImage.src = "images/monster.gif";

//game objects
var hero = {
    speed: 500 //brzina igrača
};
var monster = {};
var monsterCaught = 0; //početni rezultat

var keysDown = {};


addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);


//resetiraj  igru kad igrač uhvati čudovište
var reset = function () {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
};

//update game objects
var update = function (modifier) {
    if (38 in keysDown) {  //igrač drži tipku za ići gore
        hero.y -= hero.speed * modifier;
    }
    if (40 in keysDown) {  //igrač drži tipku za ići dolje
        hero.y += hero.speed * modifier;
    }
    if (37 in keysDown) {  //igrač drži tipku za ići lijevo
        hero.x -= hero.speed * modifier;
    }
    if (39 in keysDown) {  //igrač drži tipku za ići desno
        hero.x += hero.speed * modifier;
    }

    if (
        hero.x <= (monster.x + 32)
        && monster.x <= (hero.x + 32)
        && hero.y <= (monster.y + 32)
        && monster.y <= (hero.y + 32)
    ) {
        ++monsterCaught;
        reset();
    }
};

//prikaži sve
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y);
    }
    if (monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }

    //rezultat
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Čudovišta ulovljeno: " + monsterCaught, 32, 32);
};

//game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();

    then = now;

    requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now();
reset();
main();