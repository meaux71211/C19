var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3;
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  spookySound.loop();
}

function draw() {
  background(0);
  if(gameState==="play") {

  
  if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("W")) {
      ghost.velocityY = -10;
    }
    ghost.velocityY = ghost.velocityY+  0.8;
    if(keyDown("A")) {
      ghost.x = ghost.x-3;
    }
    if(keyDown("D")) {
      ghost.x = ghost.x+3;
    }
    spawnDoors();
    if(climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600) {
      ghost.destroy();
      gameState = "END";
    }
    drawSprites();
  }
  if(gameState=="END") {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("GAME OVER!!!",230,250);
  }
}
function spawnDoors() {
  if(frameCount%240===0) {
    var door = createSprite(200,-50);
    door.x = Math.round(random(120,400));
    door.velocityY = 1;
    door.addImage("door",doorImg);
    var climber = createSprite(200,10);
    climber.x = door.x;
    climber.velocityY = 1;
    climber.addImage("climber",climberImg);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.x = door.x;
    invisibleBlock.width  = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.velocityY = 1;
    invisibleBlock.lifetime = 800;
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
    climbersGroup.add(climber);
    doorsGroup.add(door);
    ghost.depth = door.depth;
    ghost.depth+=1;
  }
}
