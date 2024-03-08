// Getting HTML elements 

const textarea = document.getElementById('textarea'),
userList = document.getElementById('dropdown');
let reviewList;

//IFFE

(async () => {
    try {
        let res = await fetch("/reviews/api/getReviews");
        reviewList = await res.json();
    } catch(err) {
        console.log('error', err);
    }
})();

// Event Listeners

userList.addEventListener('change', displayReview);

// Functions

function displayReview() {
    let selectedOption = this.options[this.selectedIndex];
    let selectedRevieweeId = selectedOption.value;
    let selectedReview = "";
    for(review of reviewList) {
        if(review.reviewee == selectedRevieweeId) {
            selectedReview = review.review;
            break;
        }
    }
    textarea.value = selectedReview; 
}