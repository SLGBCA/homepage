// Set the date we're counting down to
const countDownDate = new Date("2024-10-01T23:59:59").getTime();

// Update the count down every 1 second
const x = setInterval(function() {
    // Get current date and time
    const now = new Date().getTime();
    
    // Calculate the distance between now and the count down date
    const distance = countDownDate - now;
    
    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Display the result in the elements
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
    
    // If the count down is over, display a message
    if (distance < 0) {
        clearInterval(x);
        document.querySelector(".countdown").innerHTML = "We're live!";
    }
}, 1000);
