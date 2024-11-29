const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const courseCards = document.querySelectorAll(".course-card");

// filter function
function filterCourses() {
  const searchText = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;
  let hasResults = false;

  courseCards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    const description = card.querySelector("p").textContent.toLowerCase();
    const category = card.getAttribute("data-category");

    const matchesSearch =
      title.includes(searchText) || description.includes(searchText);
    const matchesCategory =
      selectedCategory === "all" || category === selectedCategory;

    if (matchesSearch && matchesCategory) {
      card.style.display = "block";
      hasResults = true;
    } else {
      card.style.display = "none";
    }
  });

  document.getElementById("noResults").style.display = hasResults
    ? "none"
    : "block";
}


// Event listeners
searchInput.addEventListener("input", filterCourses);
categoryFilter.addEventListener("change", filterCourses);

const learnBtn = document.querySelectorAll("#learn-btn");

learnBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.location.href = "./course_detail.html"
  })
})