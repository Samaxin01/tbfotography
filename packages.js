/* ===========================
   TBfotography Packages
=========================== */

const categories = document.querySelectorAll(".package-category");

categories.forEach(category => {

    const header = category.querySelector(".category-header");
    const content = category.querySelector(".category-content");
    const icon = header.querySelector("span");

    header.addEventListener("click", () => {

        const isOpen = content.classList.contains("show");

        // Close every category
        document.querySelectorAll(".category-content").forEach(item => {
            item.classList.remove("show");
            item.style.maxHeight = null;
        });

        document.querySelectorAll(".category-header span").forEach(sign => {
            sign.textContent = "+";
        });

        // Open clicked category
        if (!isOpen) {

            content.classList.add("show");
            content.style.maxHeight = content.scrollHeight + "px";

            icon.textContent = "−";

            // Smooth scroll to opened section
            setTimeout(() => {
                category.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }, 200);

        }

    });

});


/* ===========================
   PACKAGE CARD ANIMATION
=========================== */

const cards = document.querySelectorAll(".package-card");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("animate");

        }

    });

},{
    threshold:0.2
});

cards.forEach(card=>{
    observer.observe(card);
});