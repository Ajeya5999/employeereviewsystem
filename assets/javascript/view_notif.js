// Getting elements and declearing variables

const messageContainerList = document.getElementsByClassName("message-container");

// Functions

function viewNotif() { //To change the notification box's visiblity
    for(message of messageContainerList) {
        if(message.style.opacity == 0) message.style.opacity = 1;
        else message.style.opacity = 0; 
    }
}

// running the functions

setTimeout(viewNotif, 500); //showing the notification function
setTimeout(viewNotif, 4500); //unshowing the notification function