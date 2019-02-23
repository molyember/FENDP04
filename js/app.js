let allEnemies = []; // allEnemies is not defined at updateEntities
let riser = 0; // continuously raising the speed of the creatures

// Enemies our player must avoid
class Enemy {   ///default enemy properties
  constructor (x = 0, y = 0, sprite = 'images/enemy-bug.png', speed) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.speed = speed;
  }
  update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > 550) {
      this.x = -100;
      this.speed =  Math.floor(Math.random() * 300) + 150 + riser;  // radnom generator for varying speed
    }
    riser = riser + 0.05;
    console.log(riser);
  }

  render = function() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}



class Player {   //player's starting position
  constructor (x = 200, y = 390, sprite = 'images/char-boy-glasses.png') {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
  }



  update(dt) {
    for (let oneEnemy of allEnemies) {
      if (oneEnemy.y == this.y && oneEnemy.x > this.x-45 && oneEnemy.x < this.x+60) {    /////COLLISION
        this.x = 200;
        this.y = 390;
        toggleModal("collision");
      }
      else if (this.y == -25) {    /////WIN!!
        this.x = 200;
        this.y = 390;
        toggleModal("win");
      }
    };
  }



  render() {    // position player to x-y
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }



  handleInput(navigationKeys) {
    const blockSizeX = 101;
    const blockSizeY = 83;
    let inOrOut = 1;
    console.log("x: " + this.x + " y: " + this.y);
    let leftOut = (this.x > -2) ? 1 : 0;  // boundary tests
    let righOut = (this.x < 402) ? 1 : 0;
    let upOut = (this.y > -25) ? 1 : 0;
    let downOut = (this.y < 390) ? 1 : 0;
      switch (navigationKeys) {
        case "left":
          this.x -= blockSizeX * leftOut;
          console.log("x: " + this.x + " y: " + this.y); // boundary tests
          break;
        case "right":
          this.x += blockSizeX * righOut;
          console.log("x: " + this.x + " y: " + this.y);
          break;
        case "up":
          this.y -= blockSizeY * upOut;
          console.log("x: " + this.x + " y: " + this.y);
          break;
        case "down":
          this.y += blockSizeY * downOut;
          console.log("x: " + this.x + " y: " + this.y);
          break;
  //      default:
      }
  }
}



document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});



let player = new Player; // player is not defined at HTMLDocument.<anonymous>  /// player.update is not a function
let enemy01 = new Enemy(0,58,'images/enemy-bug-level2.png', 100);
let enemy02 = new Enemy(0,141,'images/myMonster.png', 150);
let enemy03 = new Enemy(0,224,'images/enemy-bug.png', 120);

allEnemies.push(enemy01);
allEnemies.push(enemy02);
allEnemies.push(enemy03);

const modalBackground = document.querySelector(".modal-background");

modalBackground.addEventListener("click", function() {
  modalBackground.classList.toggle("start-modal");
  riser = 0;
});

function toggleModal (accidentOrSuccess) {
  modalBackground.classList.toggle("start-modal");
  if (accidentOrSuccess == "collision") {
    document.querySelector(".modal-heading").innerHTML = "GOTCHA!!"
    document.querySelector(".end-photo").src = "images/gotcha-glasses-mono.png"
  } else if (accidentOrSuccess == "win") {
    document.querySelector(".modal-heading").innerHTML = "Congratulations!";
    document.querySelector(".end-photo").src = "images/gotcha-glasses2.png"
  }
}
