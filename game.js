class Game{
    constructor(){

    }
    getState(){
        db.ref("gamestate").on("value", function(data){
            gamestate = data.val()
        })
    }

    updateState(num){
        db.ref("/").update({
            gamestate: num
        })
    }

    start(){
        player = new Player()
        playercount = player.getCount()
        form = new Form()
        form.display()
        p1 = createSprite(150, 500)
        p2 = createSprite(650, 500)
        p1.addImage(alienImg)
        p2.addImage(alienImg)
        p1.scale = 0.2
        p2.scale = 0.2
        p2.mirrorX(-1)
        p = [p1, p2]
    }

    play(){
        form.greeting.hide()
        Player.getPlayers()
        if (players != undefined) {
            background("black")
            var index = 0
            for (var i in players) {
                index = index+1
                p[index - 1].position.x = players[i].posx
                p[index - 1].position.y = players[i].posy
                if (keyIsDown(UP_ARROW) && player.posy>0){
                    player.posy = player.posy - 10
                    player.updateInfo()
                  }
                  if (keyIsDown(DOWN_ARROW) && player.posy<600){
                    player.posy = player.posy + 10
                    player.updateInfo()
                  }
                  if (frameCount%30===0){
                      ufo = createSprite(random(200, 600), 0)
                      ufo.velocityY = 4
                      ufo.addImage(ufoImg)
                      ufo.scale = 0.4
                  }
                  if(index === player.idx){
                  if (index===1){
                    if (keyIsDown(RIGHT_ARROW)&& frameCount%10===0){
                        bullet1 = createSprite(p[index - 1].position.x, p[index - 1].position.y, 40, 20)
                        bullet1.velocityX = 5
                    }
                  }
                  if (index===2){
                    if (keyIsDown(LEFT_ARROW)&& frameCount%10===0){
                        bullet2 = createSprite(p[index - 1].position.x, p[index - 1].position.y, 40, 20)
                        bullet2.velocityX = -5
                    }
                  }
                }
    }
        }
        drawSprites()
    }
}