

const topologyDetails = {
  Star: "All devices connect to a central switch or hub. If one device link fails, other devices can usually continue working.",
  Bus: "All devices share a main communication cable. A cable fault can affect the whole network.",
  Ring: "Devices form a closed loop. Data travels around the ring according to the network design.",
  Mesh: "Devices have multiple interconnections. Redundant paths can improve reliability."
};

function showTopology(name) {
  document.getElementById("topologyName").textContent =
    name + " Topology";

  document.getElementById("topologyInfo").textContent =
    topologyDetails[name];
}

const questions = [
  {
    q: "Which device forwards packets between networks?",
    options: ["Hub", "Router", "Repeater", "Keyboard"],
    answer: "Router"
  },
  {
    q: "How many layers are in the OSI model?",
    options: ["4", "5", "7", "8"],
    answer: "7"
  },
  {
    q: "Which protocol is used to resolve domain names?",
    options: ["DNS", "FTP", "SMTP", "SSH"],
    answer: "DNS"
  },
  {
    q: "Which device commonly connects devices in a LAN?",
    options: ["Switch", "Printer", "Scanner", "Monitor"],
    answer: "Switch"
  },
  {
    q: "What does IP stand for?",
    options: [
      "Internet Process",
      "Internal Program",
      "Internet Protocol",
      "Information Port"
    ],
    answer: "Internet Protocol"
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function renderQuestion() {
  answered = false;

  const q = questions[currentQuestion];

  document.getElementById("question").textContent =
    `Question ${currentQuestion + 1} of ${questions.length}: ${q.q}`;

  document.getElementById("result").textContent = "";
  document.getElementById("nextButton").textContent =
    currentQuestion === questions.length - 1
      ? "View Final Score"
      : "Next Question →";

  const answers = document.getElementById("answers");
  answers.replaceChildren();

  q.options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;

    button.addEventListener("click", () => {
      if (answered) return;
      answered = true;

      if (option === q.answer) {
        score++;
        document.getElementById("result").textContent =
          "Correct! Well done.";
      } else {
        document.getElementById("result").textContent =
          "Incorrect. Correct answer: " + q.answer;
      }

      answers.querySelectorAll("button").forEach(b => {
        b.disabled = true;
      });
    });

    answers.appendChild(button);
  });
}

function nextQuestion() {
  if (!answered) {
    document.getElementById("result").textContent =
      "Please select an answer first.";
    return;
  }

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    document.getElementById("question").textContent =
      "Quiz completed!";

    document.getElementById("answers").replaceChildren();

    document.getElementById("result").textContent =
      `Your score: ${score}/${questions.length}`;

    document.getElementById("nextButton").textContent = "Try Again";
    document.getElementById("nextButton").onclick = () => {
      currentQuestion = 0;
      score = 0;
      renderQuestion();
    };
  }
}

renderQuestion();
