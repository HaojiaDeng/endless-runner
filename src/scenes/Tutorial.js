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
            fontSize: "12px",
            color: "#ffffff" 
        };
        this.add.text(300, 150, 
         `
         Use the left/right arrow keys to move the character.
         Jump: Press the SPACEBAR to jump.
         You can jump again when touching a platform.
         there will be a pedal for you at the start of the game,
         but when you leave the pedal, that special one will disappear
        
         Avoid the lightning after 25 secs and try to collect as many coins as you can!
         And do not get close to the spike below!
         GL&HF!
        
        `, menuConfig).setOrigin(0.5)

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