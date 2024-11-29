// const unitsContainer = document.querySelector(".units-container");

// const units = document.querySelectorAll(".unit");
// const progressBar = document.getElementById("progress");
// const completeUnitButtons = document.querySelectorAll(".complete-unit-btn");
// const quizSubmitButtons = document.querySelectorAll(".quiz-submit-btn");
// const prevBtn = document.getElementById("prev-btn");
// const nextBtn = document.getElementById("next-btn");let currentUnitIndex = 0;

// // Initialize the first unit
// function initializeUnits() {
//   units.forEach((unit, index) => {
//     if (index === currentUnitIndex) {
//       unit.classList.add("active");
//     }
//   });
//   updateProgressBar();
//   updateButtons();
// }

// // Update progress bar
// function updateProgressBar() {
//   const progressPercentage = ((currentUnitIndex + 1) / units.length) * 100;
//   progressBar.style.width = `${progressPercentage}%`;
// }

// // Update navigation buttons
// function updateButtons() {
//   prevBtn.disabled = currentUnitIndex === 0;
//   nextBtn.disabled = currentUnitIndex === units.length - 1;
// }

// // Navigate to the next unit
// function nextUnit() {
//   if (currentUnitIndex < units.length - 1) {
//     units[currentUnitIndex].classList.remove("active");
//     units[currentUnitIndex].classList.add("prev");

//     currentUnitIndex++;
//     units[currentUnitIndex].classList.add("active");
//     updateProgressBar();
//     updateButtons();
//   }
// }

// // Navigate to the previous unit
// function prevUnit() {
//   if (currentUnitIndex > 0) {
//     units[currentUnitIndex].classList.remove("active");
//     units[currentUnitIndex].classList.add("prev");

//     currentUnitIndex--;
//     units[currentUnitIndex].classList.remove("prev");
//     units[currentUnitIndex].classList.add("active");
//     updateProgressBar();
//     updateButtons();
//   }
// }

// // Event Listeners
// nextBtn.addEventListener("click", nextUnit);
// prevBtn.addEventListener("click", prevUnit);

// // Initialize on page load
// initializeUnits();

// // Timer settings (in seconds)
// const quizTimers = {
//   unit1: 120, // 2 minutes
//   // Add more units as needed
// };

// // Handle unit completion
// completeUnitButtons.forEach((button) => {
//   button.addEventListener("click", (e) => {
//     const currentUnitIndex = parseInt(e.target.dataset.unit);
//     const quizSection = document.querySelector(
//       `#unit${currentUnitIndex} .quiz`
//     );

//     // Unlock the quiz
//     quizSection.classList.remove("locked");
//     quizSection.querySelector(".quiz-submit-btn").disabled = false;

//     // Mark the unit as complete visually
//     e.target.disabled = true;
//     e.target.textContent = "Unit Completed";

//     // Start the timer for the quiz
//     startQuizTimer(
//       `timer${currentUnitIndex},
//       quizTimers[unit${currentUnitIndex}]`
//     );
//   });
// });

// // Timer function
// function startQuizTimer(timerId, duration) {
//   const timerDisplay = document.getElementById(timerId);
//   let remainingTime = duration;

//   const timerInterval = setInterval(() => {
//     const minutes = Math.floor(remainingTime / 60);
//     const seconds = remainingTime % 60;
//     timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
//       .toString()
//       .padStart(2, "0")}`;

//     remainingTime--;

//     if (remainingTime < 0) {
//       clearInterval(timerInterval);
//       alert("Time's up! You failed the quiz. Please try again.");
//       lockQuiz(timerId); // Lock the quiz again
//     }
//   }, 1000);
// }

// // Lock the quiz after time runs out
// function lockQuiz(timerId) {
//   const timerElement = document.getElementById(timerId).closest(".quiz");
//   timerElement.querySelector(".quiz-submit-btn").disabled = true;
// }

// // Handle quiz submission
// quizSubmitButtons.forEach((button) => {
//   button.addEventListener("click", (e) => {
//     const currentUnitIndex = parseInt(e.target.dataset.unit);
//     const quizQuestions = document.querySelectorAll(
//       `#unit${currentUnitIndex} .quiz ul li input`
//     );

//     let isQuizPassed = true;

//     // Validate quiz answers
//     quizQuestions.forEach((input) => {
//       if (input.checked && input.value === "wrong") {
//         isQuizPassed = false;
//       }
//     });

//     if (isQuizPassed) {
//       alert("Quiz passed! Proceeding to the next unit.");
//       unlockNextUnit(currentUnitIndex);
//       updateProgressBar(currentUnitIndex + 1);
//     } else {
//       alert("Quiz failed. Please try again.");
//     }
//   });
// });

// // Unlock the next unit
// function unlockNextUnit(currentUnitIndex) {
//   if (currentUnitIndex < units.length) {
//     const nextUnit = document.getElementById(`unit${currentUnitIndex + 1}`);
//     nextUnit.classList.remove("locked");
//     nextUnit.querySelector(".complete-unit-btn").disabled = false;
//   }
// }

// // Update progress bar
// function updateProgressBar(currentUnitIndex) {
//   const progress = ((currentUnitIndex / units.length) * 100).toFixed(0);
//   progressBar.style.width = `${progress}%`;
// }

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
  const unitId = parseInt(button.dataset.unit);
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
    unlockNextUnit(unitId);
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
