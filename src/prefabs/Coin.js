class Coin extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.body.setAllowGravity(false)
        this.body.setImmovable(true)
    }
    update() {
        this.x -= this.speed;
        if(this.x <= 0 - this.width){
            this.x = game.config.width
        }
    }


    resetPosition() {
        this.x = this.scene.sys.game.config.width + Phaser.Math.Between(50, 150);
        this.y = Phaser.Math.Between(240, this.scene.sys.game.config.height / 2);
    }
}