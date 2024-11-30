function handleSubmit(event) {
  event.preventDefault();

  // Get form values
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  // Simulate form submission
  console.log("Form submitted:", {
    firstName,
    lastName,
    email,
    subject,
    message,
  });

  // Show success message
  const successMessage = document.getElementById("successMessage");
  successMessage.style.display = "block";

  // Reset form
  event.target.reset();

  // Hide success message after 5 seconds
  setTimeout(() => {
    successMessage.style.display = "none";
  }, 5000);

  return false;
}
