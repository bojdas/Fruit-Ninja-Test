//Game States
var PLAY=1;
var END=0;
var gameState=1;

var sword, fruit, gameOver;

function preload(){
  swordImage = loadImage("sword.png");
  gameOverImage = loadImage("gameover.png");
  monsterImage = loadAnimation("alien1.png", "alien2.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");

 
}
  
function setup(){
createCanvas(600,600);
  
  //creating the sword
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7;
  sword.setCollider("rectangle",0,0,40,40);
  
  //score variables and groups
  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
}

function Draw(){
  background("lightblue");
  
  if(gameState===PLAY){
    //call fruits and Enemy function
    Fruits();
    fruits();
    Enemy();
    
    //Move Sword with Mouse
    sword.y=World.mouseY;
    sword.x=World.mouseX;
    
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score=score+2;
      knifeSwooshSound.play();
    }
    
    if(enemyGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      enemyGroup.destroyEach();
      sword.addImage(gameOverImage);
      sword.x=200;
      sword.y=200;
      gameOverSound.play();
      gameState = END;
    } 
    
  } else if(gameState===END){
    
  }
  drawSprites();
}
function fruits(){
  if(World.framCount%80===0){
    tempfruit=createSprite(400,200,20,20);
    tempfruit.scale=0.2;
    //fruit.debug=true;
    r=Math.round(random(1,4));
    if(r==1){
      tempfruit.addImage(fruit1);
    } else if(r==2){
      tempfruit.addImage(fruit2);
    } else if(r==3){
      tempfruit.addImage(fruit3);
    } else if(r==4){
      tempfruit.addImage(fruit4);
    }
    
    tempfruit.y=Math.round(random(50,340));
    
    tempfruit.velocityX=-7;
    tempfruit.setLifetime=100;
    
    fruitGroup.add(tempfruit);
  }
}
function Fruits(){
  if(World.framCount%80===0){
    fruit=createSprite(0,200,20,20);
    fruit.scale=0.2;
    //fruit.debug=true;
    r=Math.round(random(1,4));
    if(r==1){
      fruit.addImage(fruit1);
    } else if(r==2){
      fruit.addImage(fruit2);
    } else if(r==3){
      fruit.addImage(fruit3);
    } else if(r==4){
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
    
    fruit.velocityX=7;
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}


function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}