class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
    }

    preload() {
        this.load.audio('Select',"./assets/Select.wav")
    }

    create() {
        let menuConfig = {
            fontFamily: "Courier", 
            fontSize: "32px",
            color: "#ffffff" 
        };
        this.add.text(100, 50, 'Captions:', menuConfig).setOrigin(0.5);

        menuConfig.fontSize = "16px";
        this.add.text(500, 400, "Press 'B' to get back to the Menu page", menuConfig).setOrigin(0.5);
        keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyB)) {
            this.sound.play('Select')
            this.scene.start('menuScene');
        }
    }
}