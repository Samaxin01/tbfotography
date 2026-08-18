/*==================================================
                TBfotography
                main.js
                PART 1
        Loader • Navigation • Scrolling
==================================================*/

"use strict";

/*==============================
        SELECTORS
===============================*/

const loader = document.getElementById("loader");

const header = document.getElementById("header");

const menuBtn = document.querySelector(".menu-btn");

const navLinks = document.querySelector(".nav-links");

const navItems = document.querySelectorAll(".nav-links a");

const smoothLinks = document.querySelectorAll('a[href^="#"]');

/*==============================
        LOADER
===============================*/

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.classList.add("hide");

    }, 1000);

});

/*==============================
        STICKY NAVIGATION
===============================*/

function stickyNavigation() {

    if (window.scrollY > 60) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", stickyNavigation);

stickyNavigation();

/*==============================
        MOBILE MENU
===============================*/

function toggleMenu() {

    navLinks.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if (navLinks.classList.contains("active")) {

        icon.classList.remove("fa-bars");

        icon.classList.add("fa-xmark");

        document.body.style.overflow = "hidden";

    } else {

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

        document.body.style.overflow = "";

    }

}

menuBtn?.addEventListener("click", toggleMenu);

/*==============================
    CLOSE MENU ON LINK CLICK
===============================*/

navItems.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

        document.body.style.overflow = "";

    });

});

/*==============================
    CLOSE MENU WHEN RESIZING
===============================*/

window.addEventListener("resize", () => {

    if (window.innerWidth > 900) {

        navLinks.classList.remove("active");

        document.body.style.overflow = "";

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    }

});

/*==============================
        SMOOTH SCROLL
===============================*/

smoothLinks.forEach(link => {

    link.addEventListener("click", e => {

        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    });

});

/*==============================
    CLOSE MENU ON OUTSIDE CLICK
===============================*/

document.addEventListener("click", e => {

    if (window.innerWidth > 900) return;

    if (
        !navLinks.contains(e.target) &&
        !menuBtn.contains(e.target)
    ) {

        navLinks.classList.remove("active");

        document.body.style.overflow = "";

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    }

});

/*==============================
        ESC KEY SUPPORT
===============================*/

document.addEventListener("keydown", e => {

    if (e.key !== "Escape") return;

    navLinks.classList.remove("active");

    document.body.style.overflow = "";

    const icon = menuBtn.querySelector("i");

    icon.classList.remove("fa-xmark");

    icon.classList.add("fa-bars");

});

/*==================================================
                END OF PART 1
====================================================*/

/*
Next:
✔ Hero Slideshow
✔ Reveal Animations
✔ Active Navigation Highlight
✔ Scroll Indicator Animation
*/
/*==================================================
                TBfotography
                main.js
                PART 2
 Hero Slideshow • Reveal Animation • Active Nav
==================================================*/

"use strict";

/*==============================
        HERO SLIDESHOW
===============================*/

const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

function showSlide(index){

    slides.forEach(slide =>{

        slide.classList.remove("active");

    });

    slides[index].classList.add("active");

}

function nextSlide(){

    currentSlide++;

    if(currentSlide >= slides.length){

        currentSlide = 0;

    }

    showSlide(currentSlide);

}

if(slides.length){

    showSlide(currentSlide);

    setInterval(nextSlide, 5000);

}

/*==============================
        REVEAL ON SCROLL
===============================*/

const revealElements = document.querySelectorAll(
    ".reveal, .feature-card, .package-card, .portfolio-card, .testimonial-card"
);

