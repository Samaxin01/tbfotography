/*==================================================
                TBfotography
                portfolio.js
    Filter • Lightbox • Keyboard • Touch • Reveal
==================================================*/

"use strict";

/*==================================
        PORTFOLIO FILTER
===================================*/

const filterButtons =
document.querySelectorAll(".filter-btn");

const galleryItems =
document.querySelectorAll(".gallery-item");

filterButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        filterButtons.forEach(btn=>{

            btn.classList.remove("active");

        });

        button.classList.add("active");

        const filter =
        button.dataset.filter;

        galleryItems.forEach(item=>{

            const category =
            item.dataset.category;

            if(

                filter==="all" ||

                filter===category

            ){

                item.style.display="block";

                setTimeout(()=>{

                    item.style.opacity="1";

                    item.style.transform="scale(1)";

                },100);

            }

            else{

                item.style.opacity="0";

                item.style.transform="scale(.9)";

                setTimeout(()=>{

                    item.style.display="none";

                },300);

            }

        });

    });

});

/*==================================
        LIGHTBOX
===================================*/

const lightbox =
document.querySelector(".lightbox");

const lightboxImage =
document.querySelector(".lightbox-image");

const closeBtn =
document.querySelector(".lightbox-close");

const prevBtn =
document.querySelector(".lightbox-prev");

const nextBtn =
document.querySelector(".lightbox-next");

const images =
Array.from(document.querySelectorAll(".gallery-item img"));

let currentIndex = 0;

function openLightbox(index){

    currentIndex = index;

    lightboxImage.src = images[index].src;

    lightboxImage.alt = images[index].alt;

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

}

function closeLightbox(){

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}

function nextImage(){

    currentIndex++;

    if(currentIndex >= images.length){

        currentIndex = 0;

    }

    lightboxImage.src = images[currentIndex].src;

    lightboxImage.alt = images[currentIndex].alt;

}

function previousImage(){

    currentIndex--;

    if(currentIndex < 0){

        currentIndex = images.length - 1;

    }

    lightboxImage.src = images[currentIndex].src;

    lightboxImage.alt = images[currentIndex].alt;

}

images.forEach((image,index)=>{

    image.addEventListener("click",()=>{

        openLightbox(index);

    });

});

closeBtn?.addEventListener(

"click",

closeLightbox

);

nextBtn?.addEventListener(

"click",

nextImage

);

prevBtn?.addEventListener(

"click",

previousImage

);

/*==================================
      CLOSE OUTSIDE IMAGE
===================================*/

lightbox?.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        closeLightbox();

    }

});

/*==================================
      KEYBOARD SUPPORT
===================================*/

document.addEventListener(

"keydown",

(e)=>{

    if(!lightbox.classList.contains("active")){

        return;

    }

    if(e.key==="Escape"){

        closeLightbox();

    }

    if(e.key==="ArrowRight"){

        nextImage();

    }

    if(e.key==="ArrowLeft"){

        previousImage();

    }

});

/*==================================
      TOUCH SWIPE
===================================*/

let touchStartX = 0;

let touchEndX = 0;

lightbox?.addEventListener(

"touchstart",

(e)=>{

    touchStartX =

    e.changedTouches[0].screenX;

}

);

lightbox?.addEventListener(

"touchend",

(e)=>{

    touchEndX =

    e.changedTouches[0].screenX;

    if(

        touchStartX -

        touchEndX >

        50

    ){

        nextImage();

    }

    else if(

        touchEndX -

        touchStartX >

        50

    ){

        previousImage();

    }

}

);

/*==================================
      IMAGE PRELOADING
===================================*/

images.forEach(image=>{

    const preload = new Image();

    preload.src = image.src;

});

/*==================================
      SCROLL REVEAL
===================================*/

const reveals =
document.querySelectorAll(".reveal");

const observer =
new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add(

            "active"

            );

        }

    });

},

{

    threshold:0.15

}

);

reveals.forEach(item=>{

    observer.observe(item);

});

/*==================================
      IMAGE HOVER TILT
===================================*/

galleryItems.forEach(card=>{

    card.addEventListener(

    "mousemove",

    (e)=>{

        const rect =

        card.getBoundingClientRect();

        const x =

        e.clientX - rect.left;

        const y =

        e.clientY - rect.top;

        const rotateY =

        ((x / rect.width)-0.5)*8;

        const rotateX =

        ((y / rect.height)-0.5)*-8;

        card.style.transform =

        `perspective(1000px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         scale(1.03)`;

    }

    );

    card.addEventListener(

    "mouseleave",

    ()=>{

        card.style.transform="";

    }

    );

});

/*==================================================
                END OF FILE
==================================================*/