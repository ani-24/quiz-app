const questions = [
  {
    ques: "What is the full form of HTML?",
    1: "Hyper Text Markup Language",
    2: "Helping Text Markup Language",
    3: "Hyper Test Markup Language",
    4: "High Test Making Language",
    correct: 1,
  },
  {
    ques: "Which tag is used to link external CSS file?",
    1: "&lt;style&gt;",
    2: "&lt;css&gt;",
    3: "&lt;link&gt;",
    4: "None of the above",
    correct: 3,
  },
  {
    ques: "Which tag is used to create a link?",
    1: "&lt;a&gt;",
    2: "&lt;link&gt;",
    3: "&lt;href&gt;",
    4: "None of the above",
    correct: 1,
  },
  {
    ques: "Which tag is used to to break a line?",
    1: "&lt;line&gt;",
    3: "&lt;br&gt;",
    2: "&lt;break&gt;",
    4: "None of the above",
    correct: 3,
  },
  {
    ques: "Which tag is used to create an area for user to write some text?",
    1: "&lt;write&gt;",
    2: "&lt;inp&gt;",
    3: "&lt;enter&gt;",
    4: "None of the above",
    correct: 4,
  },
  {
    ques: "How to add a video in HTML?",
    1: "&lt;video link='location/name.ext'&gt;",
    2: "&lt;video src='location/name.ext'&gt;",
    3: "&lt;vid src='location/name.ext'&gt;",
    4: "None of the above",
    correct: 2,
  },
];

const questionArea = document.querySelector(".question p");
const optionItems = document.querySelectorAll(".option");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const activeQuesIndicator = document.querySelector(".active-ques");
const submitBtn = document.querySelector(".submit");
const timeArea = document.querySelector(".time");

questions.forEach((el) => {
  el.selected = false;
});

optionItems.forEach((item, idx) => {
  const itemParent = item.parentElement;
  itemParent.addEventListener("click", () => {
    optionItems.forEach((option) => {
      if (option.parentElement == itemParent) {
        itemParent.classList.toggle("selected");
      } else {
        option.parentElement.classList.remove("selected");
      }
    });
    if (itemParent.classList.contains("selected")) {
      questions[activeQues].selected = idx + 1;
    } else {
      questions[activeQues].selected = false;
    }
  });
});

let activeQues = 0;

const showQues = () => {
  questionArea.innerHTML = questions[activeQues].ques;
  optionItems.forEach((item, idx) => {
    let index = idx + 1;
    item.innerHTML = questions[activeQues][index];
    if (item.parentElement.classList.contains("selected")) {
      item.parentElement.classList.remove("selected");
    }
    if (questions[activeQues].selected == index) {
      item.parentElement.classList.add("selected");
      console.log(item.parentElement);
    }
  });
  activeQuesIndicator.innerHTML = `${activeQues + 1}/${questions.length}`;
};

const changeQues = (oper) => {
  activeQues += oper;
  if (activeQues < 0) {
    activeQues = questions.length - 1;
  } else if (activeQues >= questions.length) {
    activeQues = 0;
  }
  showQues();
};

const submit = () => {
  let marks = 0;
  questions.forEach((el) => {
    if (el.selected === el.correct) {
      marks += 5;
    } else if (!el.selected) {
      return;
    } else if (el.selected !== el.correct) {
      marks -= 1;
    }
    console.log(el.selected, el.correct, marks);
    console.log(marks);
  });
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);
  overlay.innerHTML = `You scored ${marks} marks.`;
};

const tik = () => {
  let minutes = 0;
  let seconds = 0;
  let hours = 0;
  setInterval(() => {
    seconds++;
    if (seconds >= 60) {
      minutes++;
      seconds = 0;
    }
    if (minutes >= 60) {
      hours++;
      minutes = 0;
    }
    if (hours == 0) {
      timeArea.innerHTML = `${minutes < 10 ? "0" + minutes : minutes}:${
        seconds < 10 ? "0" + seconds : seconds
      }`;
    } else {
      timeArea.innerHTML = `${hours < 10 ? "0" + hours : hours}:${
        minutes < 10 ? "0" + minutes : minutes
      }:${seconds < 10 ? "0" + seconds : seconds}`;
    }
  }, 1000);
};

prevBtn.addEventListener("click", () => {
  changeQues(-1);
});

nextBtn.addEventListener("click", () => {
  changeQues(1);
});

submitBtn.addEventListener("click", submit);

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);
  let time = 5;
  overlay.innerHTML = time;
  const start = setInterval(() => {
    time--;
    overlay.innerHTML = time;
    if (time <= 0) {
      clearInterval(start);
      document.body.removeChild(overlay);
      showQues();
      tik();
    }
  }, 1000);
});
