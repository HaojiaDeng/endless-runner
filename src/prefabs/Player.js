class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.playerSpeed = 75; 
        this.jumpSpeed = 200;
        this.keyRight = keyRight;
        this.keySpace = keySpace;
        this.keyLeft = keyLeft;

        this.body.setGravityY(300);
        this.body.setDragX(200); 
    }

    update() {
      
        if (this.keyRight.isDown) {
            this.body.setVelocityX(this.playerSpeed);
        }


        if (this.keyLeft.isDown) {
            this.body.setVelocityX(-this.playerSpeed);
        }
        

       //&& this.body.touching.down
        if (Phaser.Input.Keyboard.JustDown(this.keySpace)) {
            this.body.setVelocityY(-this.jumpSpeed);
        }

        
    }
}