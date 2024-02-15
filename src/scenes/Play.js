class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.audio('Select',"./assets/Select.wav")
        this.load.image('player',"./assets/player.png")
        this.load.image('Pedal',"./assets/pedal.png")
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
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        this.player = new Player(this,200,200,'player').setOrigin(0,0)
        this.pedals = []
        for (let i = 0; i < 4; i++) {
            this.createPedal(i);
        }
        this.physics.add.collider(this.player, this.pedals);

    }

    update() {
        this.player.update()
        this.pedals.forEach(pedal => pedal.update())
        if (keyRight.isDown) {
            this.BG.tilePositionX += 0.5;
        }
        if (keyLeft.isDown) {
            this.BG.tilePositionX -= 0.5;
        }
        if (Phaser.Input.Keyboard.JustDown(keyB)) {
            this.sound.play('Select')
            this.scene.start('menuScene');
        }
    }
    createPedal(index) {
        const x = this.sys.game.config.width + index * 150; 
        const y = Phaser.Math.Between(this.sys.game.config.height / 2, this.sys.game.config.height - 100); 
        const pedal = new Pedal(this, x, y, 'Pedal');
        this.pedals.push(pedal);
    }
}