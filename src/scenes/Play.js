class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.audio('Select',"./assets/Select.wav")
        this.load.image('player',"./assets/player.png")
        this.load.image('Pedal',"./assets/pedal.png")
        this.load.image('Coin', "./assets/Coin.png")
    }

    create() {
        let menuConfig = {
            fontFamily: "Courier", 
            fontSize: "64px",
            color: "#ffffff" 
        };
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
        this.physics.add.collider(this.player, this.lightnings);
        this.lightnings = this.add.group();
        this.timedEvent = this.time.addEvent({
            delay: 15000, 
            callback: this.spawnLightning,
            callbackScope: this,
            loop: true
        });

        this.time.addEvent({
            delay: 20000, 
            callback: this.createCoin,
            callbackScope: this,
            loop: true
        })
        this.Coins = this.physics.add.group()

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

        this.physics.add.overlap(this.player, this.lightnings, (player, lightning) => {
            this.scene.start('menuScene')
        })

        this.Coins.getChildren().forEach(Coin => {
            Coin.x -= 2
            if (Coin.x < -Coin.width) {
                Coin.destroy()
            }
        })
    
        this.physics.add.overlap(this.player, this.Coins, (player, Coin) => {
            this.sound.play('Pickup')
            Coin.destroy()
        })
        
        
    }
    createPedal(index) {
        const xSpacing = 200; 
        const x = this.sys.game.config.width + index * xSpacing; 
        const minY = this.sys.game.config.height / 2; 
        const maxY = this.sys.game.config.height - 50; 
        const y = Phaser.Math.Between(minY, maxY);
        const pedal = new Pedal(this, x, y, 'Pedal');
        this.pedals.push(pedal);
    }
    spawnLightning() {
        const x = Phaser.Math.Between(0, this.sys.game.config.width);
        const warning = this.add.image(x, this.sys.game.config.height / 2, 'warning');

        this.time.delayedCall(2000, () => {
            warning.destroy(); 
            const lightning = new Lightning(this, x, this.sys.game.config.height / 2, 'Lightning');
            this.cameras.main.shake(300, 0.02)
            this.lightnings.add(lightning)
            this.sound.play('Lightning')
            this.time.delayedCall(1500, () => {
                lightning.destroy(); 
            }, [], this);
        }, [], this);
    }

    createCoin() {
        const x = this.sys.game.config.width + Phaser.Math.Between(50, 150); 
        const y = Phaser.Math.Between(240, this.sys.game.config.height / 2); 
        const Coin = new Coin(this, x, y, 'Coin'); 
        this.Coins.add(Coin);
    }
    
}
