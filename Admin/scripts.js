document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-menu li");
  const dropdownHeaders = document.querySelectorAll(".dropdown-header");
  const dropdownMenus = document.querySelectorAll(".dropdown-menu");
  const pages = document.querySelectorAll(".page");
  const pageTitle = document.getElementById("page-title");

  // Handle Main Navigation
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Skip dropdown headers for direct navigation
      if (item.classList.contains("dropdown-header")) return;

      // Update active class
      navItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");

      // Show corresponding page
      const pageToShow = item.dataset.page;
      pages.forEach((page) => {
        page.id === pageToShow
          ? page.classList.remove("hidden")
          : page.classList.add("hidden");
      });

      // Update page title
      pageTitle.textContent =
        pageToShow.charAt(0).toUpperCase() + pageToShow.slice(1);
    });
  });

  // Handle Dropdowns
  dropdownHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const dropdownKey = header.dataset.dropdown;
      const dropdownMenu = header.nextElementSibling;
      const dropdownIcon = header.querySelector(".dropdown-icon");

      // Toggle the dropdown menu
      dropdownMenu.classList.toggle("hidden");
      dropdownIcon.classList.toggle("rotate");

      // Close other dropdowns
      dropdownMenus.forEach((menu) => {
        if (menu !== dropdownMenu) menu.classList.add("hidden");
      });

      dropdownHeaders.forEach((hdr) => {
        if (hdr !== header)
          hdr.querySelector(".dropdown-icon").classList.remove("rotate");
      });
    });
  });

  // Ensure clicking dropdown menu items shows the correct page
  dropdownMenus.forEach((menu) => {
    menu.addEventListener("click", (event) => {
      const target = event.target.closest("li");
      if (target) {
        const pageToShow = target.dataset.page;

        // Update active state
        navItems.forEach((i) => i.classList.remove("active"));
        target.classList.add("active");

        // Show corresponding page
        pages.forEach((page) => {
          page.id === pageToShow
            ? page.classList.remove("hidden")
            : page.classList.add("hidden");
        });

        // Update page title
        pageTitle.textContent =
          pageToShow.charAt(0).toUpperCase() + pageToShow.slice(1);

        // Close all dropdowns after navigation
        dropdownMenus.forEach((menu) => menu.classList.add("hidden"));
        dropdownHeaders.forEach((hdr) =>
          hdr.querySelector(".dropdown-icon").classList.remove("rotate")
        );
      }
    });
  });
});
