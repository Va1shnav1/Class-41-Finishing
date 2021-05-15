var form, game, player;
var database;
var player, form, game;
var GS = 0;
var pCount = 0;
var allPlayers ;
var p1, p2, p3;
var cars;
var wCar, rCar;
var finished=false;
var gold, silver, bronze;
var bCar;
//var lCar;
var Ground;
var Track;
var finishedPlayers=0;
function preload(){
wCar = loadImage("Images/car1.png");
rCar = loadImage("Images/car2.png");
bCar = loadImage("Images/car3.png");
Ground = loadImage("Images/ground.png");
Track = loadImage("Images/track.jpg");
gold = loadImage("Images/gmedal.png");
silver = loadImage("Images/smedal.png");
bronze = loadImage("Images/bmedal.png");
}
function setup(){
    createCanvas(displayWidth, displayHeight);
    database = firebase.database();
    game = new Game();
    game.getState();
    game.start();
}
function draw(){
    background(255);
    if(pCount===3 && finishedPlayers===0){
        game.updateState(1);
    }
   if(GS===1){
       clear();
       game.play();
   }
   if(finishedPlayers===3){
       game.updateState(2);
   }
   if(GS===2 && finishedPlayers===3){
       game.end()
   }
}