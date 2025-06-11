document.addEventListener('scroll', e => {
    
    handleHeaderOnScroll();
})

window.onload = () => {
    
    hideLoadingScreen();

    setTimeout(() => {

        addHeaderElementsOnLoadAnimation();
        addHomeHeaderElementsSlideIn();
        addHomeOfferElementsSlideIn();

    }, loaderTimeout);

}