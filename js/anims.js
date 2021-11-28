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


const mouseWheelBounce = gsap.timeline();
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

    } else if (isScrollUp(evt) && states.main & !states.screen1 && Y() < 80) {
        if (mainTopCounter <= 1) {
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

const to1SlideGsap = gsap.timeline();
to1SlideGsap.to('#s1BG1', { top: '100%', duration: 1, ease: 'power2.out' })
    .to('#s1BG2', { bottom: '100%', duration: 1, delay: -1, ease: 'power2.out' })
    .to('#s1BG3', { left: '100%', duration: 1, delay: -1, ease: 'power2.out' })
    .to('#s1BG4', { bottom: '100%', duration: 1, delay: -1, ease: 'power2.out' })
    .to('#s1BG5', { left: '100%', duration: 1, delay: -1, ease: 'power2.out' })
    .to('#s1BG6', { top: '100%', duration: 1, delay: -1, ease: 'power2.out' })
    .to('#s1BG7', {
        left: '100%', duration: 1, delay: -1, ease: 'power2.out',
        onComplete: () => { states.animIsActive = false; console.log('end1'); }
    });
to1SlideGsap.pause();

const to1Slide = () => {
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

const to2SlideGsap = gsap.timeline();
to2SlideGsap
    .fromTo('.s1__slide-cover', { x: '100%' }, { x: 0, duration: 1, delay: 0.9, ease: 'power2.out' })
    .to('#multi4Img1', { top: '100%', duration: 0.7, delay: -0.3, ease: 'power2.out' })
    .to('#multi4Img2', { top: '100%', duration: 0.7, delay: -0.7, ease: 'power2.out' })
    .to('#multi4Img3', { left: '100%', duration: 0.7, delay: -0.7, ease: 'power2.out' })
    .to('#multi4Img4', { bottom: '100%', duration: 0.7, delay: -0.7, ease: 'power2.out' })
    .fromTo('.s2 h1, .s2 h3', { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power2.out' })
    .fromTo('.s2 .text', { opacity: 0 }, {
        opacity: 1, duration: 0.7, delay: -0.6, ease: 'power2.out',
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

const to2Slide = () => {
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

// Подгон высоты картинок s2 под высоту текста s2
window.addEventListener('load', () => {
    let s2L = screen2.querySelector('.main-section__left');
    const s2H1 = s2L.querySelector('h1');
    const s2H3 = s2L.querySelector('h3');
    const s2Text = s2L.querySelector('.text');
    let s2R = screen2.querySelector('.main-section__right');

    s2R.style.maxHeight = `${s2H1.offsetHeight + s2H3.offsetHeight + s2Text.offsetHeight +
        vh100() * 0.033 + vw100() * 0.0555}px`;
});

// Ровно до левого padding при 1440px:
// vw100() - 160 - vw100() * 0.727 === vw100() * 0.273 - 160

// Анимация горизонтального перемещения ms2
const xMoveArea = vw100() * 0.273 - 160;
const basexMoveValue = () => { return xMoveArea * 0.9; };

const xMove = gsap.timeline();
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
        markers: false,
    });
}

// Плавное появление в ms2
const mS2Anim = gsap.timeline();
mS2Anim
    .fromTo('.ms--xMove .text', { opacity: 0 }, { opacity: 1, duration: 0.7, ease: 'power1.out', delay: 0.2 })
    .fromTo('.xMoveAnimBack', { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power1.out', delay: -0.49 })
    .fromTo('.xMoveAnimFront', { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power1.inOut', delay: -0.3 });

ScrollTrigger.create({
    animation: mS2Anim,
    trigger: '.ms--xMove',
    start: `top-=${vh100() * 0.62} bottom`,
    toggleActions: 'play none none reverse',
    markers: false,
});

// Плавное появление в ms3
const mS3Anim = gsap.timeline();
mS3Anim
    .fromTo('.ms3 h3', { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'none', delay: 0 })
    .fromTo('.ms3 .text', { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out', delay: -0.39 })
    .fromTo('.ms3 .brand-img-wrap', { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power1.out', delay: -0.15 })
    .to('.ms3 .multi-images__img-cap', { top: '100%', duration: 0.4, ease: 'power1.inOut', delay: -0.3 });

ScrollTrigger.create({
    animation: mS3Anim,
    trigger: '.ms3',
    start: `top+=${vh100() * 0.77} bottom`,
    toggleActions: 'play none none none',
    markers: false,
});

// Плавное появление в ms4
const mS4Anim = gsap.timeline();
mS4Anim
    .to('#multi3Img1', { right: '100%', duration: 0.5, delay: 0, ease: 'power1.out' })
    .to('#multi3Img3', { left: '100%', duration: 0.5, delay: -0.5, ease: 'power1.out' })
    .to('#multi3Img2', { right: '100%', duration: 0.5, delay: -0.5, ease: 'power1.out' })
    .fromTo('.ms4 .text', { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0 });

ScrollTrigger.create({
    animation: mS4Anim,
    trigger: '.ms4',
    start: `top+=${vh100() * 0.77} bottom`,
    toggleActions: 'play none none none',
    markers: false,
});