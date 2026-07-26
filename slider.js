/* ===========================
   TBfotography Hero Slider
=========================== */

const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

const slideDuration = 5000; // 5 seconds


// Show Slide
function showSlide(index){

    // Remove active class from all slides
    slides.forEach(slide=>{

        slide.classList.remove("active");

    });

    // Add active class to current slide
    slides[index].classList.add("active");

}


// Next Slide
function nextSlide(){

    currentSlide++;

    if(currentSlide >= slides.length){

        currentSlide = 0;

    }

    showSlide(currentSlide);

}


// First Slide
showSlide(currentSlide);


// Auto Play
setInterval(nextSlide, slideDuration);