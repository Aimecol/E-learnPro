document.addEventListener("DOMContentLoaded", () => {
  const dateTimeSpan = document.querySelector("#current-date-time span");

  const updateDateTime = () => {
    const now = new Date();
    dateTimeSpan.textContent = now.toLocaleString();
  };
  updateDateTime();
  setInterval(updateDateTime, 60000);
});

document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".usual");
  const dropdownHeaders = document.querySelectorAll(".dropdown-header");
  const dropdownMenus = document.querySelectorAll(".dropdown-menu");
  const pages = document.querySelectorAll(".page");
  const pageTitle = document.getElementById("page-title");

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");

      const pageToShow = item.dataset.page;
      pages.forEach((page) => {
        page.id === pageToShow
          ? page.classList.remove("hidden")
          : page.classList.add("hidden");
      });

      pageTitle.textContent =
        pageToShow.charAt(0).toUpperCase() + pageToShow.slice(1);

      dropdownMenus.forEach((menu) => menu.classList.add("hidden"));
      dropdownHeaders.forEach((header) =>
        header.querySelector(".dropdown-icon").classList.remove("rotate")
      );
    });
  });

  dropdownHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const dropdownMenu = header.nextElementSibling;
      const dropdownIcon = header.querySelector(".dropdown-icon");

      dropdownMenu.classList.toggle("hidden");
      dropdownIcon.classList.toggle("rotate");

      dropdownMenus.forEach((menu) => {
        if (menu !== dropdownMenu) menu.classList.add("hidden");
      });

      dropdownHeaders.forEach((hdr) => {
        if (hdr !== header)
          hdr.querySelector(".dropdown-icon").classList.remove("rotate");
      });
    });
  });

  dropdownMenus.forEach((menu) => {
    menu.addEventListener("click", (event) => {
      const target = event.target.closest("li");
      if (target) {
        const pageToShow = target.dataset.page;

        navItems.forEach((i) => i.classList.remove("active"));
        target.classList.add("active");

        pages.forEach((page) => {
          page.id === pageToShow
            ? page.classList.remove("hidden")
            : page.classList.add("hidden");
        });

        pageTitle.textContent =
          pageToShow.charAt(0).toUpperCase() + pageToShow.slice(1);

        dropdownMenus.forEach((menu) => menu.classList.add("hidden"));
        dropdownHeaders.forEach((hdr) =>
          hdr.querySelector(".dropdown-icon").classList.remove("rotate")
        );
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const userTypeSelect = document.getElementById("user-type");
  const dynamicFieldsContainer = document.getElementById("dynamic-fields");
  const addUserForm = document.getElementById("add-user-form");

  const userTypeFields = {
    student: `
      <div class="form-group">
        <label for="enrollment-id">Enrollment ID</label>
        <input type="text" id="enrollment-id" placeholder="Enter enrollment ID" required />
      </div>
      <div class="form-group">
        <label for="class-level">Class Level</label>
        <input type="text" id="class-level" placeholder="Enter class level" required />
      </div>
    `,
    instructor: `
      <div class="form-group">
        <label for="department">Department</label>
        <input type="text" id="department" placeholder="Enter department" required />
      </div>
      <div class="form-group">
        <label for="expertise">Expertise</label>
        <input type="text" id="expertise" placeholder="Enter areas of expertise" required />
      </div>
    `,
    editor: `
      <div class="form-group">
        <label for="editor-role">Role</label>
        <input type="text" id="editor-role" placeholder="Enter editor's role" required />
      </div>
    `,
    "semi-admin": `
      <div class="form-group">
        <label for="permissions">Permissions</label>
        <textarea id="permissions" placeholder="Define permissions" required></textarea>
      </div>
    `,
  };

  userTypeSelect.addEventListener("change", (e) => {
    const selectedType = e.target.value;
    dynamicFieldsContainer.innerHTML = `
      <div class="form-group">
        <label for="full-name">Full Name</label>
        <input type="text" id="full-name" placeholder="Enter full name" required />
      </div>
      <div class="form-group">
        <label for="email">Email Address</label>
        <input type="email" id="email" placeholder="Enter email address" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" placeholder="Create a password" required />
      </div>
      ${userTypeFields[selectedType] || ""}
    `;
  });

  // Form submission
  addUserForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("User added successfully!");
    addUserForm.reset();
    dynamicFieldsContainer.innerHTML = "";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("search-bar");
  const userTypeFilter = document.getElementById("user-type-filter");
  const userSections = document.querySelectorAll(".user-section");

  // Mock user data
  const users = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@student.com",
      type: "student",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@instructor.com",
      type: "instructor",
    },
    { id: 3, name: "Cathy Green", email: "cathy@editor.com", type: "editor" },
    {
      id: 4,
      name: "David Brown",
      email: "david@semiadmin.com",
      type: "semi-admin",
    },
    { id: 5, name: "Eve White", email: "eve@student.com", type: "student" },
    {
      id: 6,
      name: "Frank Moore",
      email: "frank@instructor.com",
      type: "instructor",
    },
    { id: 7, name: "Grace Taylor", email: "grace@editor.com", type: "editor" },
    {
      id: 8,
      name: "Hannah King",
      email: "hannah@semiadmin.com",
      type: "semi-admin",
    },
    { id: 9, name: "Ivy Walker", email: "ivy@student.com", type: "student" },
    {
      id: 10,
      name: "Jack Hall",
      email: "jack@instructor.com",
      type: "instructor",
    },
    { id: 11, name: "Karen Scott", email: "karen@editor.com", type: "editor" },
    {
      id: 12,
      name: "Leo Adams",
      email: "leo@semiadmin.com",
      type: "semi-admin",
    },
    { id: 13, name: "Mia Nelson", email: "mia@student.com", type: "student" },
    {
      id: 14,
      name: "Noah Young",
      email: "noah@instructor.com",
      type: "instructor",
    },
    {
      id: 15,
      name: "Olivia Turner",
      email: "olivia@editor.com",
      type: "editor",
    },
    {
      id: 16,
      name: "Paul Lewis",
      email: "paul@semiadmin.com",
      type: "semi-admin",
    },
    {
      id: 17,
      name: "Quinn Harris",
      email: "quinn@student.com",
      type: "student",
    },
    {
      id: 18,
      name: "Ruth Martin",
      email: "ruth@instructor.com",
      type: "instructor",
    },
    {
      id: 19,
      name: "Sophia Clark",
      email: "sophia@editor.com",
      type: "editor",
    },
    {
      id: 20,
      name: "Thomas Baker",
      email: "thomas@semiadmin.com",
      type: "semi-admin",
    },
    { id: 21, name: "Uma Lee", email: "uma@student.com", type: "student" },
    {
      id: 22,
      name: "Victor Hill",
      email: "victor@instructor.com",
      type: "instructor",
    },
    {
      id: 23,
      name: "Willow Perez",
      email: "willow@editor.com",
      type: "editor",
    },
    {
      id: 24,
      name: "Xavier Reed",
      email: "xavier@semiadmin.com",
      type: "semi-admin",
    },
    { id: 25, name: "Yara Cooper", email: "yara@student.com", type: "student" },
    {
      id: 26,
      name: "Zane Rogers",
      email: "zane@instructor.com",
      type: "instructor",
    },
    { id: 27, name: "Abby Gray", email: "abby@editor.com", type: "editor" },
    {
      id: 28,
      name: "Ben Murphy",
      email: "ben@semiadmin.com",
      type: "semi-admin",
    },
    { id: 29, name: "Chloe Cox", email: "chloe@student.com", type: "student" },
    {
      id: 30,
      name: "Dylan Bell",
      email: "dylan@instructor.com",
      type: "instructor",
    },
    // Add more as necessary...
  ];

  // Cache DOM elements for user lists
  const userLists = {
    student: document.getElementById("students-list"),
    instructor: document.getElementById("instructors-list"),
    editor: document.getElementById("editors-list"),
    "semi-admin": document.getElementById("semi-admins-list"),
  };

  /**
   * Populate user data into their respective lists
   */
  const populateUsers = () => {
    // Clear existing content
    Object.values(userLists).forEach((list) => (list.innerHTML = ""));
    // Add user cards
    users.forEach((user) => {
      const userCard = createUserCard(user);
      userLists[user.type].appendChild(userCard);
    });
  };

  /**
   * Create a user card element
   * @param {Object} user - User object
   * @returns {HTMLElement} - User card element
   */
  const createUserCard = (user) => {
    const userCard = document.createElement("div");
    userCard.className = "user-card";
    userCard.dataset.type = user.type;
    userCard.dataset.name = user.name.toLowerCase();
    userCard.dataset.email = user.email.toLowerCase();
    userCard.innerHTML = `
      <h3>${user.name}</h3>
      <p>${user.email}</p>
      <p><strong>${user.type}</strong></p>
    `;
    return userCard;
  };

  /**
   * Handle real-time search and filter functionality
   */
  const handleSearchAndFilter = () => {
    const query = searchBar.value.toLowerCase();
    const selectedType = userTypeFilter.value;

    // Iterate through all user cards
    document.querySelectorAll(".user-card").forEach((card) => {
      const matchesQuery =
        card.dataset.name.includes(query) || card.dataset.email.includes(query);
      const matchesType =
        selectedType === "all" || card.dataset.type === selectedType;

      // Display card if it matches both search and filter criteria
      card.style.display = matchesQuery && matchesType ? "block" : "none";
    });

    // Update visibility of user sections
    updateSectionVisibility();
  };

  /**
   * Update the visibility of user sections based on filtered results
   */
  const updateSectionVisibility = () => {
    userSections.forEach((section) => {
      const hasVisibleUsers = Array.from(
        section.querySelectorAll(".user-card")
      ).some((card) => card.style.display === "block");
      section.style.display = hasVisibleUsers ? "block" : "none";
    });
  };

  // Event listeners for search and filter
  searchBar.addEventListener("input", handleSearchAndFilter);
  userTypeFilter.addEventListener("change", handleSearchAndFilter);

  // Initial population of users
  populateUsers();
});

document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("search-bar");
  const filterCategory = document.getElementById("filter-category");
  const filterInstructor = document.getElementById("filter-instructor");
  const coursesList = document.querySelectorAll(".course-card");

  const filterCourses = () => {
    const searchText = searchBar.value.toLowerCase();
    const category = filterCategory.value;
    const instructor = filterInstructor.value;

    coursesList.forEach((course) => {
      const title = course
        .querySelector(".course-title")
        .textContent.toLowerCase();
      const courseCategory = course.dataset.category;
      const courseInstructor = course.dataset.instructor;

      const matchesSearch = title.includes(searchText);
      const matchesCategory = !category || courseCategory === category;
      const matchesInstructor = !instructor || courseInstructor === instructor;

      if (matchesSearch && matchesCategory && matchesInstructor) {
        course.style.display = "block";
      } else {
        course.style.display = "none";
      }
    });
  };

  searchBar.addEventListener("input", filterCourses);
  filterCategory.addEventListener("change", filterCourses);
  filterInstructor.addEventListener("change", filterCourses);
});

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("payment-search");
  const filterDropdown = document.getElementById("payment-filter");
  const tableRows = document.querySelectorAll(".payment-table tbody tr");
  const prevBtn = document.querySelector(".page-btn.prev");
  const nextBtn = document.querySelector(".page-btn.next");
  const pageInfo = document.querySelector(".page-info");
  const noResultsMessage = document.createElement("div");
  const resetButton = document.createElement("button");

  // Initialize state
  let currentPage = 1;
  const rowsPerPage = 10;
  let visibleRows = Array.from(tableRows);

  // Add "No Results" message
  noResultsMessage.classList.add("no-results");
  noResultsMessage.textContent = "No results found.";
  noResultsMessage.style.display = "none";
  document.querySelector(".payment-table").appendChild(noResultsMessage);

  // Add Reset button
  resetButton.textContent = "Reset Filters";
  resetButton.classList.add("reset-button");
  document.querySelector(".payment-actions").appendChild(resetButton);

  // Debounce function for search
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  // Render table rows based on filters and pagination
  const renderTable = () => {
    const filterValue = filterDropdown.value;
    const searchQuery = searchInput.value.toLowerCase();

    // Filter rows
    visibleRows = Array.from(tableRows).filter((row) => {
      const statusMatch =
        filterValue === "all" ||
        row.querySelector(".status").classList.contains(filterValue);
      const searchMatch =
        row.cells[0].textContent.toLowerCase().includes(searchQuery) ||
        row.cells[1].textContent.toLowerCase().includes(searchQuery);
      return statusMatch && searchMatch;
    });

    // Update pagination and display rows
    const start = (currentPage - 1) * rowsPerPage;
    const end = currentPage * rowsPerPage;
    tableRows.forEach((row) => (row.style.display = "none"));
    visibleRows.slice(start, end).forEach((row) => (row.style.display = ""));

    // Update page info
    const totalPages = Math.ceil(visibleRows.length / rowsPerPage) || 1;
    currentPage = Math.min(currentPage, totalPages);
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;

    // Show or hide "No Results" message
    noResultsMessage.style.display =
      visibleRows.length === 0 ? "block" : "none";
  };

  // Highlight search matches
  const highlightSearchMatches = () => {
    const searchQuery = searchInput.value.toLowerCase();
    tableRows.forEach((row) => {
      const userCell = row.cells[1];
      if (
        searchQuery &&
        userCell.textContent.toLowerCase().includes(searchQuery)
      ) {
        userCell.innerHTML = userCell.textContent.replace(
          new RegExp(searchQuery, "gi"),
          (match) => `<span class="highlight">${match}</span>`
        );
      } else {
        userCell.innerHTML = userCell.textContent;
      }
    });
  };

  // Event listeners
  searchInput.addEventListener(
    "input",
    debounce(() => {
      highlightSearchMatches();
      renderTable();
    }, 300)
  );

  filterDropdown.addEventListener("change", renderTable);

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderTable();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentPage * rowsPerPage < visibleRows.length) {
      currentPage++;
      renderTable();
    }
  });

  resetButton.addEventListener("click", () => {
    searchInput.value = "";
    filterDropdown.value = "all";
    currentPage = 1;
    renderTable();
  });

  // Initial render
  renderTable();
});

