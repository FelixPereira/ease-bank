let hamburgerBtn = document.querySelector('#teste');
let mobileNav = document.querySelector('.header__navigation--mobile');


hamburgerBtn.addEventListener('click', () => {
    mobileNav.classList.add('showMenu');
});