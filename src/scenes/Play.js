class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        
    }

    preload() {
        this.load.audio('Select', "./assets/Select.wav")
        this.load.image('player', "./assets/player.png")
        this.load.image('Pedal', "./assets/pedal.png")
        this.load.image('Coin', "./assets/coin.png")
        this.load.image('Spike',"./assets/Spike.png")
        this.load.audio('Fail',"./assets/Fail.wav")
        this.load.audio('BGM',"./assets/BGM.wav")
    }

    create() {
        let menuConfig = {
            fontFamily: "Courier",
            fontSize: "16px",
            color: "#ffffff"
        };
        keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        this.BG = this.add.tileSprite(0, 0, 900, 480, 'BG').setOrigin(0, 0)
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        this.player = new Player(this, 200, 200, 'player').setOrigin(0, 0)
        this.pedal2 = new Pedal2(this,220,250,'Pedal').setOrigin(0, 0)
        this.Spike = new Deadline(this,0, 460, 'Spike').setOrigin(0, 0)
        this.pedals = []
        for (let i = 0; i < 12; i++) {
            this.createPedal(i);
        }
        this.physics.add.collider(this.player, this.pedals);
        this.physics.add.collider(this.player, this.pedal2);
        //this.physics.add.collider(this.player, this.lightnings);
        this.lightnings = this.add.group();
        this.timedEvent = this.time.addEvent({
            delay: 15000,
            callback: this.spawnLightning,
            callbackScope: this,
            loop: true
        });
        this.time.addEvent({
            delay: 17000,
            callback: this.createCoin,
            callbackScope: this,
            loop: true
        })
        this.coins = this.physics.add.group()
        this.gameOver = false
        this.physics.add.overlap(this.player, this.lightnings, () => {
            this.gameOver = true;
            this.sound.play('Fail')
            this.music.pause()
            this.player.setActive(false).setVisible(false);
            this.surviveTimeText.setText('You Survived : ' + (this.surviveTime / 1000).toFixed(0) + 's')
            this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 64, 'Game Over!Press (R) to Restart or (B) to get to Menu', menuConfig).setOrigin(0.5);
        });
        this.physics.add.overlap(this.player, this.Spike, () => {
            this.gameOver = true;
            this.music.pause()
            this.player.setActive(false).setVisible(false);
            this.surviveTimeText.setText('You Survived : ' + (this.surviveTime / 1000).toFixed(0) + 's')
            this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 64, 'Game Over!Press (R) to Restart or (B) to get to Menu', menuConfig).setOrigin(0.5);
        });
        this.surviveTimeText = this.add.text(16, 16, 'TimeSurvived: 0 second(s)', {
            fontFamily: 'Courier',
            fontSize: '32px',
            color: '#ffffff'
        });

        this.surviveTime = 0;
        this.lightningFrequency = 15000
        this.coinCount = 0
        this.coinCountText = this.add.text(16, 48, 'Coins: 0', {
            fontFamily: 'Courier',
            fontSize: '32px',
            color: '#f08215'
        }); 

        this.messageText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, '', {
            fontFamily: 'Courier',
            fontSize: '32px',
            color: '#F01519'
        }).setOrigin(0.5);

        this.timedEvent = this.time.addEvent({
            delay: this.lightningFrequency,
            callback: this.spawnLightning,
            callbackScope: this,
            loop: true
        });
        this.music = this.sound.add('BGM',0.2,true)
        this.music.setLoop(true)
        this.music.play()
    
    }




    update(time,delta) {
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart()
            this.surviveTime = 0
            

        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyB)) {
            this.sound.play('Select')
            this.scene.start('menuScene')
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
                this.coinCount++; 
                this.coinCountText.setText('Coins: ' + this.coinCount)
    
                if (this.coinCount == 2) { 
                    this.messageText.setText('Congrats!'); 
    
                   
                    this.time.delayedCall(2000, () => {
                        this.messageText.setText(''); 
                    });
                }

                if (this.coinCount == 4) { 
                    this.messageText.setText('Great!'); 
    
                   
                    this.time.delayedCall(2000, () => {
                        this.messageText.setText(''); 
                    });
                }
                if (this.coinCount == 4) { 
                    this.messageText.setText('Wonderful!'); 
    
                   
                    this.time.delayedCall(2000, () => {
                        this.messageText.setText(''); 
                    });
                }
            });
        
        }

    }

    createPedal(index) {
        const xSpacing = 100;
        const x = this.sys.game.config.width + index * xSpacing;
        const minY = this.sys.game.config.height -50
        const maxY = 100;
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
        const y = Phaser.Math.Between(this.sys.game.config.height * 0.1, this.sys.game.config.height * 0.9)
        const coin = new Coin(this, x, y, 'Coin');
        this.coins.add(coin);
    }

    handlePedal2AfterJump() {
        if (this.pedal2) {
            this.pedal2.destroy()
            this.pedal2 = null
        }
    }
}
