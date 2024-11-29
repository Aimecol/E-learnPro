const unitData = {
  id: 1,
  title: "Introduction to Web Development",
  chapters: [
    {
      id: 1,
      title: "HTML Basics",
      content: `
        <h2>HTML Basics</h2>
        <p>HTML (HyperText Markup Language) is the foundation of web development, defining the structure of web pages.</p>
        <iframe width="100%" height="315" src="https://www.youtube.com/embed/UB1O30fR-EE" frameborder="0" allowfullscreen></iframe>
        <a href="/resources/html_basics.pdf" download class="download-btn">Download Resource</a>
      `,
      quiz: {
        questions: [
          {
            question: "What does HTML stand for?",
            options: ["Option A", "Option B", "Option C"],
            correct: 0,
          },
          {
            question: "Which tag is for the largest heading?",
            options: ["<h1>", "<h6>", "<h3>"],
            correct: 0,
          },
        ],
      },
    },
    {
      id: 2,
      title: "CSS Basics",
      content: `
        <h2>CSS Basics</h2>
        <p>CSS (Cascading Style Sheets) controls the visual presentation of web pages.</p>
        <iframe width="100%" height="315" src="https://www.youtube.com/embed/1Rs2ND1ryYc" frameborder="0" allowfullscreen></iframe>
        <a href="/resources/css_basics.pdf" download class="download-btn">Download Resource</a>
      `,
      quiz: {
        questions: [
          {
            question: "What does CSS stand for?",
            options: ["Option A", "Option B", "Option C"],
            correct: 1,
          },
          {
            question: "Which property changes text color?",
            options: ["color", "text-color", "font-color"],
            correct: 0,
          },
        ],
      },
    },
    {
      id: 3,
      title: "JavaScript Basics",
      content: `
        <h2>JavaScript Basics</h2>
        <p>JavaScript adds interactivity to web pages, enabling dynamic content and user interactions.</p>
        <iframe width="100%" height="315" src="https://www.youtube.com/embed/hdI2bqOjy3c" frameborder="0" allowfullscreen></iframe>
        <a href="/resources/js_basics.pdf" download class="download-btn">Download Resource</a>
      `,
      quiz: {
        questions: [
          {
            question: "What is JavaScript primarily used for?",
            options: ["Option A", "Option B", "Option C"],
            correct: 2,
          },
          {
            question: "Which keyword declares a variable?",
            options: ["let", "var", "both"],
            correct: 2,
          },
        ],
      },
    },
    {
      id: 4,
      title: "Advanced CSS",
      content: `
        <h2>Advanced CSS</h2>
        <p>Master Flexbox, Grid layouts, and responsive design for modern web development.</p>
        <iframe width="100%" height="315" src="https://www.youtube.com/embed/JJSoEo8JSnc" frameborder="0" allowfullscreen></iframe>
        <a href="/resources/advanced_css.pdf" download class="download-btn">Download Resource</a>
      `,
      quiz: {
        questions: [
          {
            question: "What does 'display: flex;' do?",
            options: ["Option A", "Option B", "Option C"],
            correct: 0,
          },
          {
            question: "What property aligns items in a grid?",
            options: ["align-items", "justify-items", "grid-align"],
            correct: 1,
          },
        ],
      },
    },
    // Add more chapters as needed
  ],
};

const chapterList = document.getElementById("chapter-list");
const chapterTitle = document.getElementById("chapter-title");
const chapterBody = document.getElementById("chapter-body");
const prevChapterBtn = document.getElementById("prev-chapter");
const nextChapterBtn = document.getElementById("next-chapter");
const progressBar = document.getElementById("progress-bar");
const toggleThemeBtn = document.getElementById("toggle-theme");

let currentChapterIndex = 0;
let completedChapters = new Set(); // Tracks completed chapters
let darkMode = false;

// Render Chapter Navigation
function renderChapterNav() {
  unitData.chapters.forEach((chapter, index) => {
    const li = document.createElement("li");
    li.textContent = chapter.title;
    li.dataset.index = index;
    li.className = index === 0 ? "active" : "";
    li.addEventListener("click", () => loadChapter(index));
    chapterList.appendChild(li);
  });
}
 
// Render Quiz Section for Chapters
function renderQuiz(quizData, chapterId) {
  let quizHTML = `<h3>Chapter Quiz</h3>`;
  quizData.questions.forEach((q, index) => {
    quizHTML += `
      <p>${index + 1}. ${q.question}</p>
      <ul>
        ${q.options
          .map(
            (option, i) =>
              `<li>
                <input type="radio" name="quiz${chapterId}q${index}" value="${i}">
                ${option}
              </li>`
          )
          .join("")}
      </ul>`;
  });

  quizHTML += `
    <button class="submit-quiz-btn" data-chapter="${chapterId}">Submit Quiz</button>
    <p class="quiz-result" id="result${chapterId}"></p>
  `;

  return quizHTML;
}

// Handle Quiz Submission
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("submit-quiz-btn")) {
    const chapterId = e.target.dataset.chapter;
    const quizData = unitData.chapters.find((c) => c.id === +chapterId).quiz;

    let isCorrect = true;

    quizData.questions.forEach((q, index) => {
      const selectedOption = document.querySelector(
        `input[name="quiz${chapterId}q${index}"]:checked`
      );
      if (!selectedOption || +selectedOption.value !== q.correct) {
        isCorrect = false;
      }
    });

    const resultElement = document.getElementById(`result${chapterId}`);
    if (isCorrect) {
      resultElement.textContent = "Quiz Passed! You can proceed.";
      resultElement.style.color = "green";
    } else {
      resultElement.textContent = "Quiz Failed. Please try again.";
      resultElement.style.color = "red";
    }
  }
});

// Load Chapter Content
function loadChapter(index) {
  currentChapterIndex = index;
  const chapter = unitData.chapters[index];
  chapterTitle.textContent = chapter.title;
  chapterBody.innerHTML = chapter.content;

  // Animation for Content Transition
  chapterBody.classList.add("fade-in");
  setTimeout(() => chapterBody.classList.remove("fade-in"), 500);

  // Update Buttons and Progress
  prevChapterBtn.disabled = index === 0;
  nextChapterBtn.disabled = index === unitData.chapters.length - 1;

  // Mark Chapter as Completed
  completedChapters.add(index);
  updateProgressBar();

  // Highlight Active Chapter
  document.querySelectorAll("#chapter-list li").forEach((li, i) => {
    li.className =
      i === index ? "active" : completedChapters.has(i) ? "completed" : "";
  });
}

// Update Progress Bar
function updateProgressBar() {
  const progress = (completedChapters.size / unitData.chapters.length) * 100;
  progressBar.style.width = `${progress}%`;
}

// Toggle Dark/Light Mode
toggleThemeBtn.addEventListener("click", () => {
  darkMode = !darkMode;
  document.body.className = darkMode ? "dark-mode" : "";
  toggleThemeBtn.textContent = darkMode
    ? "Switch to Light Mode"
    : "Switch to Dark Mode";
});

// Button Navigation Handlers
prevChapterBtn.addEventListener("click", () => {
  if (currentChapterIndex > 0) loadChapter(currentChapterIndex - 1);
});
nextChapterBtn.addEventListener("click", () => {
  if (currentChapterIndex < unitData.chapters.length - 1)
    loadChapter(currentChapterIndex + 1);
});

// Initialize
renderChapterNav();
loadChapter(0);
