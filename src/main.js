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



let keyH, keyB, keyP, keyRight, keySpace, keyLeft

