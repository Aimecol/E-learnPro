document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form submission for demonstration
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Basic Validation (expand with actual backend integration)
  if (email && password) {
    alert("Login successful! Redirecting...");
    window.location.href = "../index.html"; // Redirect to dashboard
  } else {
    alert("Please fill in all fields.");
  }
});
