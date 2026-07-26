/*==================================================
                TBfotography
                  home.js
        Hero Slider + Loader + Mobile Menu
====================================================*/

"use strict";

/*==============================
        LOADER
===============================*/

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.classList.add("hide");

        setTimeout(() => {

            loader.style.display = "none";

        }, 600);

    }, 2000);

});

/*==============================
        MOBILE MENU
===============================*/

const menuBtn = document.querySelector(".menu-btn");

const navMenu = document.querySelector(".nav-menu");

if(menuBtn && navMenu){

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        menuBtn.innerHTML = navMenu.classList.contains("active")

        ? '<i class="fa-solid fa-xmark"></i>'

        : '<i class="fa-solid fa-bars"></i>';

    });

}

/*==============================
        HERO SLIDER
===============================*/

const slides = document.querySelectorAll(".hero-slide");

const dotsContainer = document.querySelector(".hero-dots");

const prevBtn = document.querySelector(".hero-prev");

const nextBtn = document.querySelector(".hero-next");

let currentSlide = 0;

let autoSlide;

/*==============================
        CREATE DOTS
===============================*/

slides.forEach((slide,index)=>{

    const dot = document.createElement("span");

    dot.classList.add("hero-dot");

    if(index===0){

        dot.classList.add("active");

    }

    dot.dataset.index=index;

    dotsContainer.appendChild(dot);

});

const dots = document.querySelectorAll(".hero-dot");

/*==============================
        SHOW SLIDE
===============================*/

function showSlide(index){

    slides.forEach(slide=>{

        slide.classList.remove("active");

    });

    dots.forEach(dot=>{

        dot.classList.remove("active");

    });

    slides[index].classList.add("active");

    dots[index].classList.add("active");

    currentSlide=index;

}

/*==============================
        NEXT SLIDE
===============================*/

function nextSlide(){

    currentSlide++;

    if(currentSlide>=slides.length){

        currentSlide=0;

    }

    showSlide(currentSlide);

}

/*==============================
        PREVIOUS SLIDE
===============================*/

function previousSlide(){

    currentSlide--;

    if(currentSlide<0){

        currentSlide=slides.length-1;

    }

    showSlide(currentSlide);

}

/*==============================
        AUTO PLAY
===============================*/

function startSlider(){

    autoSlide=setInterval(nextSlide,5000);

}

function stopSlider(){

    clearInterval(autoSlide);

}

startSlider();

/*==============================
        BUTTON EVENTS
===============================*/

nextBtn?.addEventListener("click",()=>{

    stopSlider();

    nextSlide();

    startSlider();

});

prevBtn?.addEventListener("click",()=>{

    stopSlider();

    previousSlide();

    startSlider();

});

/*==============================
        DOT EVENTS
===============================*/

dots.forEach(dot=>{

    dot.addEventListener("click",()=>{

        stopSlider();

        showSlide(Number(dot.dataset.index));

        startSlider();

    });

});

/*==============================
        PAUSE ON HOVER
===============================*/

const hero=document.querySelector(".hero");

hero?.addEventListener("mouseenter",stopSlider);

hero?.addEventListener("mouseleave",startSlider);

/*==============================
        ACTIVE NAVIGATION
===============================*/

const links=document.querySelectorAll(".nav-menu a");

links.forEach(link=>{

    if(link.href===window.location.href){

        link.classList.add("active");

    }

});

/*==============================
        HEADER SCROLL
===============================*/

const header=document.querySelector(".header");

window.addEventListener("scroll",()=>{

    if(window.scrollY>60){

        header.style.background="rgba(11,11,11,.95)";

    }else{

        header.style.background="rgba(11,11,11,.75)";

    }

});

/*==================================================
                END OF home.js
====================================================*/