// Getting HTML elements 

const textarea = document.getElementById('textarea'),
userList = document.getElementById('dropdown');

// Event Listeners

userList.addEventListener('change', displayReview);

// Functions

function displayReview() {
    let selectedOption = this.options[this.selectedIndex];
    let selectedReview = selectedOption.getAttribute("option-review");
    textarea.value = selectedReview; 
}