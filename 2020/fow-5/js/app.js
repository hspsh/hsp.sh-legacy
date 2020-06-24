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
    const countDownDate = new Date("Jun 18, 2020 00:00:00").getTime();

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

function changeVideo() {
    let currentVideoId = 0;
    
    const videos = [
        {
            title: "Future of Work : Gdańsk #5",
            src: "img/video_fow5.png",
            url: "https://primetime.bluejeans.com/a2m/events/playback/e4ba6f89-80ec-44fe-a74d-93e474011468"
        },
        {
            title: "Future of Work : Gdańsk #4",
            src: "img/video_fow4.png",
            url: "https://primetime.bluejeans.com/a2m/events/playback/ec6e0c0e-10e8-4938-97c4-24b07a355750"
        },
    ];

    const updateVideoSrc = () => {
        const videoMeta = videos[currentVideoId];
        
        document.getElementById("vide-target-link").href = videoMeta.url;
        document.getElementById("video-title").innerText = videoMeta.title;
        const target = document.getElementById("video-target");
        target.src = videoMeta.src;
        target.alt = videoMeta.title;
    }
    const prevVideo = () => {
        currentVideoId--;
        if (currentVideoId < 0){
            currentVideoId = videos.length - 1;
        }
        updateVideoSrc();
    }
    const nextVideo = () => {
        currentVideoId = (++currentVideoId % videos.length);
        
        updateVideoSrc();
    }

    document.getElementById("video-arrow-prev").addEventListener("click", prevVideo);
    document.getElementById("video-arrow-next").addEventListener("click", nextVideo);
    
    updateVideoSrc();
}

const init = function() {
    changeTitle();
    showHamburgerMenu();
    countingDownDays();
    checkMedia();
    changeVideo();
};

document.addEventListener("DOMContentLoaded", init);
