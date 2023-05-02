//main

const btnStart = document.querySelector(".btn-start");
const btnNewWord = document.querySelector(".btn-newWord");
document.querySelector(".game-page").style.display = "none";
document.querySelector(".newWord-page").style.display = "none";
const btnNewGame = document.querySelector(".btn-newGame");
const btnDesist = document.querySelector(".btn-desist");
const btnSave = document.querySelector(".btn__save");
const btnCancel = document.querySelector(".btn__cancel");
const openModal = document.querySelector(".modal__win");
const openModalEnd = document.querySelector(".modal__gameOver");
const closeModal = document.querySelector(".modal__close");
const closeModalEnd = document.querySelector(".modal__close--end");

let words = [
  "Pelota",
  "Horca",
  "Ahorcado",
  "Celular",
  "Frontend",
  "Alura",
  "Latam",
  "Costa Rica",
  "Argentina",
  "Oracle",
  "REACT",
  "GITHUB",
  "GIT",
  "GOOGLE",
  "NETFLIX",
  "DISNEY",
  "YOUTUBE",
  "FACEBOOK",
];

btnStart.onclick = startGame;
btnNewWord.onclick = addnewWord;
btnNewGame.onclick = newGame;
btnDesist.onclick = desist;
btnSave.onclick = save;
btnCancel.onclick = cancel;

// Generar palabra aleatoria y cambiar a la seccion de juego
function randomWord() {
  const localRandom = Math.floor(Math.random() * newWords.length);
  const rWords = newWords[localRandom].toUpperCase();
  gameHorca.secretWord = rWords;
  draw(gameHorca);
}

function startGame() {
  document.querySelector(".home-page").style.display = "none";
  document.querySelector(".game-page").style.display = "block";
  newGame();
}

function addnewWord() {
  document.querySelector(".home-page").style.display = "none";
  document.querySelector(".newWord-page").style.display = "block";
}

// Restablecer el juego
function newGame() {
  randomWord();
  gameHorca.state = 8;
  gameHorca.guessed = [];
  gameHorca.wrong = [];
  draw(gameHorca);
}

function desist() {
  document.querySelector(".home-page").style.display = "block";
  document.querySelector(".game-page").style.display = "none";
}

localStorage.setItem("myNewWords", JSON.stringify(words));
let newWords = JSON.parse(localStorage.getItem("myNewWords"));
function getNewWord() {
  let inputWord = document.getElementById("newWord__text").value;
  if (
    /^[A-zÑñ]*$/.test(inputWord) &&
    inputWord.length > 1 &&
    inputWord.length <= 8
  ) {
    console.log(inputWord);
    newWords.push(inputWord);
    localStorage.setItem("myNewWords", JSON.stringify(newWords));
    document.getElementById("newWord__text").value = "";
  }
}
function save() {
  document.querySelector(".home-page").style.display = "block";
  document.querySelector(".newWord-page").style.display = "none";
  getNewWord();
}
function cancel() {
  document.querySelector(".home-page").style.display = "block";
  document.querySelector(".newWord-page").style.display = "none";
}

//game

let gameHorca = {
    state: 8,
    guessed: [],
    wrong: [],
    secretWord: "",
  };
  
  let $html = {
    ahorcado: document.getElementById("ahorcado"),
    guessed: document.querySelector(".guessed-words"),
    wrong: document.querySelector(".wrong-words"),
  };
  
  function draw(gameHorca) {

    // Actualizar imagen del ahorcado
    let $elem;
    $elem = $html.ahorcado;
  
    let state = gameHorca.state;
    if (state === 9) {
      state = gameHorca.previus;
    }
    $elem.src = "/img/ahorcado0" + state + ".png";

    // Crear letras adivinadas
    $elem = $html.guessed;
    let guessed = gameHorca.guessed;
    let secretWord = gameHorca.secretWord;
    $elem.innerHTML = "";
    for (let i = 0; i < secretWord.length; i++) {
      let $span = document.createElement("span");
      let $text = document.createTextNode("");
      if (guessed.indexOf(secretWord[i]) >= 0) {
        $text.nodeValue = secretWord[i];
      }
      $span.setAttribute("class", "word guessed");
      $span.appendChild($text);
      $elem.appendChild($span);
    }
    // Crear letras equivocadas
    let wrong = gameHorca.wrong;
    $elem = $html.wrong;
    $elem.innerHTML = "";
    for (let i = 0; i < wrong.length; i++) {
      $span = document.createElement("span");
      $text = document.createTextNode(wrong[i]);
      $span.setAttribute("class", "word wrong");
      $span.appendChild($text);
      $elem.appendChild($span);
    }
  }
  
  function guess(gameHorca, letter) {
    let state = gameHorca.state;
    let secretWord = gameHorca.secretWord;
    if (state === 1 || state === 9) {
      return;
    }
  
    // Actualizar estado
  
    let guessed = gameHorca.guessed;
    let wrong = gameHorca.wrong;
    if (guessed.indexOf(letter) >= 0 || wrong.indexOf(letter) >= 0) {
      return;
    }
  
    if (secretWord.indexOf(letter) >= 0) {
      let win = true;
      for (let i = 0; i < secretWord.length; i++) {
        if (guessed.indexOf(secretWord[i]) < 0 && secretWord[i] != letter) {
          win = false;
          gameHorca.previus = gameHorca.state;
          break;
        }
      }
      if (win) {
        gameHorca.state = 9;
      }
      guessed.push(letter);
    } else {
      gameHorca.state--;
      wrong.push(letter);
    }
  }
  
  // Obtener letras de input
  
  function guessLetter(texto) {
    document.getElementById("words").value;
    let text = texto.charAt(texto.length - 1);
    text = text.toUpperCase();
    if (/^[A-zÑñ]*$/.test(text)) {
      guess(gameHorca, text);
      draw(gameHorca);
    }
  
    // Mostrar gando o perdido
    let state = gameHorca.state;
    if (state === 9) {
      winAlert();
      newGame();
      document.getElementById("words").value = "";
    } else if (state === 1) {
      gameOver();
      newGame();
      document.getElementById("words").value = "";
    }
  }
  
  // Obtener letra presionada en el teclado
  
  window.onkeypress = function guessLetter(e) {
    let letter = e.key;
    letter = letter.toUpperCase();
    if (/^[A-zÑñ]*$/.test(letter)) {
      // console.log(letter);
      guess(gameHorca, letter);
      draw(gameHorca);
    }
    let state = gameHorca.state;
    if (state === 9) {
      winAlert();
      newGame();
    } else if (state === 1) {
      gameOver();
      newGame();
    }
  };
  
  function winAlert() {
    openModal.classList.add("modal__win--show");
  }
  
  function gameOver() {
    openModalEnd.classList.add("modal__gameOver--show");
    let end = document.getElementById("end");
    end.innerText = "La palabra era " + gameHorca.secretWord;
  }
  
  closeModal.addEventListener("click", (e) => {
    e.preventDefault();
    openModal.classList.remove("modal__win--show");
  });
  
  closeModalEnd.addEventListener("click", (e) => {
    e.preventDefault();
    openModalEnd.classList.remove("modal__gameOver--show");
  });