const revealObserver = new IntersectionObserver(

    (entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("active");
                entry.target.classList.add("show");

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {

        threshold:0.15

    }

);

revealElements.forEach(element=>{

    revealObserver.observe(element);

});

/*==============================
    ACTIVE NAVIGATION LINK
===============================*/

const sections = document.querySelectorAll("section[id]");

function activeNavigation(){

    const scrollY = window.pageYOffset;

    sections.forEach(section=>{

        const sectionTop = section.offsetTop - 120;

        const sectionHeight = section.offsetHeight;

        const sectionId = section.getAttribute("id");

        const navLink = document.querySelector(
            `.nav-links a[href="#${sectionId}"]`
        );

        if(!navLink) return;

        if(

            scrollY >= sectionTop &&
            scrollY < sectionTop + sectionHeight

        ){

            navItems.forEach(item=>{

                item.classList.remove("active");

            });

            navLink.classList.add("active");

        }

    });

}

window.addEventListener("scroll", activeNavigation);

activeNavigation();

/*==============================
    HERO PARALLAX EFFECT
===============================*/

const hero = document.querySelector(".hero");

window.addEventListener("scroll", ()=>{

    if(!hero) return;

    const offset = window.pageYOffset;

    hero.style.backgroundPositionY = `${offset * 0.4}px`;

});

/*==============================
    SCROLL INDICATOR
===============================*/

const scrollIndicator =
document.querySelector(".scroll-indicator");

window.addEventListener("scroll", ()=>{

    if(!scrollIndicator) return;

    if(window.scrollY > 120){

        scrollIndicator.style.opacity = "0";

        scrollIndicator.style.pointerEvents = "none";

    }else{

        scrollIndicator.style.opacity = "1";

        scrollIndicator.style.pointerEvents = "auto";

    }

});

/*==============================
    HERO BUTTON RIPPLE EFFECT
===============================*/

const buttons = document.querySelectorAll(".btn");

buttons.forEach(button=>{

    button.addEventListener("click",function(e){

        const ripple = document.createElement("span");

        ripple.classList.add("ripple");

        const rect = this.getBoundingClientRect();

        ripple.style.left =
        `${e.clientX - rect.left}px`;

        ripple.style.top =
        `${e.clientY - rect.top}px`;

        this.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },600);

    });

});

/*==============================
    IMAGE PRELOAD
===============================*/

