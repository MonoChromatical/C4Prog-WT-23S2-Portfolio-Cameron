/* jshint esversion: 6 */

const contactForm = document.querySelector("#contact-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");
const nameError = document.querySelector("#name-error");
const emailError = document.querySelector("#email-error");
const messageError = document.querySelector("#message-error");
const contactResponse = document.querySelector("#contact-response");

const namePattern = /^[a-zA-Z\s'-]{2,40}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const messagePattern = /^.{10,500}$/s;

function clearContactMessages() {
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    contactResponse.textContent = "";
}

function validateContactForm() {
    let isValid = true;

    clearContactMessages();

    if (!namePattern.test(nameInput.value.trim())) {
        nameError.textContent = "Name is required. Use 2 to 40 letters.";
        isValid = false;
    }

    if (!emailPattern.test(emailInput.value.trim())) {
        emailError.textContent = "Valid email is required.";
        isValid = false;
    }

    if (!messagePattern.test(messageInput.value.trim())) {
        messageError.textContent = "Message must be at least 10 characters.";
        isValid = false;
    }

    return isValid;
}

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (validateContactForm()) {
        contactResponse.textContent = "Form validation complete. Message is ready to send.";
        contactForm.reset();
    }
});
