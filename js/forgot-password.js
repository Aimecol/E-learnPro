document
  .getElementById("forgot-password-form")
  .addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission
    const email = document.getElementById("email").value;

    // Basic email validation
    if (email) {
      alert(`A password reset link has been sent to ${email}`);
      // Redirect to login page
      window.location.href = "login.html";
    } else {
      alert("Please enter a valid email address.");
    }
  });
