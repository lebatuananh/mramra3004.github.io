const modalEl = document.getElementById("modal");
const playBtn = document.getElementById("play_btn");
const scoreEl = document.getElementById("score");
const linkEl = document.getElementById("link");

const speed = 5;
const carSize = 60;
const enemyCarsNumber = Math.floor(window.innerWidth / 80);
let score = 0;

let playerCars;
let enemyCars;

let carImg;
let enemyCarImg;

playBtn.addEventListener("click", () => {
  startGame();
});

function startGame() {
  score = 0;
  modalEl.style.display = "none";

  enemyCars = [];
  playerCar = new Car(20, random(height - carSize), carSize, carImg);

  for (let i = 0; i < enemyCarsNumber; i++) {
    const car = new Car(width, random(height - carSize), carSize, enemyCarImg);
    car.vel.x = random(-speed * 2, -speed);
    enemyCars.push(car);
  }

  loop();
}

function setup() {
  createCanvas((window.innerWidth * 3) / 4, (window.innerHeight * 3) / 4);

  startGame();
}

function draw() {
  score++;

  background("#303952");
  drawRoad();

  playerCar.checkBoundaries();
  playerCar.update();
  playerCar.draw();

  if (playerCar.isColliding(enemyCars)) {
    noLoop();
    gameOver();
  }

  enemyCars.forEach((car) => {
    car.checkLeftBorder();
    car.update();
    car.draw();
  });

  // drawScore
  fill(255);
  textSize(20);
  text(`Score: ${score}`, width - 120, 30);
}

function drawRoad() {
  const h = 10;
  const w = width / 7;
  const spaceX = 15;
  const spaceY = height / 6;
  const offset = 40;

  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 6; j++) {
      fill("rgba(255, 255, 255, 0.7)");
      noStroke();
      rect(i * w + spaceX * i - offset, j * h + spaceY * j + offset, w, h);
    }
  }
}

function gameOver() {
  modalEl.style.display = "flex";
  scoreEl.innerHTML = score;
  linkEl.href = `https://www.facebook.com/share.php?u=https://github.com/mramra3004&quote=I scored ${score} points in this Car Game created by @mramra3004. You should check it out. It's fun!`;
}
function keyReleased() {
	switch(key) {
		case 'ArrowUp': {
			playerCar.vel.y = 0;
			break;
		}
		case 'ArrowDown': {
			playerCar.vel.y = 0;
			break;
		}
		case 'ArrowLeft': {
			playerCar.vel.x = 0;
			break;
		}
		case 'ArrowRight': {
			playerCar.vel.x = 0;
			break;
		}
	}
}

function keyPressed() {
  switch (key) {
    case "ArrowUp": {
      playerCar.vel.y = -speed;
      break;
    }
    case "ArrowDown": {
      playerCar.vel.y = speed;
      break;
    }
    case "ArrowLeft": {
      playerCar.vel.x = -speed;
      break;
    }
    case "ArrowRight": {
      playerCar.vel.x = speed;
      break;
    }
  }
}

function preload() {
  carImg = loadImage("img/my-car1.svg");
  enemyCarImg = loadImage(
    "img/enemy-car.svg"
  );
}

class Car {
  constructor(x, y, size, img) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.size = createVector(size, size / 2);
    this.img = img;
  }

  update() {
    this.pos.add(this.vel);
  }

  draw() {
    this.img.resize(this.size.x, 0);
    image(this.img, this.pos.x, this.pos.y - this.size.x / 5);
  }

  checkBoundaries() {
    if (this.pos.x < 0) {
      this.pos.x = 0;
    }

    if (this.pos.x > width - this.size.x) {
      this.pos.x = width - this.size.x;
    }

    if (this.pos.y < 0) {
      this.pos.y = 0;
    }

    if (this.pos.y > height - this.size.y) {
      this.pos.y = height - this.size.y;
    }
  }

  resetPosition() {
    this.pos.x = width;
    this.pos.y = random(height - carSize);
  }

  isColliding(cars) {
    for (let i = 0; i < cars.length; i++) {
      const car = cars[i];

      // check collision
      if (
        this.pos.x < car.pos.x + car.size.x &&
        this.pos.x + this.size.x > car.pos.x &&
        this.pos.y < car.pos.y + car.size.y &&
        this.pos.y + this.size.y > car.pos.y
      ) {
        return true;
      }
    }

    return false;
  }

  checkLeftBorder() {
    if (this.pos.x + this.size.x < 0) {
      this.resetPosition();
    }
  }
}
