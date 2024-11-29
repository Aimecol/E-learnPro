document.addEventListener("DOMContentLoaded", () => {
  const studentBtn = document.getElementById("student-btn");
  const teacherBtn = document.getElementById("teacher-btn");

  studentBtn.addEventListener("click", () => {
    studentBtn.classList.add("active");
    teacherBtn.classList.remove("active");
  });

  teacherBtn.addEventListener("click", () => {
    teacherBtn.classList.add("active");
    studentBtn.classList.remove("active");
  });
});
