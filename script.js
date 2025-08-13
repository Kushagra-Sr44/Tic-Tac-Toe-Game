const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector(".reset-btn");
const undoBtn = document.querySelector(".undo-btn");
const result = document.querySelector(".result");

let turno = true; // true = O, false = X
let count = 0;
let history = [];

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

function initGame() {
  boxes.forEach(box => {
    box.disabled = false;
    box.textContent = "";
    box.classList.remove("winner");
  });
  turno = true;
  count = 0;
  result.value = "";
  history = [Array(9).fill("")]; // store initial empty state
}

function setColors() {
  boxes.forEach(box => {
    if (box.textContent === "O") box.style.color = "#E15634";
    else if (box.textContent === "X") box.style.color = "#1B98E0";
    else box.style.color = "";
  });
}

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a,b,c] = pattern;
    if (boxes[a].textContent && 
        boxes[a].textContent === boxes[b].textContent &&
        boxes[a].textContent === boxes[c].textContent) {
      result.value = `Winner is ${boxes[a].textContent}`;
      pattern.forEach(i => boxes[i].classList.add("winner"));
      boxes.forEach(box => box.disabled = true);
      return true;
    }
  }
  if (count === 9) {
    result.value = "Draw";
  }
  return false;
}

function handleMove(e) {
  const box = e.target;
  if (box.textContent !== "" || result.value) return;

  box.textContent = turno ? "O" : "X";
  turno = !turno;
  count++;

  const state = Array.from(boxes).map(b => b.textContent);
  history.push(state);

  setColors();
  checkWinner();
}

function undoMove() {
  if (history.length > 1 && !result.value) {
    history.pop();
    const prevState = history[history.length - 1];
    boxes.forEach((box, i) => {
      box.textContent = prevState[i];
      box.disabled = prevState[i] !== "";
      box.classList.remove("winner");
    });
    turno = history.length % 2 === 1;
    count = prevState.filter(v => v !== "").length;
    setColors();
  }
}

boxes.forEach(box => box.addEventListener("click", handleMove));
resetBtn.addEventListener("click", initGame);
undoBtn.addEventListener("click", undoMove);

initGame();