document.addEventListener("DOMContentLoaded", () => {
  const rowsPerPage = 10;
  const tableBody = document.getElementById("payment-history-body");
  const rows = tableBody.querySelectorAll("tr");
  const paginationInfo = document.getElementById("pagination-info");
  const prevPageBtn = document.getElementById("prev-page");
  const nextPageBtn = document.getElementById("next-page");

  let currentPage = 1;
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const updatePagination = () => {
    // Hide all rows
    rows.forEach((row, index) => {
      row.style.display =
        index >= (currentPage - 1) * rowsPerPage &&
        index < currentPage * rowsPerPage
          ? ""
          : "none";
    });

    // Update pagination info
    paginationInfo.textContent = `Page ${currentPage} of ${totalPages}`;

    // Disable/enable buttons
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
  };

  prevPageBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      updatePagination();
    }
  });

  nextPageBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      updatePagination();
    }
  });

  // Initialize
  updatePagination();
});

document.addEventListener("DOMContentLoaded", () => {
  const manageRowsPerPage = 10;
  const manageTableBody = document.getElementById("manage-payments-body");
  const manageRows = manageTableBody.querySelectorAll("tr");
  const managePaginationInfo = document.getElementById(
    "manage-pagination-info"
  );
  const managePrevPageBtn = document.getElementById("manage-prev-page");
  const manageNextPageBtn = document.getElementById("manage-next-page");
  const searchInput = document.getElementById("search-payment");

  let manageCurrentPage = 1;
  const manageTotalPages = Math.ceil(manageRows.length / manageRowsPerPage);

  const updateManagePagination = () => {
    // Hide all rows
    manageRows.forEach((row, index) => {
      row.style.display =
        index >= (manageCurrentPage - 1) * manageRowsPerPage &&
        index < manageCurrentPage * manageRowsPerPage
          ? ""
          : "none";
    });

    // Update pagination info
    managePaginationInfo.textContent = `Page ${manageCurrentPage} of ${manageTotalPages}`;

    // Disable/enable buttons
    managePrevPageBtn.disabled = manageCurrentPage === 1;
    manageNextPageBtn.disabled = manageCurrentPage === manageTotalPages;
  };

  const filterPayments = (searchTerm) => {
    const term = searchTerm.toLowerCase();
    manageRows.forEach((row) => {
      const text = row.innerText.toLowerCase();
      row.style.display = text.includes(term) ? "" : "none";
    });
  };

  managePrevPageBtn.addEventListener("click", () => {
    if (manageCurrentPage > 1) {
      manageCurrentPage--;
      updateManagePagination();
    }
  });

  manageNextPageBtn.addEventListener("click", () => {
    if (manageCurrentPage < manageTotalPages) {
      manageCurrentPage++;
      updateManagePagination();
    }
  });

  searchInput.addEventListener("input", (e) => {
    filterPayments(e.target.value);
  });

  // Initialize
  updateManagePagination();
});