slides.forEach(slide=>{

    const bg = getComputedStyle(slide)
        .backgroundImage;

    const url = bg
        .replace(/^url\(["']?/,"")
        .replace(/["']?\)$/,"");

    if(url){

        const image = new Image();

        image.src = url;

    }

});

/*==================================================
                END OF PART 2
====================================================*/

/*
Next:

✔ Package Category Tabs

✔ Portfolio Category Filter

✔ Lazy Image Loading

✔ Animated Counters
*//*==================================================
                TBfotography
                main.js
                PART 2
 Hero Slideshow • Reveal Animation • Active Nav
==================================================*/

"use strict";

/*==============================
        HERO SLIDESHOW
===============================*/

const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

function showSlide(index){

    slides.forEach(slide =>{

        slide.classList.remove("active");

    });

    slides[index].classList.add("active");

}

function nextSlide(){

    currentSlide++;

    if(currentSlide >= slides.length){

        currentSlide = 0;

    }

    showSlide(currentSlide);

}

if(slides.length){

    showSlide(currentSlide);

    setInterval(nextSlide, 5000);

}

/*==============================
        REVEAL ON SCROLL
===============================*/

const revealElements = document.querySelectorAll(
    ".reveal, .feature-card, .package-card, .portfolio-card, .testimonial-card"
);

const revealObserver = new IntersectionObserver(

    (entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("active");
                entry.target.classList.add("show");

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {

        threshold:0.15

    }

);

revealElements.forEach(element=>{

    revealObserver.observe(element);

});

/*==============================
    ACTIVE NAVIGATION LINK
===============================*/

const sections = document.querySelectorAll("section[id]");

function activeNavigation(){

    const scrollY = window.pageYOffset;

    sections.forEach(section=>{

        const sectionTop = section.offsetTop - 120;

        const sectionHeight = section.offsetHeight;

        const sectionId = section.getAttribute("id");

        const navLink = document.querySelector(
            `.nav-links a[href="#${sectionId}"]`
        );

        if(!navLink) return;

        if(

            scrollY >= sectionTop &&
            scrollY < sectionTop + sectionHeight

        ){

            navItems.forEach(item=>{

                item.classList.remove("active");

            });

            navLink.classList.add("active");

        }

    });

}

window.addEventListener("scroll", activeNavigation);

activeNavigation();

/*==============================
    HERO PARALLAX EFFECT
===============================*/

const hero = document.querySelector(".hero");

window.addEventListener("scroll", ()=>{

    if(!hero) return;

    const offset = window.pageYOffset;

    hero.style.backgroundPositionY = `${offset * 0.4}px`;

});

/*==============================
    SCROLL INDICATOR
===============================*/

const scrollIndicator =
document.querySelector(".scroll-indicator");

window.addEventListener("scroll", ()=>{

    if(!scrollIndicator) return;

    if(window.scrollY > 120){

        scrollIndicator.style.opacity = "0";

        scrollIndicator.style.pointerEvents = "none";

    }else{

        scrollIndicator.style.opacity = "1";

        scrollIndicator.style.pointerEvents = "auto";

    }

});

/*==============================
    HERO BUTTON RIPPLE EFFECT
===============================*/

const buttons = document.querySelectorAll(".btn");

buttons.forEach(button=>{

    button.addEventListener("click",function(e){

        const ripple = document.createElement("span");

        ripple.classList.add("ripple");

        const rect = this.getBoundingClientRect();

        ripple.style.left =
        `${e.clientX - rect.left}px`;

        ripple.style.top =
        `${e.clientY - rect.top}px`;

        this.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },600);

    });

});

/*==============================
    IMAGE PRELOAD
===============================*/

slides.forEach(slide=>{

    const bg = getComputedStyle(slide)
        .backgroundImage;

    const url = bg
        .replace(/^url\(["']?/,"")
        .replace(/["']?\)$/,"");

    if(url){

        const image = new Image();

        image.src = url;

    }

});

/*==================================================
                END OF PART 2
====================================================*/

/*
Next:

✔ Package Category Tabs

✔ Portfolio Category Filter

✔ Lazy Image Loading

✔ Animated Counters
*/
/*==================================================
                TBfotography
                main.js
                PART 3
 Package Tabs • Portfolio Filter • Lazy Loading
==================================================*/

"use strict";

/*==============================
        PACKAGE TABS
===============================*/

const packageTabs = document.querySelectorAll(".package-tab");

const packageCategories = document.querySelectorAll(".package-category");

function showPackageCategory(category){

    packageCategories.forEach(section=>{

        if(
            section.dataset.category === category ||
            category === "all"
        ){

            section.style.display = "grid";

            requestAnimationFrame(()=>{

                section.classList.add("show");

            });

        }else{

            section.classList.remove("show");

            section.style.display = "none";

        }

    });

}

packageTabs.forEach(tab=>{

    tab.addEventListener("click",()=>{

        packageTabs.forEach(btn=>{

            btn.classList.remove("active");

        });

        tab.classList.add("active");

        const category = tab.dataset.category;

        showPackageCategory(category);

    });

});

/*==============================
    INITIAL PACKAGE CATEGORY
===============================*/

if(packageTabs.length){

    const firstCategory =
        packageTabs[0].dataset.category;

    packageTabs[0].classList.add("active");

    showPackageCategory(firstCategory);

}

/*==============================
        PORTFOLIO FILTER
===============================*/

const filterButtons =
document.querySelectorAll(".filter-btn");

const portfolioCards =
document.querySelectorAll(".portfolio-card");

filterButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        filterButtons.forEach(btn=>{

            btn.classList.remove("active");

        });

        button.classList.add("active");

        const filter =
        button.dataset.filter;

        portfolioCards.forEach(card=>{

            if(

                filter === "all" ||

                card.dataset.category === filter

            ){

                card.style.display = "block";

                requestAnimationFrame(()=>{

                    card.classList.add("show");

                });

            }else{

                card.classList.remove("show");

                card.style.display = "none";

            }

        });

    });

});

/*==============================
    INITIAL PORTFOLIO FILTER
===============================*/

if(filterButtons.length){

    filterButtons[0].click();

}

/*==============================
        LAZY IMAGE LOADING
===============================*/

const lazyImages =
document.querySelectorAll("img[data-src]");

const imageObserver = new IntersectionObserver(

(entries,observer)=>{

    entries.forEach(entry=>{

        if(!entry.isIntersecting) return;

        const image = entry.target;

        image.classList.add("loading");

        image.src = image.dataset.src;

        image.onload = ()=>{

            image.classList.remove("loading");

            image.classList.add("loaded");

        };

        observer.unobserve(image);

    });

},

{

    rootMargin:"150px"

}

);

lazyImages.forEach(image=>{

    imageObserver.observe(image);

});

/*==============================
        IMAGE FADE-IN
===============================*/

document.querySelectorAll("img").forEach(image=>{

    if(image.complete){

        image.classList.add("loaded");

    }else{

        image.addEventListener("load",()=>{

            image.classList.add("loaded");

        });

    }

});

/*==============================
        STAGGER CARDS
===============================*/

const staggerGroups = [

    ".feature-card",

    ".package-card",

    ".portfolio-card",

    ".testimonial-card"

];

staggerGroups.forEach(selector=>{

    const cards =
    document.querySelectorAll(selector);

    cards.forEach((card,index)=>{

        card.style.transitionDelay =
        `${index * 100}ms`;

    });

});

/*==============================
        SMOOTH HOVER
===============================*/

portfolioCards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.zIndex = "2";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.zIndex = "1";

    });

});

/*==================================================
                END OF PART 3
====================================================*/

/*
Next:

✔ Portfolio Lightbox

✔ Previous / Next Image

✔ Swipe Support

✔ Keyboard Navigation

✔ Close Button
*/
/*==================================================
                TBfotography
                main.js
                PART 4
     Portfolio Lightbox + Keyboard + Touch
==================================================*/

"use strict";

/*==============================
        SELECTORS
===============================*/

const lightbox = document.querySelector(".lightbox");

const lightboxImage = document.querySelector(".lightbox img");

const closeLightboxBtn =
document.querySelector(".lightbox-close");

const previousButton =
document.querySelector(".lightbox-prev");

const nextButton =
document.querySelector(".lightbox-next");

const galleryItems =
[...document.querySelectorAll(".portfolio-card")];

let currentImageIndex = 0;

/*==============================
        IMAGE LIST
===============================*/

const galleryImages = galleryItems.map(card => {

    const image = card.querySelector("img");

    return {

        src: image.dataset.src || image.src,

        alt: image.alt || "Portfolio Image"

    };

});

/*==============================
    UPDATE LIGHTBOX IMAGE
===============================*/

function updateLightbox(index){

    if(!galleryImages.length) return;

    currentImageIndex = index;

    lightboxImage.classList.remove("loaded");

    lightboxImage.src = galleryImages[index].src;

    lightboxImage.alt = galleryImages[index].alt;

    lightboxImage.onload = ()=>{

        lightboxImage.classList.add("loaded");

    };

}

/*==============================
        OPEN LIGHTBOX
===============================*/

function openLightbox(index){

    updateLightbox(index);

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

}

/*==============================
        CLOSE LIGHTBOX
===============================*/

function closeLightbox(){

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}

/*==============================
        OPEN IMAGE
===============================*/

galleryItems.forEach((card,index)=>{

    card.addEventListener("click",()=>{

        openLightbox(index);

    });

});

/*==============================
        NEXT IMAGE
===============================*/

function nextImage(){

    currentImageIndex++;

    if(currentImageIndex >= galleryImages.length){

        currentImageIndex = 0;

    }

    updateLightbox(currentImageIndex);

}

/*==============================
    PREVIOUS IMAGE
===============================*/

function previousImage(){

    currentImageIndex--;

    if(currentImageIndex < 0){

        currentImageIndex = galleryImages.length - 1;

    }

    updateLightbox(currentImageIndex);

}

/*==============================
        BUTTON EVENTS
===============================*/

nextButton?.addEventListener(

    "click",

    nextImage

);

previousButton?.addEventListener(

    "click",

    previousImage

);

closeLightboxBtn?.addEventListener(

    "click",

    closeLightbox

);

/*==============================
    CLICK OUTSIDE TO CLOSE
===============================*/

lightbox?.addEventListener("click",(event)=>{

    if(event.target === lightbox){

        closeLightbox();

    }

});

/*==============================
    KEYBOARD CONTROLS
===============================*/

document.addEventListener("keydown",(event)=>{

    if(!lightbox?.classList.contains("active")) return;

    switch(event.key){

        case "ArrowRight":

            nextImage();

            break;

        case "ArrowLeft":

            previousImage();

            break;

        case "Escape":

            closeLightbox();

            break;

    }

});

/*==============================
        TOUCH SUPPORT
===============================*/

let touchStartX = 0;

let touchEndX = 0;

lightbox?.addEventListener(

    "touchstart",

    event=>{

        touchStartX =
        event.changedTouches[0].screenX;

    },

    {passive:true}

);

lightbox?.addEventListener(

    "touchend",

    event=>{

        touchEndX =
        event.changedTouches[0].screenX;

        handleSwipe();

    },

    {passive:true}

);

function handleSwipe(){

    const distance =
    touchStartX - touchEndX;

    if(Math.abs(distance) < 50) return;

    if(distance > 0){

        nextImage();

    }else{

        previousImage();

    }

}

/*==============================
    PRELOAD NEIGHBOR IMAGES
===============================*/

function preloadNearby(){

    const next =
    (currentImageIndex + 1) %
    galleryImages.length;

    const previous =
    (currentImageIndex - 1 + galleryImages.length) %
    galleryImages.length;

    [next, previous].forEach(index=>{

        const img = new Image();

        img.src = galleryImages[index].src;

    });

}

lightboxImage?.addEventListener(

    "load",

    preloadNearby

);

/*==============================
    IMAGE FADE EFFECT
===============================*/

lightboxImage?.addEventListener(

    "load",

    ()=>{

        lightboxImage.animate(

            [

                {

                    opacity:0,

                    transform:"scale(.96)"

                },

                {

                    opacity:1,

                    transform:"scale(1)"

                }

            ],

            {

                duration:300,

                easing:"ease-out"

            }

        );

    }

);

/*==================================================
                END OF PART 4
====================================================*/

/*
Next:

✔ Back To Top Button

✔ WhatsApp Booking Generator

✔ Performance Optimizations

✔ App Initialization

✔ Final Cleanup
*//*==================================================
                TBfotography
                main.js
                PART 4
     Portfolio Lightbox + Keyboard + Touch
==================================================*/

"use strict";

/*==============================
        SELECTORS
===============================*/

const lightbox = document.querySelector(".lightbox");

const lightboxImage = document.querySelector(".lightbox img");

const closeLightboxBtn =
document.querySelector(".lightbox-close");

const previousButton =
document.querySelector(".lightbox-prev");

const nextButton =
document.querySelector(".lightbox-next");

const galleryItems =
[...document.querySelectorAll(".portfolio-card")];

let currentImageIndex = 0;

/*==============================
        IMAGE LIST
===============================*/

const galleryImages = galleryItems.map(card => {

    const image = card.querySelector("img");

    return {

        src: image.dataset.src || image.src,

        alt: image.alt || "Portfolio Image"

    };

});

/*==============================
    UPDATE LIGHTBOX IMAGE
===============================*/

function updateLightbox(index){

    if(!galleryImages.length) return;

    currentImageIndex = index;

    lightboxImage.classList.remove("loaded");

    lightboxImage.src = galleryImages[index].src;

    lightboxImage.alt = galleryImages[index].alt;

    lightboxImage.onload = ()=>{

        lightboxImage.classList.add("loaded");

    };

}

/*==============================
        OPEN LIGHTBOX
===============================*/

function openLightbox(index){

    updateLightbox(index);

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

}

/*==============================
        CLOSE LIGHTBOX
===============================*/

function closeLightbox(){

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}

/*==============================
        OPEN IMAGE
===============================*/

galleryItems.forEach((card,index)=>{

    card.addEventListener("click",()=>{

        openLightbox(index);

    });

});

/*==============================
        NEXT IMAGE
===============================*/

function nextImage(){

    currentImageIndex++;

    if(currentImageIndex >= galleryImages.length){

        currentImageIndex = 0;

    }

    updateLightbox(currentImageIndex);

}

/*==============================
    PREVIOUS IMAGE
===============================*/

function previousImage(){

    currentImageIndex--;

    if(currentImageIndex < 0){

        currentImageIndex = galleryImages.length - 1;

    }

    updateLightbox(currentImageIndex);

}

/*==============================
        BUTTON EVENTS
===============================*/

nextButton?.addEventListener(

    "click",

    nextImage

);

previousButton?.addEventListener(

    "click",

    previousImage

);

closeLightboxBtn?.addEventListener(

    "click",

    closeLightbox

);

/*==============================
    CLICK OUTSIDE TO CLOSE
===============================*/

lightbox?.addEventListener("click",(event)=>{

    if(event.target === lightbox){

        closeLightbox();

    }

});

/*==============================
    KEYBOARD CONTROLS
===============================*/

document.addEventListener("keydown",(event)=>{

    if(!lightbox?.classList.contains("active")) return;

    switch(event.key){

        case "ArrowRight":

            nextImage();

            break;

        case "ArrowLeft":

            previousImage();

            break;

        case "Escape":

            closeLightbox();

            break;

    }

});

/*==============================
        TOUCH SUPPORT
===============================*/

let touchStartX = 0;

let touchEndX = 0;

lightbox?.addEventListener(

    "touchstart",

    event=>{

        touchStartX =
        event.changedTouches[0].screenX;

    },

    {passive:true}

);

lightbox?.addEventListener(

    "touchend",

    event=>{

        touchEndX =
        event.changedTouches[0].screenX;

        handleSwipe();

    },

    {passive:true}

);

function handleSwipe(){

    const distance =
    touchStartX - touchEndX;

    if(Math.abs(distance) < 50) return;

    if(distance > 0){

        nextImage();

    }else{

        previousImage();

    }

}

/*==============================
    PRELOAD NEIGHBOR IMAGES
===============================*/

function preloadNearby(){

    const next =
    (currentImageIndex + 1) %
    galleryImages.length;

    const previous =
    (currentImageIndex - 1 + galleryImages.length) %
    galleryImages.length;

    [next, previous].forEach(index=>{

        const img = new Image();

        img.src = galleryImages[index].src;

    });

}

lightboxImage?.addEventListener(

    "load",

    preloadNearby

);

/*==============================
    IMAGE FADE EFFECT
===============================*/

lightboxImage?.addEventListener(

    "load",

    ()=>{

        lightboxImage.animate(

            [

                {

                    opacity:0,

                    transform:"scale(.96)"

                },

                {

                    opacity:1,

                    transform:"scale(1)"

                }

            ],

            {

                duration:300,

                easing:"ease-out"

            }

        );

    }

);

/*==================================================
                END OF PART 4
====================================================*/

/*
Next:

✔ Back To Top Button

✔ WhatsApp Booking Generator

✔ Performance Optimizations

✔ App Initialization

✔ Final Cleanup
*/
/*==================================================
                TBfotography
                main.js
                PART 5
 WhatsApp Booking • Back To Top • Final Init
==================================================*/

"use strict";

/*==============================
        BACK TO TOP
===============================*/

const backToTop =
document.querySelector(".back-to-top");

function toggleBackToTop(){

    if(!backToTop) return;

    if(window.scrollY > 500){

        backToTop.classList.add("show");

    }else{

        backToTop.classList.remove("show");

    }

}

window.addEventListener(

    "scroll",

    toggleBackToTop

);

backToTop?.addEventListener(

    "click",

    e=>{

        e.preventDefault();

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    }

);

/*==============================
    WHATSAPP BOOKING SYSTEM
===============================*/

/*
Example HTML

<button
class="book-btn"

data-category="Kids"

data-package="Gold"

data-price="₦45,000"

data-age="3 Months - 5 Years">

Book Now

</button>

*/

const whatsappNumber =
"2348012345678"; // Change to your WhatsApp number

const bookingButtons =
document.querySelectorAll(".book-btn");

bookingButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        const category =
        button.dataset.category;

        const packageName =
        button.dataset.package;

        const price =
        button.dataset.price;

        const age =
        button.dataset.age;

        const message =

`Hi TBfotography! 👋

I would like to book a photography session.

Category:
${category}

Package:
${packageName}

Age:
${age}

Price:
${price}

Please let me know your available dates.

Thank you.`;

        const url =

`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        window.open(

            url,

            "_blank"

        );

    });

});

/*==============================
    FLOATING WHATSAPP BUTTON
===============================*/

const floatingWhatsapp =

document.querySelector(

".whatsapp-float"

);

floatingWhatsapp?.addEventListener(

    "click",

    e=>{

        e.preventDefault();

        window.open(

`https://wa.me/${whatsappNumber}`,

"_blank"

        );

    }

);

