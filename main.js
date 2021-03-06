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
  {
    ques: "What are attributes in HTML?",
    1: "&lt;body&gt;",
    2: "The code modifies the tag in which they are written",
    3: "The entire content of the page",
    4: "None of the above",
    correct: 2,
  },
  {
    ques: "Which attribute is used to add background image to the page",
    1: "bgcolor",
    2: "bgimg",
    3: "background",
    4: "None of the above",
    correct: 3,
  },
  {
    ques: "How many types of list can you create using HTML?",
    1: "4",
    2: "3",
    3: "2",
    4: "1",
    correct: 2,
  },
  {
    ques: "How many type of heading levels are allowed in HTML?",
    1: "6",
    2: "5",
    3: "4",
    4: "1",
    correct: 1,
  },
  {
    ques: "Which is the correct way to add a link in anchor tag?",
    1: "www.website.com",
    2: "website.com",
    3: "https://www.website.com (or) http://www.website.com",
    4: "All of the above",
    correct: 3,
  },
  {
    ques: "How to declare your HTML version to be HTML5?",
    1: "By Adding &lt;!DOCTYPE html&gt;",
    2: "By Adding &lt;doctype html&gt;",
    3: "By Removing html, head, and body tags",
    4: "None of the above",
    correct: 1,
  },
  {
    ques: "Which type of input tag checks if your value is email or not?",
    1: "text",
    2: "email",
    3: "password",
    4: "None of the above",
    correct: 2,
  },
  {
    ques: "How to add comments in HTML?",
    1: "&lt;!-- &nbsp; --&gt;",
    2: "/*  */",
    3: "//",
    4: "None of the above",
    correct: 1,
  },
  {
    ques: "How to create an <i>tilted text effect</i>?",
    1: "&lt;em&gt;",
    2: "&lt;i&gt;",
    3: "Both of the above",
    4: "None of the above",
    correct: 3,
  },
];

const markingScheme = { correct: 4, wrong: -1 };

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
      marks += markingScheme.correct;
    } else if (!el.selected) {
      return;
    } else if (el.selected !== el.correct) {
      marks += markingScheme.wrong;
    }
  });
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);
  overlay.innerHTML = `<h1 class="title">You scored ${marks} marks.</h1>`;
  const scoreList = document.createElement("ul");
  questions.forEach((el) => {
    const newItem = document.createElement("li");
    if (el.selected == el.correct) {
      newItem.classList.add("correct");
      newItem.innerHTML = "+4";
    } else if (!el.selected) {
      newItem.classList.add("not-attempted");
      newItem.innerHTML = "0";
    } else if (el.selected != el.correct) {
      newItem.classList.add("wrong");
      newItem.innerHTML = "-1";
    }
    scoreList.appendChild(newItem);
  });
  overlay.appendChild(scoreList);
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
