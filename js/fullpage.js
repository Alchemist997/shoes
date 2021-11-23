let header = document.querySelector('.main-header');
let slideToSecondBtn = document.querySelector('#toRightBtn');
let leftSlide = document.querySelector('.general-wrap');
let rightSlide = document.querySelector('.s2');
let rightSlideWrap;
let rightOnTop = 0;

let rightSlideWrapFinder = setInterval(() => {
    let targetEl = rightSlide.querySelector('.fp-scroller');
    if (targetEl) {
        rightSlideWrap = targetEl;
        clearInterval(rightSlideWrapFinder);
    }
}, 50);

setTimeout(() => {
    clearInterval(rightSlideWrapFinder);
}, 5000);

$('#fullPage').fullpage({
    verticalCentered: false,
    sectionSelector: '.part',
    scrollOverflow: true,
    controlArrows: false,
    onSlideLeave: function (section, origin, destination, direction) {
        if (destination == 0) {
            setTimeout(() => {
                header.classList.add('white');
            }, 200);
        } else {
            header.classList.remove('white');
        }
    }
});

// Блок для интро
let mouseWheelBounce = gsap.timeline();
mouseWheelBounce.to('.scroll-down__wheel', { top: '15px', duration: 0.6, ease: 'power2' })
    .to('.scroll-down__wheel', { top: '7px', duration: 0.5, ease: 'none' });
mouseWheelBounce.repeat(-1);

watchVideo.onclick = () => {
    videoBG.play();
    mouseWheelBounce.pause();
};

let introBlocks = document.querySelectorAll('.introState');
let isIntroState = true;

document.addEventListener('wheel', evt => {
    if (evt.deltaY > 0 && isIntroState) {
        introBlocks.forEach(el => el.classList.remove('introState'));

        setTimeout(() => {
            toFirstSlideGsap.play();
        }, 300);

        setTimeout(() => {
            introBlocks.forEach(el => {
                if (!el.classList.contains('main-logo') && !el.classList.contains('scroll-down'))
                    el.remove();
            });
            isIntroState = false;
            gsap.to('.scroll-down', { 'z-index': 1 });
        }, 800);
    }
});

// Блок для перехода между 1/2(Left/Right) слайдами
let toFirstSlideGsap = gsap.timeline();
toFirstSlideGsap.to('#s1BG1', { top: '100%', duration: 1 })
    .to('#s1BG2', { bottom: '100%', duration: 1, delay: -1 })
    .to('#s1BG3', { left: '100%', duration: 1, delay: -1 })
    .to('#s1BG4', { bottom: '100%', duration: 1, delay: -1 })
    .to('#s1BG5', { left: '100%', duration: 1, delay: -1 })
    .to('#s1BG6', { top: '100%', duration: 1, delay: -1 })
    .to('#s1BG7', { left: '100%', duration: 1, delay: -1 });
toFirstSlideGsap.pause();

let toFirstSlide = () => {
    if (rightOnTop <= 3) {
        rightOnTop++;
    } else {
        rightOnTop = 0;
        setTimeout(() => {
            $.fn.fullpage.silentMoveTo(0, 0);
            gsap.to('.scroll-down', { 'z-index': 1 });
        }, 1700);
        leftSlide.classList.add('sCurrent');
        rightSlide.classList.remove('sCurrent');
        to2SlideGsap.reverse();
    }
};

let to2SlideGsap = gsap.timeline();
to2SlideGsap.fromTo('.s1__slide-cover', { x: '100%' }, { x: 0, duration: 1, ease: 'power2.out' })
    .to('#multiImg1', { top: '100%', duration: 0.7, delay: 0 })
    .to('#multiImg2', { top: '100%', duration: 0.7, delay: -0.7 })
    .to('#multiImg3', { left: '100%', duration: 0.7, delay: -0.7 })
    .to('#multiImg4', { bottom: '100%', duration: 0.7, delay: -0.7 })
    .fromTo('.main-section__left', { opacity: 0 }, { opacity: 1, duration: 1 });
to2SlideGsap.pause();

to2Slide = () => {
    setTimeout(() => {
        $.fn.fullpage.silentMoveTo(0, 1);
    }, 900);
    setTimeout(() => {
        gsap.to('.scroll-down', { 'z-index': -1 });
    }, 300);
    leftSlide.classList.remove('sCurrent');
    rightSlide.classList.add('sCurrent');
    to2SlideGsap.play();
};

document.addEventListener('wheel', evt => {
    if (evt.deltaY > 0 && leftSlide.classList.contains('sCurrent') && !isIntroState) {
        to2Slide();

    } else if (evt.deltaY < 0 && !leftSlide.classList.contains('sCurrent') && rightSlideWrap) {
        if (rightSlideWrap.style.transform.indexOf('translate(0px)') > -1 ||
            rightSlideWrap.style.transform.indexOf('translate(0px, 0px)') > -1) {
            toFirstSlide();
        }

    } else if (evt.deltaY < 0 && !rightSlideWrap) {
        toFirstSlide();
    }

    if (evt.deltaY > 0) rightOnTop = 0;
});

slideToSecondBtn.addEventListener('click', () => { to2Slide(); });