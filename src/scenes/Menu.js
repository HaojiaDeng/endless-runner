class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");

    }

    preload() {
        this.load.audio('Select',"./assets/Select.wav")
        this.load.audio('Pickup',"./assets/pickupCoin.wav")
        this.load.audio('Lightning',"./assets/explosion.wav")
        this.load.image('BG',"./assets/Bg.png")
        this.load.image('warning',"./assets/warning.png")
        this.load.image('Lightning',"./assets/Lightning.png")
        this.load.image('Pedal',"./assets/pedal.png")
        this.load.image('Coin',"./assets/coin.png")
        this.load.image('Spike',"./assets/Spike.png")
    }

    create() {
        let menuConfig = {
            fontFamily: "Courier", 
            fontSize: "32px",
            color: "#ffffff" 
        };
        let centerX = this.cameras.main.width / 2;
        let centerY = this.cameras.main.height / 2;
        let upperY = this.cameras.main.height / 4;
        this.add.text(centerX, upperY, 'Rooftop Runner', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = "16px";
        this.playText = this.add.text(centerX, centerY, "Press 'P' to play the game.", menuConfig).setOrigin(.5).setInteractive();
        this.playText = this.add.text(centerX, centerY+64, "Press 'H' to see the tutirial.", menuConfig).setOrigin(.5).setInteractive();
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyH)) {
            this.sound.play('Select')
            this.scene.start('tutorialScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyP)) {
            this.sound.play('Select')
            this.scene.start('playScene');
        }
    }
}
