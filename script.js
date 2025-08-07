let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset-btn");
let result = document.querySelector(".result");
let turno = true;
let count = 0;

const enable = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
  turno = true;
  count = 0; 
  result.value = "";
  color(); 
};

const winPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const color = () => {
  boxes.forEach((box) => {
    if (box.innerHTML == "O") {
      box.style.color = "#E15634";
    }
    if (box.innerHTML == "X") {
      box.style.color = "#1B98E0";
    }
   
    if (box.innerText === "") {
        box.style.color = "";
    }
  });
};

const check = () => {
  for (let pattern of winPattern) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        result.value = `Winner is ${pos1}`;
        boxes.forEach((box) => (box.disabled = true));
        return; 
      }
    }
  }
  if (count === 9) {
    result.value = `Draw`;
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turno) {
      box.innerHTML = "O";
    } else {
      box.innerHTML = "X";
    }
    box.disabled = true;
    turno = !turno; 
    count++; 
    color();
    check();
  });
});

reset.addEventListener("click", enable);

