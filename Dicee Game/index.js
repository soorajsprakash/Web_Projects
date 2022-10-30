let randomNumber1 = Math.ceil(Math.random() * 6);
let randomNumber2 = Math.ceil(Math.random() * 6);


const leftImg = document.querySelector('.img1');
const rightImg = document.querySelector('.img2');
const h1 = document.querySelector('h1')


leftImg.setAttribute('src', `images/dice${randomNumber1}.png`);
rightImg.setAttribute('src', `images/dice${randomNumber2}.png`);

if (randomNumber1 === randomNumber2) {
    h1.innerHTML = 'Draw!'
} else if (randomNumber1 > randomNumber2) {
    h1.innerHTML = '🚩 Player 1 Wins!'
} else {
    h1.innerHTML = 'Player 2 Wins! 🚩'
}

