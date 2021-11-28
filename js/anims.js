const btnToMain = document.querySelector('#toRightBtn');
let html = document.querySelector('#mainHTML');
let header = document.querySelector('.main-header');
let introBlocks = document.querySelectorAll('.introState');
let screen1 = document.querySelector('.s1');
let screen2 = document.querySelector('.s2');

let mainTopCounter = 0;
const Y = () => { return window.scrollY; };
const vh100 = () => { return document.documentElement.clientHeight; };
const vw100 = () => { return document.documentElement.clientWidth; };
const isScrollDown = scroll => { return scroll.deltaY > 0; };
const isScrollUp = scroll => { return scroll.deltaY < 0; };
const zMouse = index => { gsap.to('.scroll-down', { 'z-index': index }); };
const states = {
    xMoveCreated: false,
    animIsActive: false,
    intro: true,
    screen1: false,
    main: false,
    aside: false,
};


let mouseWheelBounce = gsap.timeline();
mouseWheelBounce.to('.scroll-down__wheel', { top: '15px', duration: 0.5, ease: 'none' })
    .to('.scroll-down__wheel', { top: '7px', duration: 0.6, ease: 'power2' });
mouseWheelBounce.repeat(-1);

watchVideo.onclick = () => {
    videoBG.play();
    mouseWheelBounce.pause();
};

let i = 0;

document.addEventListener('wheel', evt => {
    if (states.animIsActive)
        return evt.preventDefault();

    if (states.aside)
        return;
    i++;
    console.log(i);

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
            zMouse(1);
            states.intro = false;
        }, 1000);

    } else if (isScrollUp(evt) && !states.intro && states.screen1 && !states.main) {
        zMouse(7777);
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
        to1Slide();
        setTimeout(() => {
            states.main = false;
            screen1.classList.remove('dNone');
            screen1.scrollIntoView();
            zMouse(1);
        }, 1800);
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
        onComplete: () => { states.animIsActive = false; console.log('end1'); }
    });
to1SlideGsap.pause();

let to1Slide = () => {
    if (states.animIsActive)
        return;

    states.animIsActive = true;
    console.log('start1');
    mainTopCounter = 0;
    to2SlideGsap.reverse();
    setTimeout(() => {
        to1SlideGsap.play();
        header.classList.remove('white');
    }, 2100);
};

let to2SlideGsap = gsap.timeline();
to2SlideGsap
    .fromTo('.s1__slide-cover', { x: '100%' }, { x: 0, duration: 1, delay: 0.9, ease: 'power2.out' })
    .to('#multi4Img1', { top: '100%', duration: 0.7, delay: -0.3 })
    .to('#multi4Img2', { top: '100%', duration: 0.7, delay: -0.7 })
    .to('#multi4Img3', { left: '100%', duration: 0.7, delay: -0.7 })
    .to('#multi4Img4', { bottom: '100%', duration: 0.7, delay: -0.7 })
    .fromTo('.s2 h1, .s2 h3', { opacity: 0 }, { opacity: 1, duration: 1 })
    .fromTo('.s2 .text', { opacity: 0 }, {
        opacity: 1, duration: 0.7, delay: -0.6,
        onComplete: () => { states.animIsActive = false; xMoveInit(); console.log('end2'); }
    })
    .to('.scroll-down', {
        'z-index': -1, delay: -2.5,
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
    console.log('start2');
    states.main = true;
    to1SlideGsap.reverse();
    to2SlideGsap.play();
    setTimeout(() => {
        states.screen1 = false;
        header.classList.add('white');
    }, 2000);
};

btnToMain.addEventListener('click', () => to2Slide());

window.addEventListener('load', () => {
    let s2L = screen2.querySelector('.main-section__left');
    let s2H1 = s2L.querySelector('h1');
    let s2H3 = s2L.querySelector('h3');
    let s2Text = s2L.querySelector('.text');
    let s2R = screen2.querySelector('.main-section__right');

    s2R.style.maxHeight = `${s2H1.offsetHeight + s2H3.offsetHeight + s2Text.offsetHeight +
        vh100() * 0.033 + vw100() * 0.0555}px`;
});

// Ровно до левого padding при 1440px:
// vw100() - 160 - vw100() * 0.727 === vw100() * 0.273 - 160

const xMoveArea = vw100() * 0.273 - 160;
const basexMoveValue = () => { return xMoveArea * 0.9; };

let xMove = gsap.timeline();
xMove.to('.xMoveAnimFront', { x: `-=${basexMoveValue()}px`, duration: 1, ease: 'power2.in' })
    .to('.xMoveAnimBack', { x: `-=${basexMoveValue() - vh100() * 0.12}px`, duration: 1, delay: -1, ease: 'power2.in' });
xMove.pause();

function xMoveInit() {
    if (states.xMoveCreated)
        return;

    states.xMoveCreated = true;

    ScrollTrigger.create({
        animation: xMove,
        trigger: '.ms--xMove',
        start: `bottom bottom`,
        end: `bottom+=${vh100() * 0.5} top+=107`,
        scrub: true,
        pin: '.ms--xMove',
        markers: true,
    });
}