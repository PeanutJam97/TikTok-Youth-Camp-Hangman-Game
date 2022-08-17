const keyboard = document.querySelector(".keyboard");
const triesspan = document.querySelector(".tries-span");
const wordinput = document.querySelector(".words-input");
const menuButton = document.querySelector(".menu-button");
const restartButton = document.querySelector(".restart-button");
const notif = document.querySelector(".notif");
const game = document.querySelector(".game");
const notifSubstance = document.querySelector(".win-notif");
const notifSpan = document.querySelector(".notif-span");
const statusSpan = document.querySelector(".status-span");
const catSpan = document.querySelector(".cat-span");
const newgame = document.querySelector(".notif-button");
const labelColor = document.getElementsByTagName('body')[0];
const colorMode = document.getElementById('changeColor');

var step = 0;
let alphabets;
let tries;
var word_cloud = [
  ["ironman", "spiderman", "thor", "hulk", "superman"],
  ["apple", "pears", "blueberry", "grape"],
  ["snake", "tiger", "bull", "bear"],
  ["expo", "bishan", "orchard", "bugis"]
];

// -------------------------------------------------------
var main_music = new Audio("music/main.mp3");
var hero_music = new Audio("music/hero.mp3");
var fruit_music = new Audio("music/fruit.mp3");
var animal_music = new Audio("music/animal.mp3");
var train_music = new Audio("music/train.mp3");
var word_list = ['error'];

main_music.loop = true;
main_music.play();

colorMode.addEventListener('click', function(){
  labelColor.classList.toggle('dark');
})

function hero() {
  main_music.pause();
  hero_music.loop = true;
  hero_music.play();
  word_list = word_cloud[0];
  init("reset");
  document.getElementById("catSection").style.display = "none";
  catSpan.textContent = "Superheroes!";
  showgame();
}

function fruit() {
  main_music.pause();
  fruit_music.loop = true;
  fruit_music.play();
  word_list = word_cloud[1];
  init("reset");
  document.getElementById("catSection").style.display = "none";
  catSpan.textContent = "Fruits!";
  showgame();
}

function animal() {
  main_music.pause();
  animal_music.loop = true;
  animal_music.play();
  word_list = word_cloud[2];
  init("reset");
  document.getElementById("catSection").style.display = "none";
  catSpan.textContent = "Animals!";
  showgame();
}

function mrtStation() {
  main_music.pause();
  train_music.loop = true;
  train_music.play();
  word_list = word_cloud[3];
  init("reset");
  document.getElementById("catSection").style.display = "none";
  catSpan.textContent = "MRT Stations!";
  showgame();
}

const attainword = function (list) {
  return list[Math.floor(Math.random() * word_list.length)];
};

let choose_word;

const init = function (state) {
  wordinput.innerHTML = "";
  if (state === "start") {
    for (const i of "abcdefghijklmnopqrstuvwxyz") {
      const html = `<button class="flashkeys"><p>${i.toUpperCase()}</p></button>`;
      keyboard.insertAdjacentHTML("beforeend", html);
    }
  } else if ((state = "res")) {
    alphabets.forEach((btn) => {
      btn.classList.remove("disabled");
      notif.classList.add("hidden");
      clearCanvas();
      step = 0;
    });
    Draw(draws[step++]);
    if (undefined === draws[step]) this.disabled = true;
  }
  choose_word = attainword(word_list);

  tries = 7;

  alphabets = document.querySelectorAll(".flashkeys");
  triesspan.textContent = tries;

  for (let i = 0; i < choose_word.length; i++) {
    const html = `<p class="word">_</p>`;
    wordinput.insertAdjacentHTML("beforeend", html);
  }
};

init("start");

const showNotif = function (msg) {
  notif.classList.remove("hidden");
  if (msg === 'Won') {
      statusSpan.textContent = "CONGRATULATIONS!"
  } else {
      statusSpan.textContent = "GAME OVER";
  }
  notifSpan.textContent = choose_word.toUpperCase();
  notifSubstance.textContent = `You ${msg} !!!`;
};

const showgame = function () {
  game.classList.remove("hidden");
};

const reducetries = function () {
  tries--;
  triesspan.textContent = tries;
  if (tries === 0) {
    showNotif("Lost");
  }
};

// get multiple matching indexes of pressed letter
// to the selected word
const attainindexes = function (letter) {
  let indexes = [];
  [...choose_word].forEach((val, i) => {
    if (val === letter) {
      const index = i;
      indexes.push(index);
    }
  });
  return indexes;
};

// >>
const checkWord = function () {
  let val = true;
  for (let i = 0; i < wordinput.children.length; i++) {
    if (wordinput.children[i].textContent === "_") {
      val = false;
    }
  }
  return val;
};

// letters event listener function
const letterPress = function () {
  const letter = this.textContent.toLowerCase();

  if (choose_word.includes(letter)) {
    const index_list = attainindexes(letter);
    index_list.forEach((val, i) => {
      wordinput.children[val].textContent = this.textContent;
    });
    if (checkWord()) showNotif("Won");
  } else {
    reducetries();
    Draw(draws[step++]);
    if (undefined === draws[step]) this.disabled = true;
  }
  this.classList.add("disabled");


};

// <<--occurrence post clicking of keyys-->>
alphabets.forEach((btn) => {
  btn.addEventListener("click", letterPress);
});

// <<--Menu Button-->>
menuButton.addEventListener("click", function () {
    location.reload()
});

// <<--Play again post winning or losing-->>
newgame.addEventListener("click", function () {
  init("reset");
});

// <<--Restart from click-->>
restartButton.addEventListener("click", function () {
  init("reset");
});

// -------------------------------------------------------------------------

const canvas = document.getElementById("hangman");
const context = canvas.getContext("2d");
var rainbow = context.createLinearGradient(15,10,130,0);
rainbow.addColorStop(0, "red");
rainbow.addColorStop(0.6, "yellow");
rainbow.addColorStop(1.0, "lime");


clearCanvas = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
};

let Draw = (part) => {
  switch (part) {
    case "gallows":
      context.strokeStyle = rainbow;
      context.lineWidth = 10;
      context.beginPath();
      context.moveTo(175, 225);
      context.lineTo(5, 225);
      context.moveTo(40, 225);
      context.lineTo(25, 5);
      context.lineTo(100, 5);
      context.lineTo(100, 25);
      context.stroke();
      break;

    case "head":
      context.lineWidth = 5;
      context.beginPath();
      context.arc(100, 50, 25, 0, Math.PI * 2, true);
      context.closePath();
      context.stroke();
      break;

    case "body":
      context.beginPath();
      context.moveTo(100, 75);
      context.lineTo(100, 140);
      context.stroke();
      break;

    case "rightHarm":
      context.beginPath();
      context.moveTo(100, 85);
      context.lineTo(60, 100);
      context.stroke();
      break;

    case "leftHarm":
      context.beginPath();
      context.moveTo(100, 85);
      context.lineTo(140, 100);
      context.stroke();
      break;

    case "rightLeg":
      context.beginPath();
      context.moveTo(100, 140);
      context.lineTo(80, 190);
      context.stroke();
      break;

    case "leftLeg":
      context.beginPath();
      context.moveTo(100, 140);
      context.lineTo(125, 190);
      context.stroke();
      break;
  }
};

const draws = [
  "gallows",
  "head",
  "body",
  "rightHarm",
  "leftHarm",
  "rightLeg",
  "leftLeg",
];
// <<--Initial drawing of hangman gallows-->>

Draw(draws[step++]);
if (undefined === draws[step]) this.disabled = true;