/*Sign Up Form Validation*/
document.addEventListener('DOMContentLoaded', function () {
    var signupForm = document.getElementById('signupForm');
    var errorMessage = document.getElementById("error-message");

    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Validate the form
        var validationMessages = validateForm();

        if (validationMessages.length === 0) {
            showMessage('Successfully Submitted. You will receive a Confirmation Email soon.', 'success');
            
        } else {
            // Display all validation error messages
            showError(validationMessages.join("<br>"));
        }
    });

    function validateForm() {
        var contactNumber = document.getElementById("contact-number").value;
        var email = document.getElementById("email").value;

        var errorMessages = [];

        /*Contact number*/
        var contactRegex = /^[689]\d{7}$/;
        if (!contactRegex.test(contactNumber)) {
            errorMessages.push("Invalid Contact Number. Please Try Again.");
        }

        /*Email format*/
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) {
            errorMessages.push("Invalid Email Format. Please Try Again.");
        }

        errorMessage.innerHTML = "";
        errorMessage.style.display = 'none'; 

        return errorMessages;
    }

    function showError(message) {
        errorMessage.innerHTML = message;
        errorMessage.style.display = 'block';

        setTimeout(function () {
            errorMessage.style.display = 'none';
        }, 2000);
    }

    function showMessage(message, messageType) {
        var messageBoxes = document.getElementsByClassName('confirmation-message-box');
        var messageBox = messageBoxes[0];
        messageBox.textContent = message;
        messageBox.className = 'confirmation-message-box ' + messageType;
        messageBox.style.display = 'block';

        setTimeout(function () {
            messageBox.style.display = 'none';
        }, 2000);
    }
});