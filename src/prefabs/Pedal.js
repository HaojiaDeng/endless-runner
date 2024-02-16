class Pedal extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, speed) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this)
        this.speed = 1
        this.body.setAllowGravity(false)
        this.body.setImmovable(true)
    }

    update() {
        this.x -= this.speed;
        if(this.x <= 0 - this.width){
            this.x = game.config.width
        }
    }
}
