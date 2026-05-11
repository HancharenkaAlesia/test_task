function initSlider(selector, options) {
  const slider = document.querySelector(selector);
  if (!slider) return;

  /* elements */
  const wrapper = slider.querySelector('.slider__wrapper');
  const slides = slider.querySelectorAll('.slider__slide');
  const prevBtn = document.querySelector(options.prevBtn);
  const nextBtn = document.querySelector(options.nextBtn);
  const pagination = document.querySelector(options.pagination);

  let currentSlide = 0;
  let autoplayInterval;

  /* slides */
  function getSlidesPerView() {
    if (window.innerWidth <= 768) {
      return 1;
    }
    return options.slidesDesktop || 1;
  }

  function getSlidesPerGroup() {
    if (window.innerWidth <= 768) {
      return 1;
    }
    return options.slidesDesktop || 1;
  }

  /* active */
  function isActive() {
    if (options.mobileOnly) {
      return window.innerWidth <= 768;
    }
    return true;
  }

  /* pagination */
  let dots = [];

  if (options.paginationType === 'dots' && pagination) {
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('slider__dot');
      if (index === 0) {
        dot.classList.add('active');
      }
      dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
      });
      pagination.append(dot);
    });
    dots = pagination.querySelectorAll('.slider__dot');
  }

  /* fraction */
  let currentFraction;

  if (options.paginationType === 'fraction' && pagination) {
    pagination.innerHTML = `
      <span class="slider__current">1</span>
      <span class="slider__total">
        / ${slides.length}
      </span>
    `;
    currentFraction = pagination.querySelector('.slider__current');
  }

  /* update */
  function updateSlider() {
    if (!isActive()) {
      slider.classList.remove('slider--active');
      wrapper.style.transform = 'none';
      return;
    }

    slider.classList.add('slider--active');

    const slidesPerView = getSlidesPerView();
    const maxIndex = slides.length - slidesPerView;
    if (currentSlide > maxIndex) {
      currentSlide = maxIndex;
    }

    /* width */
    slides.forEach(slide => {
      slide.style.width = `${100 / slidesPerView}%`;
    });

    /* move */
    wrapper.style.transform = `translateX(-${currentSlide * (100 / slidesPerView)}%)`;

    /* dots */
    if (options.paginationType === 'dots') {
      dots.forEach(dot => {
        dot.classList.remove('active');
      });
      dots[currentSlide]?.classList.add('active');
    }

    /* fraction */
    if (options.paginationType === 'fraction' &&  currentFraction) {
      currentFraction.textContent = Math.min(
        currentSlide + getSlidesPerView(),
        slides.length
      );
    }

    /* buttons */
    if (!options.loop) {
      if (prevBtn) {
        prevBtn.disabled = currentSlide === 0;
      }
      if (nextBtn) {
        nextBtn.disabled = currentSlide === maxIndex;
      }
    }
  }

  /* next */
  function nextSlide() {
    const maxIndex = slides.length - getSlidesPerView();
    const slidesPerGroup = getSlidesPerGroup();
    if (options.loop) {
      currentSlide += slidesPerGroup;
      if (currentSlide > maxIndex) {
        currentSlide = 0;
      }
    } else {
      if (currentSlide >= maxIndex) return;
      currentSlide += slidesPerGroup;
      if (currentSlide > maxIndex) {
        currentSlide = maxIndex;
      }
    }
    updateSlider();
  }

  /* prev */
  function prevSlide() {
    const maxIndex = slides.length - getSlidesPerView();
    const slidesPerGroup = getSlidesPerGroup();
    if (options.loop) {
      currentSlide -= slidesPerGroup;
      if (currentSlide < 0) {
        currentSlide = maxIndex;
      }
    } else {
      if (currentSlide <= 0) return;
      currentSlide -= slidesPerGroup;
      if (currentSlide < 0) {
        currentSlide = 0;
      }
    }
    updateSlider();
  }

  /* buttons */
  nextBtn?.addEventListener('click', nextSlide);
  prevBtn?.addEventListener('click', prevSlide);

  /* autoplay */
  if (options.autoplay) {
    autoplayInterval = setInterval(() => {
      nextSlide();
    }, 4000);
  }

  /* resize */
  window.addEventListener('resize', updateSlider);

  /* init */
  updateSlider();
}

/* stages slider */
initSlider('.stages__slider', {
  prevBtn:'.stages__slider .slider__prev',
  nextBtn:'.stages__slider .slider__next',
  pagination:'.stages__slider .slider__pagination',
  mobileOnly: true,
  loop: false,
  autoplay: false,
  paginationType: 'dots',
  slidesDesktop: 1
});

/* players slider */
initSlider('.players__slider', {
  prevBtn:'.players__navigation .slider__prev',
  nextBtn:'.players__navigation .slider__next',
  pagination:'.players__navigation .slider__pagination',
  mobileOnly: false,
  loop: true,
  autoplay: true,
  paginationType: 'fraction',
  slidesDesktop: 3
});