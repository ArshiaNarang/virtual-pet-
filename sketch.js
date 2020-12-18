//Create variables here
var dog,sadDog,happyDog,garden,washroom,bedRoom,database;
var foodS,foodStock,fedtime,lastFed,currentTime;
var feed,addFood,foodObject,gameState,readState;

function preload()
{
  //load images here
  sadDog=loadImage("images/Dog.png")
  happyDog=loadImage("images/happydog.png")
  garden=loadImage("images/Garden.png")
  washroom=loadImage("images/Wash Room.png")
  bedRoom=loadImage("images/Bed Room.png")

}

function setup() {
  database=firebase.database()
	createCanvas(400, 500);
  foodObject=new Food()
  foodStock=database.ref('Food')
  foodStock.on("value",readStock)

  fedtime=database.ref('FeedTime')
  fedtime.on("value",function(data){
    lastFed=data.val()


  })
  readState=database.ref('gameState')
  readState.on("value",function(data){
    gameState=data.val()
  })
  dog=createSprite(200,400,150,150)
  dog.addImage(sadDog)
  dog.scale=0.15
   
  feed=createButton("feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood=createButton("add food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)

}


function draw() {  

  //add styles here
  currentTime=hour()
  if(currentTime===(lastFed+1)){
    update("playing")
    foodObject.garden()
    
  }
  else if(currentTime===(lastFed+2)){
    update("sleeping")
    foodObject.bedRoom()
  }

  else if(currentTime===(lastFed+3)){
    update("bathing")
    foodObject.washroom()
  }
  else{
    update("hungry")
    foodObject.display()
  }
if(gameState!=="hungry"){
  feed.hide()
  addFood.hide()
  dog.remove()
}
else{
  feed.show()
  addFood.show()
  dog.addImage(sadDog)
}
drawSprites()
}

function readStock(data){
  foodS=data.val()
  foodObject=updateFoodStock(foodStock)
}

function feedDog(){
  dog.addImage(happyDog)
  foodObject.updateFoodStock(foodObject.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObject.getFoodStock(),
    FeedTime:hour(),
    gameState:"hungry"

  })

}
function addFoods(){
  foodS++
  database.ref('/').update({
  Food:foodS

  })
}
function update(state){
  database.ref('/').update({
    gameState:state
  })
}