document.addEventListener("DOMContentLoaded", () => {
  const reportType = document.getElementById("report-type");
  const startDate = document.getElementById("start-date");
  const endDate = document.getElementById("end-date");
  const applyFiltersBtn = document.getElementById("apply-filters");
  const reportTableBody = document.getElementById("report-table-body");
  const reportChartCanvas = document.getElementById("report-chart-canvas");

  // Mock Data
  const reportsData = [
    {
      id: "#1001",
      name: "John Doe",
      type: "User",
      date: "2024-11-25",
      status: "Active",
      amount: "$120.00",
    },
    {
      id: "#1002",
      name: "Jane Smith",
      type: "Course",
      date: "2024-11-24",
      status: "Completed",
      amount: "$95.00",
    },
    {
      id: "#1003",
      name: "David Lee",
      type: "Payment",
      date: "2024-11-23",
      status: "Pending",
      amount: "$70.00",
    },
  ];

  // Render Table Data
  const renderTable = (data) => {
    reportTableBody.innerHTML = "";
    data.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.type}</td>
        <td>${item.date}</td>
        <td>${item.status}</td>
        <td>${item.amount}</td>
      `;
      reportTableBody.appendChild(row);
    });
  };

  // Filter and Apply
  const applyFilters = () => {
    const filteredData = reportsData.filter((item) => {
      const typeMatches =
        reportType.value === "all" ||
        item.type.toLowerCase() === reportType.value.toLowerCase();
      const dateMatches =
        (!startDate.value ||
          new Date(item.date) >= new Date(startDate.value)) &&
        (!endDate.value || new Date(item.date) <= new Date(endDate.value));
      return typeMatches && dateMatches;
    });
    renderTable(filteredData);
  };

  // Generate Chart (Using Chart.js)
  const generateChart = () => {
    const ctx = reportChartCanvas.getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Users", "Courses", "Payments"],
        datasets: [
          {
            label: "Counts",
            data: [reportsData.length, 100, 50],
            backgroundColor: ["#007bff", "#ffc107", "#28a745"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  // Event Listeners
  applyFiltersBtn.addEventListener("click", applyFilters);

  // Initialize
  renderTable(reportsData);
  generateChart();
});

document.addEventListener("DOMContentLoaded", () => {
  const ticketCards = document.querySelectorAll(".ticket-card");
  const statusFilter = document.getElementById("ticket-status-filter");
  const ticketModal = document.getElementById("ticket-modal");
  const closeModalBtn = document.querySelector(".close-modal-btn");
  const ticketDetails = document.getElementById("ticket-details");

  const ticketsData = {
    1001: {
      id: "#1001",
      subject: "Issue with Login",
      submittedBy: "John Doe",
      status: "Open",
      description:
        "I am unable to log in to my account despite entering the correct credentials.",
      date: "2024-11-25",
    },
    1002: {
      id: "#1002",
      subject: "Payment Not Reflecting",
      submittedBy: "Jane Smith",
      status: "Pending",
      description: "I made a payment, but it does not reflect in my account.",
      date: "2024-11-24",
    },
    1003: {
      id: "#1003",
      subject: "Unable to Access Course",
      submittedBy: "David Lee",
      status: "Closed",
      description: "I cannot access the course I enrolled in last week.",
      date: "2024-11-23",
    },
  };

  // Filter tickets by status
  statusFilter.addEventListener("change", () => {
    const status = statusFilter.value;
    ticketCards.forEach((card) => {
      if (status === "all" || card.dataset.status === status) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });

  // View ticket details
  document.querySelectorAll(".view-ticket-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const ticketId = btn.dataset.ticketId;
      const ticket = ticketsData[ticketId];
      if (ticket) {
        ticketDetails.innerHTML = `
          <p><strong>ID:</strong> ${ticket.id}</p>
          <p><strong>Subject:</strong> ${ticket.subject}</p>
          <p><strong>Submitted By:</strong> ${ticket.submittedBy}</p>
          <p><strong>Status:</strong> ${ticket.status}</p>
          <p><strong>Description:</strong> ${ticket.description}</p>
          <p><strong>Date:</strong> ${ticket.date}</p>
        `;
        ticketModal.classList.remove("hidden");
      }
    });
  });

  // Close modal
  closeModalBtn.addEventListener("click", () => {
    ticketModal.classList.add("hidden");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;
      const icon = question.querySelector(".toggle-icon");

      // Close all other answers
      document.querySelectorAll(".faq-answer").forEach((ans) => {
        if (ans !== answer) {
          ans.classList.remove("visible");
          ans.previousElementSibling.classList.remove("active");
        }
      });

      // Toggle current answer
      answer.classList.toggle("visible");
      question.classList.toggle("active");

      if (answer.classList.contains("hidden")) {
        // Collapse other answers
        document
          .querySelectorAll(".faq-answer")
          .forEach((ans) => ans.classList.add("hidden"));
        document
          .querySelectorAll(".toggle-icon")
          .forEach((icon) => (icon.textContent = "+"));

        // Expand current answer
        answer.classList.remove("hidden");
        icon.textContent = "-";
      } else {
        // Collapse current answer
        answer.classList.add("hidden");
        icon.textContent = "+";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const twoFactorToggle = document.getElementById("twoFactorToggle");
  const themeSelector = document.getElementById("themeSelector");
  const saveButton = document.querySelector(".save-button");
  const resetButton = document.querySelector(".reset-button");

  // Toggle Two-Factor Authentication
  twoFactorToggle.addEventListener("click", () => {
    const isEnabled = twoFactorToggle.classList.toggle("enabled");
    twoFactorToggle.textContent = isEnabled
      ? "Disable Two-Factor Authentication"
      : "Enable Two-Factor Authentication";
    twoFactorToggle.style.backgroundColor = isEnabled ? "#dc3545" : "#007bff";
  });

  // Save Settings
  saveButton.addEventListener("click", () => {
    alert("Settings saved successfully!");
  });

  // Reset Settings
  resetButton.addEventListener("click", () => {
    document.getElementById("username").value = "JohnDoe";
    document.getElementById("email").value = "johndoe@example.com";
    document.getElementById("password").value = "";
    twoFactorToggle.classList.remove("enabled");
    twoFactorToggle.textContent = "Enable Two-Factor Authentication";
    twoFactorToggle.style.backgroundColor = "#007bff";
    themeSelector.value = "light";
    alert("Settings reset to default.");
  });
});
