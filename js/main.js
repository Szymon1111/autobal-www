const loaderTimeout = 500;

const loader = document.getElementById('loader');
loader.style.display = 'flex';

const handleHeaderOnScroll = () => {

  const boxShadowClassName = 'box-shadow';

  const header = document.getElementById('page-header');
  const scrollPosition = window.scrollY;

  if (scrollPosition > 0) {
    header.classList.add(boxShadowClassName);
  } else {
    header.classList.remove(boxShadowClassName);
  }
}