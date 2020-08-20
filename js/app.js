/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

/**
  * 
  Event Handler 
  * 
  */

let game;
let phrase;
const btn = document.querySelector("#btn__reset");
const qwerty = document.querySelector("#qwerty");

//Start Game Button Event Listener
btn.addEventListener("click", () => {
  //Start Name Game
  game = new Game();
  game.startGame();
});

//Check to see if the target is a BUTTON or not
qwerty.addEventListener("click", (e) => {
  const target = e.target;
  if (target.tagName !== "BUTTON") {
    return;
  } else {
    game.handleInteraction(target);
  }
});

//Event Handler for Keyboard Presses
document.addEventListener("keydown", (e) => {
  //Will always make input lowercase even if caps lock is on
  const value = e.key.toLowerCase();
  game.handleKeyboard(value);
});
