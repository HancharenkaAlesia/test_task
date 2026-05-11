document.addEventListener('DOMContentLoaded', () => {

  /* section appearing animation */
  if(document.querySelector('.reveal')) {
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  }

  /* stages cards appearing animation */
  if(document.querySelector('.stages__slider-card')) {
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;

    if (isDesktop) {
      const stageCards = document.querySelectorAll('.stages__slider-card');
      const stagesSection = document.querySelector('.stages__slider-wrapper');

      console.log(stageCards)

      const stagesObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              stageCards.forEach((card, index) => {
                setTimeout(() => {
                  card.classList.add('is-visible');
                }, index * 120);
              });

              stagesObserver.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.2,
        }
      );

      stagesObserver.observe(stagesSection);
    }
  }

});
