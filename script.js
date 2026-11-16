
// =====================================
// CLIMATIX - ADVANCED JAVASCRIPT
// =====================================


// 1. SELECT ELEMENTS

const header = document.getElementById("header");

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");

const navItems = document.querySelectorAll(".nav-link");

const progressBar = document.getElementById("scrollProgress");

const backToTop = document.getElementById("backToTop");

const sections = document.querySelectorAll("main section[id]");


// 2. MOBILE NAVIGATION

function closeMenu() {

    navLinks.classList.remove("open");

    menuToggle.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute("aria-label", "فتح القائمة");

}


menuToggle.addEventListener("click", function () {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "إغلاق القائمة" : "فتح القائمة"
    );

});


navItems.forEach(function (link) {

    link.addEventListener("click", function () {

        closeMenu();

    });

});


// Close menu when clicking outside

document.addEventListener("click", function (event) {

    const clickedInsideMenu =
        navLinks.contains(event.target) ||
        menuToggle.contains(event.target);

    if (!clickedInsideMenu) {

        closeMenu();

    }

});


// 3. NAVBAR SCROLL EFFECT

function updateNavbar() {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


// 4. SCROLL PROGRESS BAR

function updateProgress() {

    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress = documentHeight > 0
        ? (scrollTop / documentHeight) * 100
        : 0;

    progressBar.style.width = progress + "%";

}


// 5. BACK TO TOP BUTTON

function updateBackToTop() {

    if (window.scrollY > 400) {

        backToTop.classList.add("visible");

    } else {

        backToTop.classList.remove("visible");

    }

}


backToTop.addEventListener("click", function () {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


// 6. ACTIVE NAVIGATION LINK

function updateActiveLink() {

    let currentSection = "";

    const position = window.scrollY + 180;

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop;

        const sectionHeight = section.offsetHeight;

        if (
            position >= sectionTop &&
            position < sectionTop + sectionHeight
        ) {

            currentSection = section.id;

        }

    });


    navItems.forEach(function (link) {

        link.classList.remove("active");

        const target = link.getAttribute("href");

        if (target === "#" + currentSection) {

            link.classList.add("active");

        }

    });

}


// 7. REVEAL ANIMATIONS

const revealElements = document.querySelectorAll(".reveal");

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


if ("IntersectionObserver" in window && !reduceMotion) {

    const revealObserver = new IntersectionObserver(

        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },

        {

            threshold: 0.12,

            rootMargin: "0px 0px -40px 0px"

        }

    );


    revealElements.forEach(function (element, index) {

        element.style.transitionDelay =
            (index % 4) * 80 + "ms";

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(function (element) {

        element.classList.add("show");

    });

}


// 8. COMBINED SCROLL EVENT

let ticking = false;

window.addEventListener("scroll", function () {

    if (!ticking) {

        window.requestAnimationFrame(function () {

            updateNavbar();

            updateProgress();

            updateBackToTop();

            updateActiveLink();

            ticking = false;

        });

        ticking = true;

    }

}, { passive: true });


// 9. UPDATE CURRENT YEAR

const currentYear = document.getElementById("currentYear");

currentYear.textContent = new Date().getFullYear();


// 10. HANDLE WINDOW RESIZE

window.addEventListener("resize", function () {

    if (window.innerWidth > 768) {

        closeMenu();

    }

});


// 11. INITIALIZE WEBSITE

function initializeWebsite() {

    updateNavbar();

    updateProgress();

    updateBackToTop();

    updateActiveLink();

    console.log(
        "🌍 CLIMATIX is ready. Let's protect our planet!"
    );

}


initializeWebsite();


// =====================================
// END OF CLIMATIX JAVASCRIPT
// =====================================
