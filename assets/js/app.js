let hamburgerBtn = document.querySelector('.header__hamburger');
let teste = document.querySelector('#teste');
let mobileNav = document.querySelector('.header__navigation--mobile ul');
let backdrop = document.querySelector('.backdrop');
let mobileLinks = document.querySelectorAll('.header__navigation--mobile a');


hamburgerBtn.addEventListener('click', () => {
    if(mobileNav.style.display == 'block'){
        mobileNav.style.display = 'none';
        teste.src = 'assets/images/icon-hamburger.svg';
    } else{
        mobileNav.classList.add('showMenu');
        backdrop.style.display = 'block';
    }
});

backdrop.addEventListener('click', () => {
    backdrop.style.display = 'none';
    mobileNav.classList.remove('showMenu');
    teste.src = 'assets/images/icon-hamburger.svg';
});

mobileLinks.forEach(mobileLink => {
    mobileLink.addEventListener('click', () => {
        backdrop.style.display = 'none';
        mobileNav.classList.remove('showMenu');
        teste.src = 'assets/images/icon-hamburger.svg';
    });
});