let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics:{
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [ Menu,Tutorial,Play]
}

let game = new Phaser.Game(config)



let keyH, keyB, keyP, keyRight, keySpace, keyLeft, keyR


`
Name: Haojia Deng
Title: RooftopRunner
Hours of working: 19 hours
In this assignment I implemented the handling of gravity as well as inertia,
which gave my character a higher degree of flexibility. 
In addition, I also implemented the ability to increase the difficulty over time.
for example, the lightning in the game will keep appearing at an accelerated rate.
And then the position of the pedals is also completely randomized.
That two are technically interesting to me.
In addition, I experimented with the camera shake effect
to increase the immersion of the player
If you need to cheat in this game,please go to Player.js to see  the details`



