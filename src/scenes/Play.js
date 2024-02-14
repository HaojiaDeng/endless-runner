class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.audio('Select',"./assets/Select.wav")
        
    }

    create() {
        let menuConfig = {
            fontFamily: "Courier", 
            fontSize: "64px",
            color: "#ffffff" 
        };
        //this.add.text(200, 50, 'TEST : Play', menuConfig).setOrigin(0.5);
        keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        this.BG = this.add.tileSprite(0,0,900,480,'BG').setOrigin(0,0)
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.player = new Player(this,200,200).setOrigin(0,0)
    }

    update() {
        this.player.update()
        this.BG.tilePositionX += 0.3
        if (Phaser.Input.Keyboard.JustDown(keyB)) {
            this.sound.play('Select')
            this.scene.start('menuScene');
        }
    }
}