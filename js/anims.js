const btnToMain = document.querySelector('#toRightBtn');
let html = document.querySelector('#mainHTML');
let header = document.querySelector('.main-header');
let introBlocks = document.querySelectorAll('.introState');
let screen1 = document.querySelector('.s1');
let screen2 = document.querySelector('.s2');

let mainTopCounter = 0;
const Y = () => { return window.scrollY; };
const zMouse = index => { gsap.to('.scroll-down', { 'z-index': index }); };
const isScrollDown = scroll => { return scroll.deltaY > 0; };
const isScrollUp = scroll => { return scroll.deltaY < 0; };
const states = {
    animIsActive: false,
    intro: true,
    screen1: false,
    main: false,
};


let mouseWheelBounce = gsap.timeline();
mouseWheelBounce.to('.scroll-down__wheel', { top: '15px', duration: 0.5, ease: 'none' })
    .to('.scroll-down__wheel', { top: '7px', duration: 0.6, ease: 'power2' });
mouseWheelBounce.repeat(-1);

watchVideo.onclick = () => {
    videoBG.play();
    mouseWheelBounce.pause();
};

document.addEventListener('wheel', evt => {
    if (states.animIsActive)
        return evt.preventDefault();

    // Переключение intro/screen1
    if (isScrollDown(evt) && states.intro && !states.screen1 && !states.main) {
        introBlocks.forEach(el => el.classList.remove('introState'));
        states.screen1 = true;
        setTimeout(() => {
            to1SlideGsap.play();
        }, 200);
        setTimeout(() => {
            introBlocks.forEach(el => {
                if (!el.classList.contains('main-logo') &&
                    !el.classList.contains('scroll-down')) {
                    el.classList.add('dNone');
                }
            });
            videoBG.load();
            mouseWheelBounce.play();
            states.intro = false;
        }, 1000);

    } else if (isScrollUp(evt) && !states.intro && states.screen1 && !states.main) {
        zMouse(7777);
        if (header.classList.contains('white'))
            vacancyToggleBtn.click();
        to1SlideGsap.reverse();
        introBlocks.forEach(el => el.classList.remove('dNone'));
        states.intro = true;
        setTimeout(() => {
            states.screen1 = false;
            introBlocks.forEach(el => el.classList.add('introState'));
        }, 1000);
    }


    // Переключение main/screen1
    if (isScrollDown(evt) && states.screen1 && !states.intro && !states.main) {
        to2Slide();

    } else if (isScrollUp(evt) && states.main & !states.screen1 && Y() < 5) {
        if (mainTopCounter <= 4) {
            mainTopCounter++;
            return;
        }
        html.classList.add('nonScrollable');
        states.screen1 = true;
        setTimeout(() => {
            states.main = false;
            screen1.classList.remove('dNone');
            screen1.scrollIntoView();
        }, 2000);
        to1Slide();
    }

    if (isScrollDown(evt)) mainTopCounter = 0;
}, { passive: false });

let to1SlideGsap = gsap.timeline();
to1SlideGsap.to('#s1BG1', { top: '100%', duration: 1 })
    .to('#s1BG2', { bottom: '100%', duration: 1, delay: -1 })
    .to('#s1BG3', { left: '100%', duration: 1, delay: -1 })
    .to('#s1BG4', { bottom: '100%', duration: 1, delay: -1 })
    .to('#s1BG5', { left: '100%', duration: 1, delay: -1 })
    .to('#s1BG6', { top: '100%', duration: 1, delay: -1 })
    .to('#s1BG7', {
        left: '100%', duration: 1, delay: -1,
        onComplete: () => {
            states.animIsActive = false;
            zMouse(1);
        }
    });
to1SlideGsap.pause();

let to1Slide = () => {
    if (states.animIsActive)
        return;

    states.animIsActive = true;
    mainTopCounter = 0;
    to1SlideGsap.play();
    to2SlideGsap.reverse();
    setTimeout(() => {
        header.classList.remove('white');
    }, 1500);
};

let to2SlideGsap = gsap.timeline();
to2SlideGsap.fromTo('.s1__slide-cover', { x: '100%' }, { x: 0, duration: 1, delay: 1, ease: 'power2.out' })
    .to('#multiImg1', { top: '100%', duration: 0.7, delay: 0 })
    .to('#multiImg2', { top: '100%', duration: 0.7, delay: -0.7 })
    .to('#multiImg3', { left: '100%', duration: 0.7, delay: -0.7 })
    .to('#multiImg4', { bottom: '100%', duration: 0.7, delay: -0.7 })
    .fromTo('.main-section__left', { opacity: 0 }, {
        opacity: 1, duration: 1,
        onComplete: () => states.animIsActive = false
    })
    .to('.scroll-down', {
        'z-index': -1, delay: -2.7,
        onComplete: () => {
            html.classList.remove('nonScrollable');
            screen1.classList.add('dNone');
        }
    });
to2SlideGsap.pause();

let to2Slide = () => {
    if (states.animIsActive)
        return;

    states.animIsActive = true;
    states.main = true;
    to1SlideGsap.reverse();
    to2SlideGsap.play();
    setTimeout(() => {
        states.screen1 = false;
        header.classList.add('white');
    }, 2000);
};

btnToMain.addEventListener('click', () => { to2Slide(); });