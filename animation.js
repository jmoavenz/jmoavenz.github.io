

$(document).ready(function() {

    var skills = initSkills();
    animateSkills(skills); // TODO animate when scrolling

    $(window).scroll(function() {
        applyParallax('header', 0.5);
        applyParallax('#blockquote', 0.5);
        applyParallax('#contact', 0.5);
    });

});

function initSkills() {
    var skills = {
        '#python': {
            progress: 0.93,
        },
        '#c': {
            progress: 0.90,
        },
        '#java': {
            progress: 0.88,
        },
        '#r': {
            progress: 0.88,
        },
        '#php': {
            progress: 0.82,
        },
        '#git': {
            progress: 0.80,
        },
        '#html': {
            progress: 0.76,
        },
        // '#linux': {
        //     progress: 0.74,
        // },
        '#matlab': {
            progress: 0.70,
        },
    }

    Object.keys(skills).map(function(key, index) {
        var container = key;
        var progress = skills[key].progress;

        var bar = new ProgressBar.Circle(container, {
            strokeWidth: 3,
            trailWidth: 3,
            easing: 'easeInOut',
            duration: 1400,
            text: {
                autoStyleContainer: false,
                style: {
                    color: '#aaa',
                    fontSize: '22px',
                    position: 'absolute',
                    top: '55%',
                    width: '100%', 
                },
            },

            from: {color: '#aaa', opacity: 0.1},
            to: {color: '#00fc82', opacity: 1},
            step: function(state, circle) {
                circle.path.setAttribute('stroke', state.color);
                circle.path.setAttribute('opacity', state.opacity);

                var value = Math.round(circle.value() * 100);
                if (value === 0) {
                    circle.setText('');
                } else {
                    circle.setText(value+'%');
                }
            },
        });

        skills[key].bar = bar;
    });

    return skills;
}

function animateSkills(skills) {
    Object.keys(skills).map(function(key, index) {
        var bar = skills[key].bar;
        var progress = skills[key].progress;
        bar.animate(progress);
    });
}

function applyParallax(selector, factor) {
    if (onScreen(selector)) {
        $(selector).css({
            'background-position-y' : (factor*scrollOffset(selector)) + 'px'
        });
    }
}

function onScreen(selector) {
    var scrollTop = $(window).scrollTop();
    var wHeight = $(window).height();

    var elemTop = $(selector).offset().top-scrollTop; // scrollOffset
    var elemBottom = elemTop+$(selector).outerHeight();

    return elemBottom > 0 && elemTop < wHeight;
}

function scrollOffset(selector) {
    return $(selector).offset().top - $(window).scrollTop();
}