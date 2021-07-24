var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var gameState = "end"


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");

}

function setup() {
  createCanvas(600, 600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup=createGroup();
  climbersGroup=createGroup();
  invisibleBlockGroup=createGroup();
  ghost=createSprite(300,300,50,50);
  ghost.addImage("ghost" , ghostImg);
  ghost.scale=0.3;
}

function draw() {
  background(200);
  if (gameState==="play"){

  
  if (keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
  if (keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  if (keyDown("space")){
    ghost.velocityY=-5
  }
  ghost.velocityY=ghost.velocityY+0.5;
  if(tower.y > 400){
      tower.y = 300
    }
    spawndoors()
    if (climbersGroup.isTouching(ghost)){
      ghost.velocityY=0;
    }
    if (invisibleBlockGroup.isTouching(ghost) || ghost.Y>600){
      ghost.destroy();
      gameState="end"
    }
    drawSprites()
  }
  
  if (gameState==="end"){
    tower.destroy();
    climbersGroup.destroyEach();
    doorsGroup.destroyEach();
    invisibleBlockGroup.destroyEach();
    stroke("yellow");
    fill ("yellow")
    textSize(30);
    text(300,300);

  }
}

function spawndoors() {
if (frameCount % 240===0){
  door=createSprite(200,-50);
  door.velocityY=1;
  door.addImage(doorImg);
  door.x=Math.round(random(100,400));
  door.lifetime=600;
  doorsGroup.add(door);

  climber=createSprite(200,10);
  climber.velocityY=1;
  climber.addImage(climberImg);
  climber.x=door.x
  climber.lifetime=600;
  climbersGroup.add(climber);

  invisibleBlock=createSprite(200,10);
  invisibleBlock.velocityY=1;
  invisibleBlock.x=door.x
  invisibleBlock.lifetime=600;
  invisibleBlockGroup.add(invisibleBlock);
  invisibleBlock.debug=true;
  invisibleBlock.width=climber.width;
  invisibleBlock.height=2;
  ghost.depth=door.depth;
  ghost.depth=ghost.depth+1;

}
}
