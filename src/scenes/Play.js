class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        
    }

    preload() {
        this.load.audio('Select', "./assets/Select.wav")
        this.load.image('player', "./assets/player.png")
        this.load.image('Pedal', "./assets/pedal.png")
        this.load.image('Coin', "./assets/coin.png")
        this.load.audio('Fail',"./assets/Fail.wav")
    }

    create() {
        let menuConfig = {
            fontFamily: "Courier",
            fontSize: "32px",
            color: "#ffffff"
        };
        keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        this.BG = this.add.tileSprite(0, 0, 900, 480, 'BG').setOrigin(0, 0)
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        this.player = new Player(this, 200, 200, 'player').setOrigin(0, 0)
        this.pedals = []
        for (let i = 0; i < 7; i++) {
            this.createPedal(i);
        }
        this.physics.add.collider(this.player, this.pedals);
        //this.physics.add.collider(this.player, this.lightnings);
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
        this.coins = this.physics.add.group()
        this.gameOver = false
        this.physics.add.overlap(this.player, this.lightnings, () => {
            this.gameOver = true;
            this.sound.play('Fail')
            this.player.setActive(false).setVisible(false);
            this.surviveTimeText.setText('You Survived : ' + (this.surviveTime / 1000).toFixed(0) + 's')
            this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 64, 'Game Over!Press (R) to Restart', menuConfig).setOrigin(0.5);
        });
        this.surviveTimeText = this.add.text(16, 16, 'TimeSurvived: 0 second(s)', {
            fontFamily: 'Courier',
            fontSize: '32px',
            color: '#ffffff'
        });

        this.surviveTime = 0;
        this.lightningFrequency = 15000

        this.timedEvent = this.time.addEvent({
            delay: this.lightningFrequency,
            callback: this.spawnLightning,
            callbackScope: this,
            loop: true
        });
    
    }




    update(time,delta) {
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart()
            this.surviveTime = 0

        }
        if (!this.gameOver) {
            this.player.update();
            this.surviveTime += delta
            this.surviveTimeText.setText('TimeSurvived: ' + (this.surviveTime / 1000).toFixed(0)+'S')
            this.pedals.forEach(pedal => pedal.update());
            if (keyRight.isDown) {
                this.BG.tilePositionX += 0.5;
            }
            if (keyLeft.isDown) {
                this.BG.tilePositionX -= 0.5;
            }

            this.coins.getChildren().forEach(coin => {
                coin.x -= 2;
                if (coin.x < -coin.width) {
                    coin.destroy();
                }
            });

            this.physics.add.overlap(this.player, this.coins, (player, coin) => {
                this.sound.play('Pickup');
                coin.destroy();
            });

        }

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
        this.lightningFrequency = Math.max(this.lightningFrequency - 5000, 5000); 
        this.timedEvent.reset({
            delay: this.lightningFrequency,
            callback: () => {
                const x = Phaser.Math.Between(0, this.sys.game.config.width);
                const warning = this.add.image(x, this.sys.game.config.height / 2, 'warning');
                this.time.delayedCall(2000, () => {
                    warning.destroy();
                    const lightning = new Lightning(this, x, this.sys.game.config.height / 2, 'Lightning');
                    this.cameras.main.shake(300, 0.02);
                    this.lightnings.add(lightning);
                    this.sound.play('Lightning');
                    this.time.delayedCall(300, () => {
                        lightning.destroy();
                    }, [], this);
                    let partyMessage = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Here comes more fun!', {
                        fontSize: '24px',
                        color: '#F01519'
                    }).setOrigin(0.5);
                    this.time.delayedCall(2000, () => {
                        partyMessage.destroy();
                    }, [], this);
                }, [], this);
            },
            loop: true
        });
    }
    

    createCoin() {
        const x = this.sys.game.config.width + Phaser.Math.Between(50, 150);
        const y = Phaser.Math.Between(240, this.sys.game.config.height / 2);
        const coin = new Coin(this, x, y, 'Coin');
        this.coins.add(coin);
    }
}

