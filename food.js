class Food{
    constructor(){
      this.foodStock=0
      this.lastFed=0
      this.image=loadImage("images/milk.png")
    

    }
    updateFoodStock(foodStock){
        this.foodStock=foodStock
    }
    getFedTime(lastFed){
        this.lastFed=lastFed
    }
    deductFood(){
        if(this.foodStock>0){
            this.foodStock=this.foodStock-1
        }
    }
    getFoodStock(){
        return this.foodStock
    }
    display(){
        background("red")
        fill("black")
        textSize (20)
        if(lastFed>=12){
            text("lastFed: " + lastFed%12 +" PM",50,30)
        }
        else if(lastFed===0){
            text("lastFed: 12 AM",50,30)

        }
        else{
            text("lastFed: " + lastFed +" AM",50,30)   
        }
        var x = 70,y=100
        imageMode(CENTER)
        if(this.foodStock!==0){
            for(var i =0; i <this.foodStock;i++){
                if(i%10===0){
                    x=70
                    y=y+50
                }
                image(this.image,x,y,50,50)
                x=x+30
            }
        }
    }
}