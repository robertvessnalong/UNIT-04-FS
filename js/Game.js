/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
  constructor() {
    this.missed = 0;

    /**
     * Creates phrases for use in game
     * @return {array} An array of phrases that could be used in the game
     */

    this.phrases = [
      new Phrase("Life is like a box of chocolates"),

      new Phrase("There is no trying"),

      new Phrase("May the force be with you"),

      new Phrase("you have to see the matrix for yourself"),

      new Phrase("you talking to me"),
    ];
    //Will Change Active Phrase Once Phrase Is Generated
    this.activePhrase = null;
  }

  /**
   * Selects random phrase from phrases property
   * @return {Object} Phrase object chosen to be used
   */

  getRandomPhrase() {
    //Selects a Random Phrase from the Array
    const randomPhrase = this.phrases[
      Math.floor(Math.random() * this.phrases.length)
    ];
    return randomPhrase;
  }

  /**
   * Begins game by selecting a random phrase and displaying it to user
   */

  startGame() {
    //Remove Overlay on Start Game
    const overlay = document.querySelector("#overlay");
    overlay.style.display = "none";
    const random = this.getRandomPhrase();
    //Assign the Active Phrase to the Random Phrase
    this.activePhrase = random;
    //Add Active Phrase to Display
    this.activePhrase.addPhraseToDisplay();
  }

  /**
   * Checks for winning move
   * @return {boolean} True if game has been won, false if game wasn't won
   */

  checkForWin() {
    const letters = document.querySelectorAll(".letter");
    const show = document.querySelectorAll(".show");
    //Loop through all letters to see if length matches the show class length
    for (let i = 0; i < letters.length; i++) {
      if (letters.length === show.length) {
        return true;
      } else {
        return false;
      }
    }
  }

  /**
   * Displays game over message
   * @param {boolean} gameWon - Whether or not the user won the game
   */

  gameOver(gameWon) {
    const overlay = document.querySelector("#overlay");
    const overlayMessage = document.querySelector("#overlay h1");
    //If checkForWin returns true
    if (gameWon === true) {
      overlay.style.display = "flex";
      overlayMessage.innerHTML = "Great Job!";
      overlay.classList.remove("start", "lose");
      overlay.classList.add("win");
      //Reset Game Board
      this.resetGame();
      //If Missed is greater than 4
    } else if (gameWon === false && this.missed === 5) {
      overlay.style.display = "flex";
      overlayMessage.innerHTML = "Sorry, better luck next time!";
      overlay.classList.remove("start", "win");
      overlay.classList.add("lose");
      //Reset Game Board
      this.resetGame();
    }
  }

  /**
   * Increases the value of the missed property
   * Removes a life from the scoreboard
   * Checks if player has remaining lives and ends game if player is out
   */

  removeLife() {
    const tries = document.querySelectorAll(".tries img");
    //Sets the tries to the missed counter
    tries[this.missed].src = "images/lostHeart.png";
    this.missed += 1;
    //Checks to see if missed is equal to 5
    if (this.missed == 5) {
      this.gameOver(false);
    }
  }

  /**
   * Handles onscreen keyboard button clicks
   * @param (HTMLButtonElement) button - The clicked button element
   */

  handleInteraction(target) {
    const value = target.innerHTML;
    //Set Btn to Disabled After Click
    target.setAttribute("disabled", true);
    //Check to see if phrase has letter
    if (game.activePhrase.checkLetter(value)) {
      //Show Letter
      game.activePhrase.showMatchedLetter(value);
      target.classList.add("chosen");
      //Check For Win is True or False
      this.gameOver(this.checkForWin());
    } else if (!game.activePhrase.checkLetter(value)) {
      target.classList.add("wrong");
      this.removeLife();
    }
  }

  /**
   * Reset Game in Game Over Method
   */

  resetGame() {
    const phraseSection = document.querySelector("#phrase ul");
    const tries = document.querySelectorAll(".tries img");
    //Set Phrase Section Empty
    phraseSection.innerHTML = "";
    const btn = document.querySelectorAll(".keyrow button");
    //Remove class for each Button and add key class
    btn.forEach((button) => {
      button.classList.remove("chosen", "wrong");
      button.classList.add("key");
      button.removeAttribute("disabled");
    });
    //Reset Hearts and Missed Counter
    tries.forEach((heart) => {
      heart.src = "images/liveHeart.png";
    });
    this.missed = 0;
  }

  /**
   * Handles Physical Keyboard Presses
   */

  handleKeyboard(value) {
    const overlay = document.querySelector("#overlay");
    //This will prevent the keyboard from working if the overlay is not display none
    if (overlay.style.display === "none") {
      const qwertyBtn = document.querySelectorAll(".keyrow button");
      //Loop through each button to see if the value pressed is in keyrow and the letter is in phrase
      qwertyBtn.forEach((btn) => {
        if (btn.innerHTML === value && game.activePhrase.checkLetter(value)) {
          //Prevents the button from being pressed multiple times
          if (!btn.classList.contains("chosen")) {
            game.activePhrase.showMatchedLetter(value);
            btn.classList.add("chosen");
            btn.setAttribute("disabled", true);
            this.gameOver(this.checkForWin());
          }
          //Checks if button pressed equals value but is not in phrase
        } else if (
          btn.innerHTML === value &&
          !game.activePhrase.checkLetter(value)
        ) {
          if (!btn.classList.contains("wrong")) {
            btn.classList.add("wrong");
            btn.setAttribute("disabled", true);
            this.removeLife();
          }
        }
      });
    }
  }
}
