/*Sign Up Form Confirmation Message Box*/
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault();

    showMessage('Successfully Submitted. You will receive a Confirmation Email soon', 'success');
});

function showMessage(message, messageType) {
    var messageBoxes = document.getElementsByClassName('confirmation-message-box');
    var messageBox = messageBoxes[0]; 
    messageBox.textContent = message;
    messageBox.className = 'confirmation-message-box ' + messageType;
    messageBox.style.display = 'block';

    setTimeout(function () {
        messageBox.style.display = 'none';
    }, 5000);
}
});