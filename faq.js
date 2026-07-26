/* ===========================
   TBfotography FAQ
=========================== */

// ===========================
// Accordion
// ===========================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    const icon = question.querySelector("span");

    question.addEventListener("click", () => {

        const isOpen = answer.style.maxHeight;

        // Close all FAQs
        faqItems.forEach(faq => {

            faq.querySelector(".faq-answer").style.maxHeight = null;

            faq.querySelector(".faq-question span").textContent = "+";

        });

        // Open selected FAQ
        if(!isOpen){

            answer.style.maxHeight = answer.scrollHeight + "px";

            icon.textContent = "−";

        }

    });

});


// ===========================
// Live Search
// ===========================

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", () => {

    const search = searchInput.value.toLowerCase();

    faqItems.forEach(item => {

        const question = item.querySelector(".faq-question").innerText.toLowerCase();

        const answer = item.querySelector(".faq-answer").innerText.toLowerCase();

        if(question.includes(search) || answer.includes(search)){

            item.style.display = "block";

        }

        else{

            item.style.display = "none";

        }

    });

});


// ===========================
// Fade In Animation
// ===========================

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.style.opacity = "1";

            entry.target.style.transform = "translateY(0)";

        }

    });

},{
    threshold:0.2
});

faqItems.forEach(item => {

    item.style.opacity = "0";

    item.style.transform = "translateY(30px)";

    item.style.transition = "0.6s ease";

    observer.observe(item);

});