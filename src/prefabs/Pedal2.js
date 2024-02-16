class Pedal2 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, speed) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this)
        this.speed = 1
        this.body.setAllowGravity(false)
        this.body.setImmovable(true)
    }


}
