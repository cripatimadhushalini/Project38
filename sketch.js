var trex,trex_running,trex_collided;
var ground,gI;
var iG;
var obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;

var cloud,cloudG,cloudI;
var goI,rI;

var database;
var playerCount = 0;
var player,game;
var gameState = 0;
var allPlayers;
var player;
var trex5;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  trex_running = loadAnimation("Images/trex1.png", "Images/trex3.png", "Images/trex4.png");
  trex_collided = loadAnimation("Images/trex_collided.png");
  
  gI = loadImage("Images/ground2.png");
  cloudI = loadImage("Images/cloud.png");
  obstacle1 = loadImage("Images/obstacle1.png");
  obstacle2 = loadImage("Images/obstacle2.png");
  obstacle3 = loadImage("Images/obstacle3.png");
  obstacle4 = loadImage("Images/obstacle4.png");
  obstacle5 = loadImage("Images/obstacle5.png");
  obstacle6 = loadImage("Images/obstacle6.png");
  goI = loadImage("Images/gameOver.png");
  rI = loadImage("Images/restart.png");
}

function setup(){
  database = firebase.database();
  createCanvas(displayWidth-20,displayHeight-30);

  trex = createSprite(50,157,10,10);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(80,180,10,10);
  ground.addImage(gI);
  
  go = createSprite(650,100,10,10);
  go.addImage(goI);
  go.scale = 0.5;
  go.visible = false;

  r = createSprite(650,140,10,10);
  r.addImage(rI);
  r.scale = 0.5;
  r.visible = false;

  iG = createSprite(80,185,500,10);
  iG.visible = false;
  
  s = 0;

   game = new Game();
   game.getState();
   game.start();
  
  obstaclesGroup = new Group();
  cloudG = new Group();
}

function draw(){
  background("white");

   //t.display();

   
   if(keyIsDown(UP_ARROW)){
    car1.positioin.x = +20;
}
  
  if(gameState===PLAY){
    ground.velocityX = -4;
    
    trex.changeAnimation("running",trex_running);
  
  if(ground.x<0){
    ground.x = ground.width/2;
    }
    
  
  createClouds();
  createObstacles();
  
  s = s + Math.round(getFrameRate()/60);
    
  trex.velocityY = trex.velocityY+0.8;
  
  if(keyDown("space") && trex.y >= 100){
    trex.velocityY = -10;
  }
    if(obstaclesGroup.isTouching(trex)){
      gameState = END;
    }
    
 }else if(gameState===END){
   ground.velocityX = 0;
   obstaclesGroup.setVelocityXEach(0);
   cloudG.setVelocityXEach(0);
   trex.changeAnimation("collided",trex_collided);
   go.visible = true;
   r.visible = true;
   
   cloudG.setLifetimeEach(-1);
   obstaclesGroup.setLifetimeEach(-1);
   
   if(mousePressedOver(r)){
     reset();
   }
 }
  
  fill("red")
  stroke("yellow");
  textSize(20)
  text("Score:"+s,1150,50);
  
 
  trex.collide(iG);
  drawSprites();
}

function reset(){
  gameState = PLAY;
  obstaclesGroup.destroyEach();
  go.visible = false;
  r.visible = false;
  cloudG.destroyEach();
  s = 0;
}

function createClouds(){
  if(frameCount%60===0){
    cloud = createSprite(1120,60,10,10)
    cloud.y = Math.round(random(60,10));
    cloud.addImage(cloudI);
    cloud.scale = 0.5;
    cloud.velocityX = -4;
    cloudG.add(cloud);
    cloud.lifetime = 300;
  }
}

function createObstacles(){
  if(frameCount%60===0){
    obstacle = createSprite(1120,160,10,10);
    obstacle.scale = 0.4;
    obstacle.velocityX = -4;
    
    var ran = Math.round(random(1,6))
      switch(ran){
        case 1 : obstacle.addImage(obstacle1);
        break;
        case 2 : obstacle.addImage(obstacle2);
        break;
        case 3 : obstacle.addImage(obstacle3);
        break;
        case 4 : obstacle.addImage(obstacle4);
        break;
        case 5 : obstacle.addImage(obstacle5);
        break;
        case 6 : obstacle.addImage(obstacle6);
        break;
        
      }
     obstaclesGroup.add(obstacle);
    obstacle.lifetime = 300;
    }
  }