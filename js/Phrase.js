/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }

  /**
   * Display phrase on game board
   */

  addPhraseToDisplay() {
    const phraseSection = document.querySelector("#phrase ul");
    //Loop through Phrase Length
    for (let i = 0; i < this.phrase.length; i++) {
      //Letters will loop through each character
      const letters = this.phrase.charAt(i);
      const li = document.createElement("li");
      phraseSection.append(li);
      //Set li innerHTML to each letter
      li.innerHTML = letters;
      //If letter is not space
      if (li.innerHTML !== " ") {
        li.classList.add("hide", "letter", `${letters}`);
      } else if (li.innerHTML === " ") {
        li.classList.add("space");
      }
    }
  }

  /**
   * Checks if passed letter is in phrase
   * @param (string) letter - Letter to check
   */

  checkLetter(letter) {
    //Checks to see if the phrase includes the letter passed through
    if (this.phrase.includes(letter)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Displays passed letter on screen after a match is found
   * @param (string) letter - Letter to display
   */

  showMatchedLetter(letter) {
    //Grab Selected Letter
    const selectedLetter = letter.toLowerCase();
    const li = document.querySelectorAll("#phrase ul li");
    //Loop through li to see if it contains the selected letter
    li.forEach((listItem) => {
      if (listItem.classList.contains(selectedLetter)) {
        //Replace class hide with show
        listItem.classList.replace("hide", "show");
        return true;
      } else {
        return false;
      }
    });
  }
}
