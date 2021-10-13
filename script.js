function create() {
    this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    cursors = this.input.keyboard.createCursorKeys();
    this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)

    rightpaddle = this.add.rectangle(config.width*0.95, config.height*0.5, config.width*0.01, config.height*0.1, 0xffffff);
    this.player = this.physics.add.existing(rightpaddle);
    rightpaddle.body.collideWorldBounds = true;

    leftpaddle = this.add.rectangle(config.width*0.05, config.height*0.5, config.width*0.01, config.height*0.1, 0xffffff);
    this.player2 = this.physics.add.existing(leftpaddle);
    leftpaddle.body.collideWorldBounds = true;

    puck = this.add.ellipse(config.width*0.5, config.height*0.5, config.width*0.01, config.width*0.01, 0xffffff);
    this.player3 = this.physics.add.existing(puck);
    puck.body.collideWorldBounds = true;
    puck.body.bounce.x=1;
    puck.body.bounce.y=1;
    this.physics.moveToObject(puck, rightpaddle, 300);
    this.physics.add.collider(puck, rightpaddle);
    this.physics.add.collider(puck, leftpaddle);
    rightpaddle.body.immovable = true;
    leftpaddle.body.immovable = true;

    this.physics.world.on('worldbounds', onWorldBounds);
    puck.body.onWorldBounds = true;
}

function onWorldBounds(body, up, down, left, right) {
  if (left) {
    document.getElementById("rightscore").innerHTML = eval(document.getElementById("rightscore").innerHTML+"+"+1);
  }
  else if (right) {
    document.getElementById("leftscore").innerHTML = eval(document.getElementById("leftscore").innerHTML+"+"+1);
  }
}

function update() {
    if (cursors.up.isDown) {
      rightpaddle.body.velocity.y = -400;
    } else if (cursors.down.isDown) {
      rightpaddle.body.velocity.y = 400;
    } else {
      rightpaddle.body.velocity.y = 0;
    }

    if (this.w.isDown) {
      leftpaddle.body.velocity.y = -400;
    } else if (this.s.isDown) {
      leftpaddle.body.velocity.y = 400;
    } else {
      leftpaddle.body.velocity.y = 0;
    }
}

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#000000',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: false
        }
    },
    scene: {
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

window.onresize = function() {
  document.getElementsByTagName("canvas")[0].style.width = 100+'vw';
  document.getElementsByTagName("canvas")[0].style.height = 100+'vh';
}
