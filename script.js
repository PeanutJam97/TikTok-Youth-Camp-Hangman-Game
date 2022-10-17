// "use strict";

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

colorMode.addEventListener('click', function(){
  labelColor.classList.toggle('dark');
})
var step = 0;

let alphabets;
let tries;
// var superheroes = ["ironman", "spiderman", "thor", "hulk", "superman",];
// var fruits = ["apple", "pears", "blueberry", "grape"];
// var mrt = ["expo", "bishan", "orchard", "bugis"];
// var animals = ["snake", "tiger", "bull", "bear"];
var word_cloud = [
  ["ironman", "spiderman", "thor", "hulk", "superman"],
  ["apple", "pears", "blueberry", "grape"],
  ["snake", "tiger", "bull", "bear"],
  ["expo", "bishan", "orchard", "bugis"]
];

// -------------------------------------------------------
var music = new Audio();
var word_list = ['error'];
// var word_list;

function hero() {
  word_list = word_cloud[0];
  init("reset")
  music.src = "music/epic_battle.mp3";
  music.play();
  document.getElementById("catSection").style.display = "none";
  catSpan.textContent = "Superheroes!";
  showgame();
}

function fruit() {
  word_list = word_cloud[1];
  init("reset");
  document.getElementById("catSection").style.display = "none";
  catSpan.textContent = "Fruits!";
  showgame();
}

function animal() {
  word_list = word_cloud[2];
  init("reset");
  document.getElementById("catSection").style.display = "none";
  catSpan.textContent = "Animals!";
  showgame();
}

function mrtStation() {
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
    //   next.disabled = false;
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
//   init("start");

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
const rainbow = context.createLinearGradient(0,0,170,0);

clearCanvas = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
};

let Draw = (part) => {
  switch (part) {
    case "gallows":
      context.strokeStyle = "#444";
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