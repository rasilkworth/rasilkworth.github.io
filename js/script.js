//GLOBAL DECLARATIONS
//// MAIN NAVIGATION MENU
const menu = document.querySelector(".navbar-menu");
//// MOBILE MENU TOGGLE
const menuToggleBtn = document.querySelector(".navbar-menu-toggle");
//// CUSTOM VARIABLES FOR 1% MOBILE HEIGHT & WIDTH | SEE mobileFix()
//// HEIGHT (MOBILE VERTICAL)
let mv1;
//// WIDTH (MOBILE HORIZONTAL)
let mh1;
// DEBUGGING
let debug = false;

//CHECKS DEVICE TYPE
window.isMobile = function() {
    // DESKTOP DEFAULT
    let check = false;
    // CHECKS FOR MOBILE DEVICE
    if (/iphone|ipod|ipad|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec/i.test(navigator.userAgent.toLowerCase())) {
        check = true;
    }
    //RETURNS TRUE FOR MOBILE DEVICE
    return check;
  };

// FIXES MOBILE DEVICES
//// ALLOWS FOR FULL HEIGHT HERO BANNER WHILE IGNORING RESIZE EVENT FROM MOBILE ADDRESS BAR SCROLLING
function mobileFix() {
    // CHECKS FOR MOBILE DEVICES
    if (window.isMobile()) {
        // DEBUGGING
        console.log("device is mobile")
        // INITIALIZES CUSTOM VARIABLES
        windowInit();
        // SETS CSS VARIABLES TO CUSTOM VARIABLES FOR MOBILE HEIGHT AND WIDTH
        setHeight();
        // HANDLES RESIZE EVENTS
        windowWatcher();
    };
    return;
}

//CHECKS DEVICE ORIENTATION
// function isLandscape() {
//     // PORTRAIT DEFAULT
//     let landscape = false;
//     // CHECKS FOR LANDSCAPE ORIENTATION
//     if (window.innerHeight < 1000 && window.innerWidth < 1000) {
//         if (window.innerHeight < window.innerWidth) {
//             landscape = true;
//         }
//     }
//     // DEBUGGING
//     console.log("landscape: " + landscape);
//     // RETURNS TRUE FOR LANDSCAPE
//     return landscape;
// }

// SET GLOBAL SCREEN DIMENSION VARIABLES
function windowInit() {
    mv1 = window.innerHeight / 100;
    mh1 = window.innerWidth / 100;
    // DEBUGGING
    console.log("1 custom height unit: " + mv1);
    console.log("1 custom width unit: " + mh1);
}

// SETS CSS VARIABLES TO CUSTOM VARIABLES FOR MOBILE HEIGHT AND WIDTH
function setHeight() {
    // SETS CSS HEIGHT VARIABLES 
    document.documentElement.style.setProperty("--mv1", mv1 + "px");
    // CONVERTS WIDTH TO PIXEL VALUE
    document.documentElement.style.setProperty("--mh1", mh1 + "px");
    // DEBUGGING
    console.log("1% custom height: " + document.documentElement.style.getPropertyValue("--mv1"));
    console.log("1% custom width: " + document.documentElement.style.getPropertyValue("--mh1"));
}

// HANDLES RESIZE EVENTS
function windowWatcher() {
    // TRIGGERS ON RESIZE
    window.addEventListener("resize", () => {
        // FULL HEIGHT
        const mv100 = mv1 * 100;
        // 100px DEFAULT THRESHOLD BEFORE TRIGGERING RESIZE
        let threshold = 300;
        // DEBUGGING
        console.log("window has been resized");
        console.log("is landscape: " + window.isLandscape());
        // CHECKS DEVICE ORIENTATION
        if (isLandscape()) {
            // 300px THRESHOLD FOR LANDSCAPE
            threshold = 600;
        }
        // DEBUGGING
        console.log("threshold is set to " + threshold + "px");
        // CHECKS IF RESIZE THRESHOLD HAS BEEN MET
        if (window.innerHeight - mv100 > threshold || mv100 - window.innerHeight > threshold) {
            // DEBUGGING
            console.log("threshold has been met")
            // RESETS HEIGHT & WIDTH
            windowInit();
            // APPLIES NEW HEIGHT & WIDTH
            setHeight();
        }
    });
    // HANDLES ORIENTATION CHANGE EVENT
    window.addEventListener("orientationchange", () => {
        // REFRESHES PAGE
        window.location.reload();
    });
}

