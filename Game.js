class Game{
    constructor(){

    }
    getState(){
        var stateRef = database.ref('gameState')
        console.log("hello");
        stateRef.on("value", function(data){
            GS = data.val();
        })
        console.log(GS);
    }
    updateState(State){
        database.ref('/').update({
            gameState:State
        })
    }
    async start(){
        if(GS===0){
            player=new Player();
            var playerCountRef=await database.ref('playerCount').once("value");
            if(playerCountRef.exists()){
                pCount=playerCountRef.val();
                player.getCount();
            }
            form = new Form();
            form.display();
        }
        p1=createSprite(100, 100, 100, 100);
        p2=createSprite(300, 100, 100, 100);
        p3=createSprite(500, 100, 100, 100);
        p1.addImage(wCar);
        p2.addImage(rCar);
        p3.addImage(bCar);
        cars = [p1, p2, p3];
    }
    play(){
        form.hide();
        //text("Game Start", 150, 150);
        Player.getPlayerInfo();
        player.getFinishedPlayers();
        if(allPlayers!== undefined){
            background(Ground);
            image(Track, 0, -displayHeight*5, displayWidth, displayHeight*6);
            var carX = 0;
            var carY = 0;
            var index = 0;
            //for(var plr= 0; plr<allPlayers.length;plr++)
            for(var plr in allPlayers ){
                carY=displayHeight-allPlayers[plr].Distance;
                carX=carX+400;
                index = index+1;
                cars[index-1].x=carX;
                cars[index-1].y=carY;
                if(index===player.index){
                    fill("red");
                    ellipse(carX, carY, 60, 80);
                    camera.position.x=displayWidth/2;
                    camera.position.y=cars[index-1].y;
                }else{
                    fill("black");
                    ellipse(carX, carY, 60, 80);
                }
                textSize(20);
                fill("white");
                text(allPlayers[plr].Name+":"+allPlayers[plr].Distance, cars[index-1].x, cars[index-1].y+70)
                //pos+=30;
            }
            
        }
        if(keyIsDown(UP_ARROW)&& player.index!==null && finished===false){
            player.distance+=50;
            player.update();
        }
        if(player.distance>4400 && finishedPlayers<= 2 && finished===false){
            Player.updateFinishedPlayers(); 
            player.rank=finishedPlayers;
            player.update();
            finished=true;
        }
        drawSprites();
    }
    end(){
        background("green");
        fill("lightgreen");
        camera.position.x=200;
        camera.position.y=0;
        textSize(30);
        text("You have reached the end!", 0, displayHeight/9-50);
        console.log("You have reached the end");
        Player.getPlayerInfo();
        for (var plr in allPlayers){
            if(allPlayers[plr].Rank===1){
                text("First Rank: " + allPlayers[plr].Name, 0, displayHeight/9);
                image(gold, -50, displayHeight/9-30, 50, 70)
            } else if(allPlayers[plr].Rank===2){
                text("Second Rank: " + allPlayers[plr].Name, 0, displayHeight/9+70);
                image(silver, -50, displayHeight/9+30, 50, 50)
            } else if(allPlayers[plr].Rank===3){
                text("Third Rank: " + allPlayers[plr].Name, 0, displayHeight/9+140);
                image(bronze, -50, displayHeight/9+90, 50, 50)
            }
        }
    }
}
