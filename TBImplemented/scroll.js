window.addEventListener('scroll', reveal);

function reveal() {
    var reveals = document.querySelectorAll('.reveal');

    for (var i = 0; i < reveals.length; i++) {

        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealPoint = 150;

        if (revealtop < windowheight - revealPoint) {
            reveals[i].classList.add('active');
        }
    }
}