// INITIALIZES NAVIGATION
function menuInit() {
    // GETS ALL MAIN NAVIGATION LINKS
    const links = document.querySelectorAll(".navbar-link, .home-link");
    // APPLIES TO ALL MAIN NAVIGATION LINKS
    links.forEach((link) => {
        // TOGGLES MOBILE MENU ON LINK CLICK
        link.addEventListener("click", () => {
            // CHECKS FOR OPEN MOBILE MENU
            if (menu.classList.contains("navbar-menu-toggled")) {
                // TOGGLES MOBILE MENU
                menuToggle();
            }
        });
        // TOGGLES MENU ON CLICK OUT
        const dimmer = document.querySelector(".dimmer");
        dimmer.addEventListener("click", menuToggle);
        //  EXECUTES SMOOTH SCROLL FUNCTION ON LINK CLICK
        link.addEventListener("click", smoothScroll);
    });
    // TOGGLES MOBILE MENU ON BUTTON CLICK
    menuToggleBtn.addEventListener("click", menuToggle);
}

// TOGGLES MOBILE MENU
function menuToggle() {
    // PAGE DIMMER
    const dimmer = document.querySelector(".dimmer");
    // TOGGLES BUTTON APPEARANCE
    menuToggleBtn.firstElementChild.classList.toggle("fa-bars");
    menuToggleBtn.firstElementChild.classList.toggle("fa-times");
    // TOGGLES MOBILE MENU
    menu.classList.toggle("navbar-menu-toggled");
    // TOGGLES PAGE DIMMER
    dimmer.classList.toggle("dimmer-dimmed");
}

// HANDLES NAVIGATION SCROLLING
function smoothScroll(link) {
    // PREVENT DEFAULT NAVIGATION BEHAVIOR
    link.preventDefault();
    // HASH VALUE OF LINK
    let hash;
    // ENSURES HASH VALUE IS RETRIEVED
    if (!link.target.hash) {
        // TARGET IS NOT A LINK
        hash = link.currentTarget.hash;
    }
    else {
        // TARGET IS A LINK
        hash = link.target.hash;
    }
    // DEFINES TARGET
    const target = document.querySelector(hash);
    // SCROLLS SMOOTHLY TO TARGET
    target.scrollIntoView({behavior: "smooth"});
}

// COUNTDOWN TO IMPORTANT DATE 
function countdown() {
    // IMPORTANT DATE
    const stopDate = Date.parse(new Date("November 3, 2020 07:00:00 GMT-5").toUTCString());
        // TODAY
        let startDate = Date.parse(new Date().toUTCString());
        // DIFFERENCE BETWEEN DATES
        let diff = stopDate - startDate;
        // RAW DIFFERENCE BETWEEN DATES IN VARIOUS UNITS
        let seconds = Math.floor(diff / 1000),
            minutes = Math.floor(seconds / 60),
            hours = Math.floor(minutes / 60),
            days = Math.floor(hours / 24);
        // CONVERTS RAW DIFFERENCES INTO REAL DIFFERENCE
        seconds %= 60;
        minutes %= 60;
        hours %= 24;
        days -= Math.floor(((seconds / 60 / 60) + (minutes / 60) + hours) / 24);
        // SETS COUNTDOWN DIGITS
        document.getElementById("d").firstChild.textContent = days.toString();
        document.getElementById("h").firstChild.textContent = hours.toString();
        document.getElementById("m").firstChild.textContent = minutes.toString();
        document.getElementById("s").firstChild.textContent = seconds.toString();
}

// DEBUGGING
if (!debug) {
    console.log = function() {};
}
// EXECUTION
mobileFix();
countdown();
setInterval(countdown, 1000);
menuInit();