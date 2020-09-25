$(".navbar-toggler").click(() => {
    $("#page-shade").toggleClass("d-none");
});

$(".nav-link").click(() => {
    if (window.innerWidth < 992) {
        $(".navbar-toggler").click();
    }
});

const stopDate = new Date(2020, 10, 3, 7);
let startDate;

function getTime(stopDate) {
    const stopTime = stopDate.getTime();
    const startTime = startDate.getTime();
    const diff = stopTime - startTime;
    const remainder = {};

    remainder.sec = Math.floor((diff % (1000 * 60)) / 1000);
    remainder.min = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    remainder.hr = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    remainder.day = Math.floor(diff / (1000 * 60 * 60 * 24));

    return remainder;
}

function setTime(remainder) {
    if (startDate < stopDate) {
        $("#day").html(remainder.day);
        $("#hr").html(remainder.hr);
        $("#min").html(remainder.min);
        $("#sec").html(remainder.sec);
    } else if (startDate.getUTCDate() === stopDate.getUTCDate()) {
        $("#countdown-timer").empty();
        $("#countdown-timer").html("<span class='lead digit'>Time to Get Out and Vote!</span>");
    } else if (startDate > stopDate) {
        $("#countdown-timer").empty();
        $("#countdown-timer").html("<span class='lead digit'>Thanks to All Who Voted!</span>");
    }
}

function countdown() {
    startDate = new Date();
    setTime(getTime(stopDate));
}

countdown();
if (startDate < stopDate) {
    setInterval(countdown, 1000);
}