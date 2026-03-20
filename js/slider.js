document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("sliderTrack");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dotsContainer = document.getElementById("dotsContainer");
  const viewport = document.getElementById("sliderViewport");

  const slidesPerView = 3;
  const autoplayDelay = 3000;

  const originalSlides = Array.from(track.querySelectorAll(".gallery-slide"));
  const originalCount = originalSlides.length;
  const totalPages = Math.ceil(originalCount / slidesPerView);

  let currentIndex = slidesPerView;
  let isTransitioning = false;
  let autoplay;

  // clone last 3 and first 3 for smooth infinite loop
  const prependClones = originalSlides
    .slice(-slidesPerView)
    .map((slide) => slide.cloneNode(true));

  const appendClones = originalSlides
    .slice(0, slidesPerView)
    .map((slide) => slide.cloneNode(true));

  prependClones.forEach((clone) => track.prepend(clone));
  appendClones.forEach((clone) => track.append(clone));

  const allSlides = Array.from(track.querySelectorAll(".gallery-slide"));

  function createDots() {
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("button");
      dot.className = "dot w-3 h-3 rounded-full bg-gray-400 transition";
      dot.dataset.index = i;
      dotsContainer.appendChild(dot);
    }
  }

  createDots();

  const dots = Array.from(dotsContainer.querySelectorAll(".dot"));

  function updateDots() {
    let realIndex = (currentIndex - slidesPerView) / slidesPerView;

    if (realIndex < 0) realIndex = totalPages - 1;
    if (realIndex >= totalPages) realIndex = 0;

    dots.forEach((dot, index) => {
      dot.classList.remove("bg-gray-800");
      dot.classList.add("bg-gray-400");

      if (index === realIndex) {
        dot.classList.remove("bg-gray-400");
        dot.classList.add("bg-gray-800");
      }
    });
  }

  function setSlidePosition(withTransition = true) {
    if (withTransition) {
      track.style.transition = "transform 0.5s ease-in-out";
    } else {
      track.style.transition = "none";
    }

    const translateX = -(currentIndex * (100 / slidesPerView));
    track.style.transform = `translateX(${translateX}%)`;
    updateDots();
  }

  function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex += slidesPerView;
    setSlidePosition(true);
  }

  function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex -= slidesPerView;
    setSlidePosition(true);
  }

  track.addEventListener("transitionend", () => {
    if (currentIndex >= originalCount + slidesPerView) {
      currentIndex = slidesPerView;
      setSlidePosition(false);
    }

    if (currentIndex < slidesPerView) {
      currentIndex = originalCount;
      setSlidePosition(false);
    }

    isTransitioning = false;
  });

  nextBtn.addEventListener("click", () => {
    nextSlide();
    restartAutoplay();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    restartAutoplay();
  });

  dots.forEach((dot, pageIndex) => {
    dot.addEventListener("click", () => {
      if (isTransitioning) return;
      currentIndex = slidesPerView + pageIndex * slidesPerView;
      isTransitioning = true;
      setSlidePosition(true);
      restartAutoplay();
    });
  });

  function startAutoplay() {
    autoplay = setInterval(() => {
      nextSlide();
    }, autoplayDelay);
  }

  function stopAutoplay() {
    clearInterval(autoplay);
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  viewport.addEventListener("mouseenter", stopAutoplay);
  viewport.addEventListener("mouseleave", startAutoplay);

  setSlidePosition(false);
  startAutoplay();
});