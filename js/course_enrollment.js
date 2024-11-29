const paymentSelect = document.getElementById("payment");
const creditCardDetails = document.getElementById("creditCardDetails");
const paypalDetails = document.getElementById("paypalDetails");
const enrollmentForm = document.getElementById("enrollmentForm");
const confirmationModal = document.getElementById("confirmationModal");
const confirmCourse = document.getElementById("confirmCourse");
const confirmName = document.getElementById("confirmName");
const confirmEmail = document.getElementById("confirmEmail");
const confirmPayment = document.getElementById("confirmPayment");
const confirmEnroll = document.getElementById("confirmEnroll");
const cancelEnroll = document.getElementById("cancelEnroll");

// Show payment details based on selection
paymentSelect.addEventListener("change", (e) => {
  const selectedPayment = e.target.value;

  // Hide all payment details initially
  creditCardDetails.classList.add("hidden");
  paypalDetails.classList.add("hidden");

  // Show relevant details
  if (selectedPayment === "credit-card") {
    creditCardDetails.classList.remove("hidden");
  } else if (selectedPayment === "paypal") {
    paypalDetails.classList.remove("hidden");
  }
});

// Handle form submission
enrollmentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const selectedCourse = courseSelect.value;
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const paymentMethod = paymentSelect.value;

  // Populate modal with enrollment details
  confirmCourse.textContent = selectedCourse;
  confirmName.textContent = fullName;
  confirmEmail.textContent = email;
  confirmPayment.textContent = paymentMethod;

  // Show the modal
  confirmationModal.classList.remove("hidden");
});

// Handle modal actions
confirmEnroll.addEventListener("click", () => {
  document.location.href = "./start_course.html";
});

cancelEnroll.addEventListener("click", () => {
  confirmationModal.classList.add("hidden");
});
