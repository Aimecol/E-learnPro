document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".sidebar-nav a");
  const sections = document.querySelectorAll(".content-section");

  const sidebarToggle = document.createElement("div");
  sidebarToggle.className = "sidebar-toggle";
  sidebarToggle.innerHTML = `<i class="fas fa-bars"></i>`;
  document.body.appendChild(sidebarToggle);

  const sidebar = document.querySelector(".sidebar");
  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("show");
  });

  // Helper: Show the targeted section and hide others
  const showSection = (sectionId) => {
    sections.forEach((section) => {
      section.classList.toggle("active", section.id === sectionId);
    });
  };

  // Event Listener for Sidebar Links
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute("data-section");
      showSection(sectionId);
      // Update the URL hash
      window.location.hash = sectionId;
    });
  });

  // Initialize with the hash value or default to "dashboard"
  const initialSection = window.location.hash.replace("#", "") || "dashboard";
  showSection(initialSection);

  // Listen to hash changes (e.g., browser back/forward navigation)
  window.addEventListener("hashchange", () => {
    const sectionId = window.location.hash.replace("#", "");
    showSection(sectionId);
  });
});
