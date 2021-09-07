class Game{
    constructor(){
        this.index = null;
        this.distance = 0;
        this.name = null;  
    }
    getState(){
        var gameStateRef = database.ref('gameState');
        gameStateRef.on('value',function(data){
            gameState = data.val();
        })
    }
    update(state){
       database.ref('/').update({
          gameState:state
       })
    }

    update(){
        var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).set({
          name:this.name,
          distance:this.distance
        });
      }
    
  async start(){
     if(gameState===0){
         player = new Player();
         var playerCountRef = await database.ref("playerCount").once("value");
         if(playerCountRef.exists()){
             playerCount = playerCountRef.val();
             player.getCount();
         }
     }
    }

    play(){
        textSize(30);
        text("GameStart",120,100);
        Player.getPlayerInfo();
        drawSprites();

    }
}