/*Sign Up Form Validation*/

document.addEventListener('DOMContentLoaded', function () {
    var signupForm = document.getElementById('signupForm');
    var errorMessage = document.getElementById("error-message");

    //Event Listener when 'Submit' is pressed//
    signupForm.addEventListener('submit', function (event) {

        //Prevent Website Refreshing when Submit is pressed//
        event.preventDefault();

        // Validate the form
        var validationMessages = validateForm();

        //Check that there are no input errors//
        if (validationMessages.length === 0) {
            //Print success message//
            showMessage('Successfully Submitted. You will receive a Confirmation Email soon.', 'success');
            
        } else {
            //If have error, print error message//
            showError(validationMessages.join("<br>"));
        }
    });

    //Function to validate email & phone no//
    function validateForm() {
        //Retrieve email & phone number inputs//
        var contactNumber = document.getElementById("contact-number").value;
        var email = document.getElementById("email").value;

        //Store error messages in array//
        var errorMessages = [];

        /*Check if contact number have 8 digits, start with 6,8 or 9*/
        var contactRegex = /^[689]\d{7}$/;
        if (!contactRegex.test(contactNumber)) {
            errorMessages.push("Invalid Contact Number. Please Try Again.");
        }

        /*Check if email has @ and .com (or similar)*/
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) {
            errorMessages.push("Invalid Email Format. Please Try Again.");
        }

        //Hide error messages when there are no input errors//
        errorMessage.innerHTML = "";
        errorMessage.style.display = 'none'; 

        //Return Error Messages//
        return errorMessages;
    }

    //Function to display error message//
    function showError(message) {
        errorMessage.innerHTML = message;
        errorMessage.style.display = 'block';

        //Error message will disappear after 2s//
        setTimeout(function () {
            errorMessage.style.display = 'none';
        }, 2000);
    }

    //Function to display success message//
    function showMessage(message, messageType) {
        var messageBoxes = document.getElementsByClassName('confirmation-message-box');
        var messageBox = messageBoxes[0];
        messageBox.textContent = message;
        messageBox.className = 'confirmation-message-box ' + messageType;
        messageBox.style.display = 'block';

        //Success message will disappear after 2s//
        setTimeout(function () {
            messageBox.style.display = 'none';
        }, 2000);
    }
});