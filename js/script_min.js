//GLOBAL DECLARATIONS
//// MAIN NAVIGATION MENU
const menu = document.querySelector(".navbar-menu");
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

// DEBUGGING
if (!debug) {
    console.log = function() {};
}
// EXECUTION
mobileFix();