/*==============================
        IMAGE OPTIMIZATION
===============================*/

document.querySelectorAll("img").forEach(image=>{

    image.loading = "lazy";

    image.decoding = "async";

});

/*==============================
    PAGE VISIBILITY API
===============================*/

document.addEventListener(

"visibilitychange",

()=>{

    if(document.hidden){

        console.log(

"TBfotography paused"

);

    }else{

        console.log(

"TBfotography resumed"

);

    }

}

);

/*==============================
    REMOVE LOADER SAFELY
===============================*/

window.addEventListener(

"load",

()=>{

    const loader =

document.getElementById("loader");

    if(loader){

        setTimeout(()=>{

            loader.classList.add("hide");

        },1200);

    }

});

/*==============================
        APP STARTUP
===============================*/

function initializeApp(){

    console.log(

"%cTBfotography Ready",

"color:#D4AF37;font-size:16px;font-weight:bold"

    );

    toggleBackToTop();

    activeNavigation?.();

}

document.addEventListener(

"DOMContentLoaded",

initializeApp

);

/*==============================
        ERROR HANDLER
===============================*/

window.addEventListener(

"error",

(event)=>{

    console.error(

"Application Error:",

event.message

    );

});

/*==============================
    UNHANDLED PROMISES
===============================*/

window.addEventListener(

"unhandledrejection",

event=>{

    console.error(

"Promise Error:",

event.reason

    );

});

/*==================================================
                END OF PART 5
====================================================*/

/*

        TBfotography

        main.js COMPLETE

✔ Loading Screen

✔ Sticky Navigation

✔ Mobile Menu

✔ Hero Slideshow

✔ Scroll Reveal Animation

✔ Active Navigation

✔ Package Tabs

✔ Portfolio Filter

✔ Lazy Loading

✔ Portfolio Lightbox

✔ Swipe Support

✔ Keyboard Controls

✔ Back To Top

✔ WhatsApp Booking

✔ Floating WhatsApp

✔ Performance Optimizations

✔ Error Handling

✔ Responsive Interactions

*/