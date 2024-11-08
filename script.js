function fadeOutGameContainer() {
  const gameContainer = document.querySelector(".container");
  gameContainer.style.transition = "opacity 5s";
  gameContainer.style.opacity = 0;
}

function restartGameWithDelay(delay) {
  setTimeout(() => {
    window.location.reload();
  }, delay);
}

function handleGameCompletion() {
  if (document.querySelectorAll(".boxMatch").length === shuffleEmojis.length) {
    playSound("victory");
    fadeOutGameContainer();
    restartGameWithDelay(6000);
  }
}
const clickSound = new Audio("click.mp3");
const matchSound = new Audio("crct.mp3");
const mismatchSound = new Audio("wrong.mp3");
const victorySound = new Audio("victory.mp3");

function playSound(action) {
  switch (action) {
    case "click":
      clickSound.play();
      break;
    case "match":
      matchSound.play();
      break;
    case "mismatch":
      mismatchSound.play();
      break;
    case "victory":
      victorySound.play();
      break;
    default:
      break;
  }
}

const emojis = [
  "🗿",
  "🗿",
  "🧸",
  "🧸",
  "☕",
  "☕",
  "🍟",
  "🍟",
  "🌜",
  "🌜",
  "🍀",
  "🍀",
  "🍉",
  "🍉",
  "💰",
  "💰",
];
let shuffleEmojis = emojis.slice().sort(() => Math.random() - 0.5);

function handleGameCompletion() {
  if (document.querySelectorAll(".boxMatch").length === shuffleEmojis.length) {
    playSound("victory");
    fadeOutGameContainer();
    restartGameWithDelay(2000);
  }
}

function handleWrongMatch() {
  if (openedBoxes.length === 2) {
    const [firstBox, secondBox] = openedBoxes;
    if (firstBox.innerHTML !== secondBox.innerHTML) {
      lives--;
      updateLives();
    }
  }
}

function handleBoxClick(box) {
  box.classList.add("boxOpen");
  openedBoxes.push(box);

  if (openedBoxes.length === 2) {
    setTimeout(() => {
      const [firstBox, secondBox] = openedBoxes;
      if (firstBox.innerHTML === secondBox.innerHTML) {
        firstBox.classList.add("boxMatch");
        secondBox.classList.add("boxMatch");
        handleGameCompletion(); // Check for game completion
      } else {
        firstBox.classList.remove("boxOpen");
        secondBox.classList.remove("boxOpen");
        handleWrongMatch(); // Handle wrong match
      }
      openedBoxes = [];
    }, 500);
  }
}
const gameContainer = document.querySelector(".container .game");
let openedBoxes = [];

for (let i = 0; i < shuffleEmojis.length; i++) {
  let box = document.createElement("div");
  box.classList.add("item");

  box.addEventListener("click", () => {
    if (openedBoxes.length < 2 && !openedBoxes.includes(box)) {
      box.classList.add("boxOpen");
      openedBoxes.push(box);
      playSound("click");
    }

    if (openedBoxes.length === 2) {
      setTimeout(() => {
        if (openedBoxes[0].innerHTML === openedBoxes[1].innerHTML) {
          openedBoxes.forEach((box) => box.classList.add("boxMatch"));
          playSound("match");
        } else {
          openedBoxes.forEach((box) => box.classList.remove("boxOpen"));
          playSound("mismatch");
        }

        openedBoxes = [];
        if (
          document.querySelectorAll(".boxMatch").length === shuffleEmojis.length
        ) {
          playSound("victory");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      }, 500);
    }
  });

  box.innerHTML = shuffleEmojis[i];
  gameContainer.appendChild(box);
}
