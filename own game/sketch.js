var boy,boyImage1,coin1image,coin2image,coin3image,virus1,virus2,robotimage,virus1image,virus2image,bulletimage,virusgroup
,robotgroup,coin1group, coin2group,coin3group,virus1group,virus2group,bullet1,coin1,coin2,coin3;
// create database and position variable here
var database;
var boyposition;
var position=0;
var score=0;
function preload(){
   bg =loadImage("images/cityimage.png");
   boyImage1=loadImage("images/boyimg.png");
   coin1image=loadImage("images/coin1.gif")
   coin2image=loadImage("images/coin2.gif")
   coin3image=loadImage("images/coin3.gif")
   robotimage=loadImage("images/robot.gif")
   virus1image=loadImage("images/virus1.gif")
   virus2image=loadImage("images/virus2.gif")
   bulletimage=loadImage("images/bullet.png")
  }

//Function to set initial environment
function setup() {
database=firebase.database();

createCanvas(1500,700);
 
bg1=createSprite(700,350)
bg1.addImage("bgimage",bg)
bg1.scale=1.2;
bg1.velocityX=-2
  boy=createSprite(250,450,150,150); 
  boy.addImage("hotAirboy",boyImage1);
  boy.scale=0.3;

 
  boyposition = database.ref('boy/height');
  boyposition.on('value',readPosition,showError);
 
  coin1group=createGroup();
  coin2group=createGroup();
  coin3group=createGroup();
  robotgroup=createGroup();
  virus1group=createGroup();
  virus2group=createGroup();
  textSize(20); 
}

// function to display UI
function draw() {
  background("white")
  
if(bg1.x<250){
  bg1.x=500
}
if(keyWentDown("space")){
  bullet();
}


  if(keyDown(LEFT_ARROW)){
    boy.addImage("hotAirboy",boyImage1);
    //write code to move air boy in left direction
   // boy.x=boy.x-10;
   changePosition(-3,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    boy.addImage("hotAirboy",boyImage1);
    //write code to move air boy in right direction
   // boy.x=boy.x+10;
   changePosition(3,0);
  }
  else if(keyDown(UP_ARROW)){
    boy.addImage("hotAirboy",boyImage1);
    //write code to move air boy in up direction
    //boy.y=boy.y-10;
    changePosition(0,-3);
  }
  else if(keyDown(DOWN_ARROW)){
    boy.addImage("hotAirboy",boyImage1);
    //write code to move air boy in down direction
    //boy.y=boy.y+10;
  changePosition(0,3);
   
  }
  if(coin1group.isTouching(bullet1)){
    console.log("hey")
    score+=20
    fill(0);
    stroke("white");
    textSize(30);
    text("20",coin.x,coin.y);
    coin1.destroy();
    bullet1.destroy();
   // coin2.destroy();
   // coin3.destroy();
    
  }
  else
  if(coin2group.isTouching(bullet1)){
    console.log("hey silver")
    score+=15
    fill(0);
    stroke("white");
    textSize(30);
    text("15",coin2.x,coin2.y);
    coin2.destroy();
    bullet1.destroy();
  }
  else
  if(coin3group.isTouching(bullet1)){
    console.log("hey")
    score+=10
    fill(0);
    stroke("white");
    textSize(30);
    text("10",coin3.x,coin3.y);
    coin3.destroy();
    bullet1.destroy();
  }
  else
  if(virus1group.isTouching(bullet1)){
    console.log("virus killed")
    score+=30
    fill(0);
    stroke("white");
    textSize(30);
    text("30",virus1.x,virus1.y);
    virus1.destroy();
    bullet1.destroy();

  }
  else
  if(virus2group.isTouching(bullet1)){
    console.log("virus2 killed")
    score+=20
    fill(0);
    stroke("white");
    textSize(30);
    text("20",virus2.x,virus2.y);
    virus2.destroy();
    bullet1.destroy();
  }
  else
  if(robotgroup.isTouching(bullet1)){
    console.log("robot killed")
    score+=-10
    fill(0);
    stroke("yellow");
    textSize(30);
    text("-10",robot.x,robot.y);
    robot.destroy();
    bullet1.destroy();
    
  }
  

  
  spawnobjects();

 
  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air boy!",40,40);
  text("score= "+score,900,40);
  
}


function changePosition(x,y){
  //boy.x = ball.x + x;
  //boy.y = ball.y + y;    
  database.ref('boy/height').set({
 x:position.x+x,
 y:position.y+y

  });
}

function readPosition(data){
position=data.val();
boy.x=position.x;
boy.y=position.y;
}

function showError (){
  console.log("Error in database");
}
function spawnobjects(){
  var axis=Math.round(random(20,500))
  var axis1=Math.round(random(30,450))
  var axis2=Math.round(random(40,550))
  var axis3=Math.round(random(50,600))
  var axis4=Math.round(random(60,650))
  if(frameCount%500===0){
    
  coin1=createSprite(1500,axis)
  coin1.addImage("coin",coin1image)
  coin1.velocityX=-(5+2*score/100)
  coin1group.add(coin1)
 
}

  if(frameCount%300===0){
  coin2=createSprite(1550,axis2)
  coin2.addImage("coin",coin2image)
  coin2.velocityX=-(3+2*score/100)
  coin2group.add(coin2)
 
}
if(frameCount%450===0){
  coin3=createSprite(1350,axis3)
  coin3.addImage("coin",coin3image)
  coin3.velocityX=-(6+2*score/100)
  coin3group.add(coin3)
  
  }

if(frameCount%500===0){
  robot=createSprite(1400,axis4)
  robot.addImage("robot",robotimage)
robot.velocityX=-(5+2*score/100)
robotgroup.add(robot)


}
if(frameCount%650===0){
  virus1=createSprite(2000,axis+60)
  virus1.addImage("virus1",virus1image)
  virus1.scale=0.2
virus1.velocityX=-(7+2*score/100)
virus1group.add(virus1)
}
if(frameCount%100===0){
  virus2=createSprite(1600,axis+70)
  virus2.addImage("virus2",virus2image)
  virus2.scale=0.2
  virus2.velocityX=-(4+2*score/100)
  virus2group.add(virus2)
}
}
function bullet(){
  
  bullet1=createSprite(boy.x+50,boy.y-50,10,10)
  bullet1.velocityX=(2+2*score/100);
  bullet1.addImage("abcd",bulletimage)
  bullet1.scale=0.1
}
