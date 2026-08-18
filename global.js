/*==================================================
                TBfotography
                  global.js
        Global Functions For Every Page
==================================================*/

"use strict";

/*==============================
            LOADER
===============================*/

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if(loader){

        setTimeout(() => {

            loader.classList.add("hide");

            setTimeout(() => {

                loader.remove();

            },600);

        },2000);

    }

});

/*==============================
        MOBILE NAVIGATION
===============================*/

const menuBtn =
document.querySelector(".menu-btn");

const navMenu =
document.querySelector(".nav-menu");

if(menuBtn && navMenu){

    menuBtn.addEventListener("click",()=>{

        navMenu.classList.toggle("active");

        menuBtn.innerHTML =

        navMenu.classList.contains("active")

        ? '<i class="fa-solid fa-xmark"></i>'

        : '<i class="fa-solid fa-bars"></i>';

    });

}

/*==============================
        CLOSE MENU
===============================*/

document
.querySelectorAll(".nav-menu a")
.forEach(link=>{

    link.addEventListener("click",()=>{

        navMenu?.classList.remove("active");

        if(menuBtn){

            menuBtn.innerHTML =

            '<i class="fa-solid fa-bars"></i>';

        }

    });

});

/*==============================
        ACTIVE PAGE
===============================*/

const currentPage =

window.location.pathname

.split("/")

.pop();

document

.querySelectorAll(".nav-menu a")

.forEach(link=>{

    const page =

    link.getAttribute("href");

    if(page===currentPage ||

      (currentPage==="" && page==="index.html")){

        link.classList.add("active");

    }

});

/*==============================
        STICKY HEADER
===============================*/

const header =

document.querySelector(".header");

window.addEventListener(

"scroll",

()=>{

    if(!header) return;

    if(window.scrollY>50){

        header.classList.add("scrolled");

    }else{

        header.classList.remove("scrolled");

    }

});

/*==============================
        SCROLL ANIMATION
===============================*/

const reveals =

document.querySelectorAll(

".reveal"

);

if(reveals.length){

    const observer =

    new IntersectionObserver(

    entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add(

                "active"

                );

            }

        });

    },

    {

        threshold:.15

    }

    );

    reveals.forEach(item=>{

        observer.observe(item);

    });

}

/*==============================
        BACK TO TOP
===============================*/

const backTop =

document.querySelector(

".back-to-top"

);

if(backTop){

    window.addEventListener(

    "scroll",

    ()=>{

        if(window.scrollY>500){

            backTop.classList.add("show");

        }else{

            backTop.classList.remove("show");

        }

    });

    backTop.addEventListener(

    "click",

    ()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/*==============================
    FLOATING WHATSAPP
===============================*/

const whatsapp =

document.querySelector(

".whatsapp-float"

);

if(whatsapp){

    whatsapp.addEventListener(

    "click",

    ()=>{

        window.open(

        "https://wa.me/2348012345678",

        "_blank"

        );

    });

}

/*==============================
        COPYRIGHT YEAR
===============================*/

const year =

document.getElementById(

"year"

);

if(year){

    year.textContent =

    new Date().getFullYear();

}

/*==================================================
            END OF GLOBAL.JS
==================================================*/