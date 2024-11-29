const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("isActive");
  navLinks.classList.toggle("show");
});

// Chatbot Toggle
function toggleChatbot() {
  const chatbot = document.querySelector(".chatbot");
  chatbot.style.display = chatbot.style.display === "flex" ? "none" : "flex";
}

// Add Message with Animation
function addMessage(type, text) {
  const messagesContainer = document.querySelector(".chatbot-messages");
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", type);

  if (type === "bot") {
    // Show typing indicator before bot responds
    const typingDiv = document.createElement("div");
    typingDiv.classList.add("message", "bot");
    typingDiv.innerHTML = `<p class="typing-indicator">Typing</p>`;
    messagesContainer.appendChild(typingDiv);

    setTimeout(() => {
      // Replace typing indicator with bot's message
      typingDiv.remove();
      messageDiv.innerHTML = `<p>${text}</p>`;
      messagesContainer.appendChild(messageDiv);

      // Scroll to the latest message
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1500); // Delay to simulate typing
  } else {
    messageDiv.innerHTML = `<p>${text}</p>`;
    messagesContainer.appendChild(messageDiv);

    // Scroll to the latest message
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
}

// Send Message Event Listener
document.getElementById("send-button").addEventListener("click", function () {
  const inputField = document.getElementById("chat-input");
  const message = inputField.value.trim();
  if (message) {
    // Add user message to chat
    addMessage("user", message);

    // Simulate bot response with typing animation
    setTimeout(() => {
      addMessage(
        "bot",
        "Thanks for your query! Our team will assist you shortly."
      );
    }, 2000);

    // Clear input field
    inputField.value = "";
  }
});
