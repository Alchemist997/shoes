document.addEventListener('DOMContentLoaded', () => {
    let vacancyWrap = document.querySelector('.aside__vacancy');
    let vacancyCounter = document.querySelector('.vacancy-left-text span');

    document.body.addEventListener('click', evt => {
        if (!evt.target.classList.contains('github'))
            evt.preventDefault();

        if (!evt.target.closest('.vacancyToggleBtn'))
            return;

        if (vacancyWrap.classList.contains('hidden')) {
            vacancyWrap.classList.remove('hidden');
            html.classList.add('nonScrollable');
            states.aside = true;

            let i = 200;
            let counter = setInterval(() => {
                i += 23;
                vacancyCounter.textContent = i;
                if (i >= 1777) {
                    clearInterval(counter);
                    vacancyCounter.textContent = 1777;
                }
            }, 25);

            setTimeout(() => {
                header.classList.add('white');
            }, 220);

            setTimeout(() => {
                header.style.width = `calc(${vw100()}px - 460px)`;
            }, 120);

            gsap.to('.vacancy-left', { duration: 0.5, x: 370 });
            gsap.to('.vacancy-main', { duration: 0.7, x: vw100(), delay: 0.2 });
        } else {
            gsap.to('.vacancy-main', { duration: 0.8, x: 0 });
            gsap.to('.vacancy-left', { duration: 0.5, x: 0, delay: 0.35 });
            if (!states.main) {
                header.classList.remove('white');
            }
            setTimeout(() => {
                header.style.width = 'calc(100% - 100px)';
            }, 370);
            setTimeout(() => {
                vacancyWrap.classList.add('hidden');
                states.aside = false;
                if (states.main)
                    html.classList.remove('nonScrollable');
            }, 750);
        }
    });
})