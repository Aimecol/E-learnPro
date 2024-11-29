const unitsData = [
  {
    id: 1,
    title: "Introduction to Web Development",
    description:
      "Learn the basics of web development, including HTML, CSS, and JavaScript.",
  },
  {
    id: 2,
    title: "Advanced HTML",
    description:
      "Dive deeper into HTML5 features like forms, multimedia, and semantic tags.",
  },
  {
    id: 3,
    title: "Advanced CSS",
    description: "Master Flexbox, Grid, and responsive design principles.",
  },
  {
    id: 4,
    title: "JavaScript Essentials",
    description: "Understand JavaScript fundamentals and DOM manipulation.",
  },
  {
    id: 5,
    title: "JavaScript Advanced Concepts",
    description: "Learn asynchronous JavaScript and ES6+ features.",
  },
  {
    id: 6,
    title: "Frontend Frameworks",
    description: "Get started with React or Vue.js for building modern UIs.",
  },
  {
    id: 7,
    title: "Backend Development with Node.js",
    description:
      "Set up servers and build RESTful APIs with Node.js and Express.",
  },
  {
    id: 8,
    title: "Database Integration",
    description: "Work with MySQL and MongoDB for data storage and retrieval.",
  },
  {
    id: 9,
    title: "Authentication and Security",
    description:
      "Secure your applications with JWT, OAuth, and best practices.",
  },
  {
    id: 10,
    title: "Advanced Web Development Tools",
    description:
      "Learn Git, Webpack, Babel, and other tools for efficient development.",
  },
  {
    id: 11,
    title: "Performance Optimization",
    description:
      "Optimize loading speed and performance with modern techniques.",
  },
  {
    id: 12,
    title: "Progressive Web Applications (PWAs)",
    description:
      "Build PWAs with offline functionality and push notifications.",
  },
  {
    id: 13,
    title: "Deployment and Hosting",
    description:
      "Deploy your projects to platforms like Netlify, Vercel, and AWS.",
  },
];

const unitsContainer = document.querySelector(".units-container");
const progressBar = document.getElementById("progress");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let currentUnitIndex = 0;

// Render Units Dynamically
unitsData.forEach((unit) => {
  const unitDiv = document.createElement("div");
  unitDiv.classList.add("unit", "locked");
  unitDiv.id = `unit${unit.id}`;

  unitDiv.innerHTML = `
    <h2>${unit.title}</h2>
    <p>${unit.description}</p>
    <button class="complete-unit-btn" data-unit="${unit.id}">Mark Unit as Complete</button>
    <div class="quiz hidden">
      <h3>Quiz</h3>
      <div class="timer">Time Remaining: <span id="timer${unit.id}">02:00</span></div>
      <p>1. Placeholder question for ${unit.title}</p>
      <ul>
        <li><input type="radio" name="q${unit.id}" value="wrong"> Option 1</li>
        <li><input type="radio" name="q${unit.id}" value="correct"> Option 2</li>
        <li><input type="radio" name="q${unit.id}" value="wrong"> Option 3</li>
      </ul>
      <button class="quiz-submit-btn" data-unit="${unit.id}" disabled>Submit Quiz</button>
    </div>
  `;

  unitsContainer.appendChild(unitDiv);
});

// Initialize Units and Navigation
function initializeUnits() {
  const units = document.querySelectorAll(".unit");
  units[currentUnitIndex].classList.remove("locked");
  units[currentUnitIndex].classList.add("active");

  updateProgressBar();
  updateNavButtons();
}

// Update Progress Bar
function updateProgressBar() {
  const progressPercentage = ((currentUnitIndex + 1) / unitsData.length) * 100;
  progressBar.style.width = `${progressPercentage}%`;
}

// Update Navigation Buttons
function updateNavButtons() {
  prevBtn.disabled = currentUnitIndex === 0;
  nextBtn.disabled = currentUnitIndex === unitsData.length - 1;
}

// Navigation Handlers
prevBtn.addEventListener("click", () => navigateUnit(-1));
nextBtn.addEventListener("click", () => navigateUnit(1));

function navigateUnit(direction) {
  const units = document.querySelectorAll(".unit");
  units[currentUnitIndex].classList.remove("active");

  currentUnitIndex += direction;
  units[currentUnitIndex].classList.add("active");
  units[currentUnitIndex].classList.remove("locked");

  updateProgressBar();
  updateNavButtons();
}

// Event Delegation for Buttons
unitsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("complete-unit-btn")) {
    handleUnitCompletion(e.target);
  }

  if (e.target.classList.contains("quiz-submit-btn")) {
    handleQuizSubmission(e.target);
  }
});

// Handle Unit Completion
function handleUnitCompletion(button) {
  const unitId = parseInt(button.dataset.unit);
  const quizSection = document.querySelector(`#unit${unitId} .quiz`);

  // Unlock Quiz and Show it
  quizSection.classList.remove("hidden");
  quizSection.querySelector(".quiz-submit-btn").disabled = false;

  button.disabled = true;
  button.textContent = "Unit Completed";

  startQuizTimer(`timer${unitId}`, quizTimers[`unit${unitId}`]);
}

// Quiz Timer
function startQuizTimer(timerId, duration) {
  const timerDisplay = document.getElementById(timerId);
  let remainingTime = duration;

  const timerInterval = setInterval(() => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;

    remainingTime--;

    if (remainingTime < 0) {
      clearInterval(timerInterval);
      alert("Time's up! You failed the quiz. Please try again.");
      lockQuiz(timerId);
    }
  }, 1000);
}

// Lock Quiz After Timer
function lockQuiz(timerId) {
  const quizElement = document.getElementById(timerId).closest(".quiz");
  quizElement.querySelector(".quiz-submit-btn").disabled = true;
}

// Handle Quiz Submission
function handleQuizSubmission(button) {
  const unitId = parseInt(button.dataUnit);
  const quizQuestions = document.querySelectorAll(
    `#unit${unitId} .quiz ul li input`
  );

  let isQuizPassed = true;

  quizQuestions.forEach((input) => {
    if (input.checked && input.value === "wrong") {
      isQuizPassed = false;
    }
  });

  if (isQuizPassed) {
    alert("Quiz passed! Proceeding to the next unit.");
    // unlockNextUnit(unitId);
    navigateUnit(1);
  } else {
    alert("Quiz failed. Please try again.");
  }
}

// Unlock Next Unit
function unlockNextUnit(unitId) {
  if (unitId < unitsData.length) {
    const nextUnit = document.getElementById(`unit${unitId + 1}`);
    nextUnit.classList.remove("locked");
    nextUnit.querySelector(".complete-unit-btn").disabled = false;
  }
}

// Initialize Units on Page Load
initializeUnits();
