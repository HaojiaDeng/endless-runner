class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.body.setGravityY(300);
        this.body.setDragX(200);
        this.playerSpeed = 75;
        this.jumpSpeed = 350;
        this.keyRight = keyRight;
        this.keySpace = keySpace;
        this.keyLeft = keyLeft;
    }

    update() {
        if (this.keyRight.isDown) {
            this.body.setVelocityX(this.playerSpeed);
        } else if (this.keyLeft.isDown) {
            this.body.setVelocityX(-this.playerSpeed);
        } else {
            this.body.setVelocityX(0);
        }
    

        if (Phaser.Input.Keyboard.JustDown(this.keySpace) && this.body.touching.down) {
            this.body.setVelocityY(-this.jumpSpeed);
            this.scene.handlePedal2AfterJump()
        }
    }
    
}
/* if you find the game challenging, change the update() to this:
 update() {
        if (this.keyRight.isDown) {
            this.body.setVelocityX(this.playerSpeed);
        } else if (this.keyLeft.isDown) {
            this.body.setVelocityX(-this.playerSpeed);
        } else {
            this.body.setVelocityX(0);
        }
        if (Phaser.Input.Keyboard.JustDown(this.keySpace && this.body.touching.down)) {
            this.body.setVelocityY(-this.jumpSpeed)
            this.scene.handlePedal2AfterJump()
        }
    }
this will enable you to jump countless times in the air
*/