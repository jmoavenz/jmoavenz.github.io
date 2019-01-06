

$(document).ready(function() {

    var skills = initSkills();
    animateSkills(skills); // TODO animate when scrolling, fold into other functions

    updateBackgroundImages();
    initAnimations();
    $(window).scroll(function() {
        updateBackgroundImages();
        animateElements();
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
            progress: 0.83,
        },
        '#git': {
            progress: 0.80,
        },
        '#html': {
            progress: 0.72,
        },
        '#js': {
            progress: 0.70,
        },
    }

    Object.keys(skills).map(function(key, index) {
        var selector = key;

        var circle = createProgressBarCircle(selector);
        skills[key].circle = circle;

        var bar = createProgressBarLine(selector);
        skills[key].bar = bar;
    });

    return skills;
}

function createProgressBarCircle(selector) {
    return new ProgressBar.Circle(selector+' .circle', getProgressBarStyle());
}

function createProgressBarLine(selector) {
    return new ProgressBar.Line(selector+' .bar', getProgressBarStyle());
}

function getProgressBarStyle() {
    return {
        strokeWidth: 3,
        trailWidth: 3,
        easing: 'easeInOut',
        duration: 1400,
        text: {
            autoStyleContainer: false,
            style: { // TODO move text styling to css by using className
                color: '#aaa',
                fontSize: '22px',
                position: 'absolute',
                top: '55%',
                width: '100%', 
            },
        },

        from: {color: '#aaa', opacity: 0.1},
        to: {color: '#44da82', opacity: 1},
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
    };
}

function animateSkills(skills) {
    Object.keys(skills).map(function(key, index) {
        var progress = skills[key].progress;

        var circle = skills[key].circle;
        circle.animate(progress);

        var bar = skills[key].bar;
        bar.animate(progress);
    });
}

function updateBackgroundImages() {
    if (window.matchMedia("(min-width: 800px)").matches) {
        parallaxBackgroundImages();
    } else {
        fixBackgroundImages();
    }
}

function fixBackgroundImages() {
    applyParallax('header', 1);
    applyParallax('#blockquote', 1);
    applyParallax('#contact', 1);
}

function parallaxBackgroundImages() {
    applyParallax('header', 0.5);
    applyParallax('#blockquote', 0.5);
    applyParallax('#contact', 0.5);
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
    // offset from top of window
    return $(selector).offset().top - $(window).scrollTop();
}

function initAnimations() {
    // initTimeline();
}

function animateElements() {
    // animateHeader();
    // animateTimeline();
    // animateProjects();
    // animateSkills();
}