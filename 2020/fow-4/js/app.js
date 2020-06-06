function changeTitle() {
    const message = "Weź udział w Future of Work!";
    let original;

    window.addEventListener("focus", function() {
        if (original) {
            document.title = original;
        }
    })

    window.addEventListener("blur", function() {
        const title = document.title;
        if (title != message) {
            original = title;
        }
        document.title = message;
    })
}

function showHamburgerMenu() {
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector(".navigation");
    const navigationLinks = document.querySelectorAll(".navigation__link");

    const handleClick = function() {
        hamburger.classList.toggle("hamburger--active");
        hamburger.setAttribute("aria-expanded", hamburger.classList.contains("hamburger--active"));
        nav.classList.toggle("navigation--active");
    }

    for (let i = 0; i < navigationLinks.length; i++) {
        navigationLinks[i].addEventListener("click", function() {
            hamburger.classList.remove("hamburger--active");
            nav.classList.remove("navigation--active");
        })
    }

    hamburger.addEventListener("click", handleClick);
}

function countingDownDays() {
    const daysCounter = document.querySelector(".days-counter");
    const countDownDate = new Date("May 21, 2020 00:00:00").getTime();

    const setinterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));

        daysCounter.textContent = days;

        if (distance < 0) {
            clearInterval(setinterval);
            daysCounter.textContent = "0";
        }
    }, 1000);
}

function showModal() {
    const photos = document.querySelectorAll(".gallery__item");

    for (let i = 0; i < photos.length; i++) {
        photos[i].addEventListener("click", function() {
            const modal = this.querySelector(".modal");

            this.querySelector(".modal").classList.toggle("show-modal");

            window.addEventListener("click", function(e) {
                if (e.target == modal) {
                    modal.classList.toggle("show-modal");
                }
            })
        })
    }
}


function useScrollReveal() {
    const slideUp = {
        duration: 1500,
        delay: 200,
        easing: "ease-out",
        scale: 1,
        distance: "5rem"
    };

    ScrollReveal().reveal(".animation", {delay: 350});
    ScrollReveal().reveal(".animation-up", slideUp);
}

function checkMedia() {
    const mobile = window.matchMedia("screen and (min-width: 900px)");

    if (mobile.matches) {
        showModal();
        useScrollReveal();
    }

    mobile.addListener( function(mobile) {
        if (mobile.matches) {
            showModal();
            useScrollReveal();
        }
    });
};

const init = function() {
    changeTitle();
    showHamburgerMenu();
    countingDownDays();
    checkMedia();
};

document.addEventListener("DOMContentLoaded", init);
