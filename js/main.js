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

document.addEventListener("DOMContentLoaded", function() {
    const iframe = document.querySelector('.info__map-iframe');
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                iframe.src = iframe.getAttribute('data-src');
                observer.unobserve(iframe);
            }
        });
    }, { rootMargin: "200px" });

    observer.observe(iframe);
});