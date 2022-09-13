// Grabs elements from the DOM and stores them into variables
let fastFwdBtn = document.getElementById('play');
let resetBtn = document.querySelector('#reset');
let resultDiv = document.getElementById('result');
let p1NameDiv = document.getElementById('p1Name');
let p2NameDiv = document.getElementById('p2Name');
let p1HealthDiv = document.getElementById('p1Health');
let p2HealthDiv = document.getElementById('p2Health');

// Updates the DOM and game variables
const updateGame = (p1, p2, gameState) => {

  p1NameDiv.innerText = p1.name;
  p1HealthDiv.innerText = p1.health;
  p2NameDiv.innerText = p2.name;
  p2HealthDiv.innerText = p2.health;

  if (p1.health <= 0 || p2.health <= 0) {
    game.isOver = true;
    gameState = game.isOver;
    resultDiv.innerText = game.declareWinner(gameState, p1, p2);
    return gameState;
  }
}


class Player {

  constructor(name, health, attackDamage) {
    this.name = name;
    this.health = health;
    this.attackDmg = attackDamage;
  }

  strike(player, enemy, attackDmg) {
    let damageAmount = Math.ceil(Math.random() * attackDmg);
    enemy.health -= damageAmount;
    updateGame(p1, p2, gameState);
    return `${player.name} attacks ${enemy.name} for ${damageAmount}hp.`;
  }

  heal(player) {
    let hpAmount = Math.ceil(Math.random() * 5);
    player.health += hpAmount;
    updateGame(p1, p2, gameState);
    return `${player.name} heals for ${hpAmount}hp.`;
  }
}


class Game {

  constructor() {
    this.isOver = false;
  }

  declareWinner(isOver, p1, p2) {
    let message = '';
    if (isOver == true && p1.health <= 0) {
      message = `${p2.name} Wins`
    }
    else if (isOver == true && p2.health <= 0) {
      message = `${p1.name} Wins`
    }
    document.querySelector('#victory').play();
    return message;

  }

  reset(p1, p2) {
    p1.health = 100;
    p2.health = 100;
    game.isOver = false;
    resultDiv.innerText = '';
    updateGame(p1, p2, this.isOver);
  }

  // Fast Forwarding
  play(p1, p2) {
    this.reset(p1, p2);
    while (!this.isOver) {
      // let randomHeal = [p1.heal(p1), p2.heal(p2)];
      // let randomIndex = Math.floor(Math.random() * randomHeal.length);
      // randomHeal[randomIndex];
      p1.strike(p1, p2, p1.attackDmg);
      p2.strike(p2, p1, p2.attackDmg);

    }
    console.log(this.declareWinner(this.isOver, p1, p2))
    return this.declareWinner(this.isOver, p1, p2);
  }

}

// Create 2 players
let player1 = new Player('Rabbit', 100, 10);
let player2 = new Player('Turtle', 100, 10);

// backup player to reset
let p1 = player1;
let p2 = player2;

// Game object + initialization
let game = new Game();
updateGame(p1, p2, game.isOver);
let gameState;


// Fast Fwd Button
fastFwdBtn.addEventListener('click', () => {
  resultDiv.innerText = game.play(p1, p2);
})

// Reset Button
resetBtn.addEventListener('click', () => {
  game.reset(p1, p2);
})


// Player 1 Controls
document.addEventListener('keydown', (e) => {
  if (e.key == 'q' && p2.health > 0 && game.isOver == false) {
    p1.strike(p1, p2, p1.attackDmg);
    document.querySelector('#p1attack').play()
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key == 'a' && p2.health > 0 && game.isOver == false) {
    p1.heal(p1);
    document.querySelector('#p1heal').play();
  }
});

// Player 2 Controls
document.addEventListener('keydown', (e) => {
  if (e.key == 'p' && p1.health > 0 && game.isOver == false) {
    p2.strike(p2, p1, p2.attackDmg);
    document.querySelector('#p2attack').play();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key == 'l' && p1.health > 0 && game.isOver == false) {
    p2.heal(p2);
    document.querySelector('#p2heal').play();
  }
});
