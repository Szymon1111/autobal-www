
const addSlideInForChilden = (parentElement) => {

  const children = parentElement.children;

  Array.from(children).forEach((child) => {
    child.classList.add('slide-in-up-start');
  });

  Array.from(children).forEach((child, index) => {

    child.style.animationDelay = `${index * .1}s`;
    child.classList.add('slide-in-up');

  });

}

const hideLoadingScreen = () => {

  const loader = document.getElementById('loader');

  if (loader) {
    setTimeout(() => {

      loader.classList.add('fade-out');

      setTimeout(() => {
        loader.style.display = 'none';
      }, loaderTimeout);

    }, loaderTimeout)
  }

}

const addHeaderElementsOnLoadAnimation = () => {


  const logo = document.querySelector('.header__logo');
  const partnerInfo = document.querySelector('.header__partner-info');
  const navElements = document.querySelectorAll('.header__nav-item');

  const headerElements = [logo, partnerInfo, ...navElements];

  headerElements.forEach((element) => {
    element.classList.add('slide-in-up-start');
  });

  headerElements.forEach((element, index) => {

    element.style.animationDelay = `${index * .1}s`;
    element.classList.add('slide-in-up');

  });

}

const addHomeHeaderElementsSlideIn = () => {

  const header = document.querySelector('.home__header-container');
  addSlideInForChilden(header)

}

const addHomeOfferElementsSlideIn = () => {

  const offerContainer = document.querySelector('.home__offer');
  addSlideInForChilden(offerContainer);

}