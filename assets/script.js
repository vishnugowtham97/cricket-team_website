/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/* Menu show */
navToggle.addEventListener("click", () => {
  navMenu.classList.add("show-menu");
});

/* Menu hidden */
navClose.addEventListener("click", () => {
  navMenu.classList.remove("show-menu");
});

/*=============== SEARCH ===============*/
const search = document.getElementById("search"),
  searchBtn = document.getElementById("search-btn"),
  searchClose = document.getElementById("search-close");

/* Search show */
searchBtn.addEventListener("click", () => {
  search.classList.add("show-search");
});

/* Search hidden */
searchClose.addEventListener("click", () => {
  search.classList.remove("show-search");
});

/*=============== LOGIN ===============*/
const login = document.getElementById("login"),
  loginBtn = document.getElementById("login-btn"),
  loginClose = document.getElementById("login-close");

/* Login show */
loginBtn.addEventListener("click", () => {
  login.classList.add("show-login");
});

/* Login hidden */
loginClose.addEventListener("click", () => {
  login.classList.remove("show-login");
});

// Home
document.addEventListener("DOMContentLoaded", function () {
  var homeContent = document.getElementById("homeContent");
  var windowHeight = window.innerHeight;

  function checkPosition() {
    var currentPosition = homeContent.getBoundingClientRect().top;

    if (currentPosition - windowHeight <= 0) {
      homeContent.classList.add("animate");
    } else {
      homeContent.classList.remove("animate"); // Remove the animation class if the section is not in view
    }
  }

  window.addEventListener("scroll", checkPosition);
});

document.addEventListener("DOMContentLoaded", function () {
  var batContainer = document.getElementById("batContainer");
  var batOffset = batContainer.offsetTop;

  function checkPosition() {
    var scrollPosition = window.scrollY + window.innerHeight;

    if (scrollPosition > batOffset) {
      batContainer.classList.add("animate");
    } else {
      batContainer.classList.remove("animate");
    }
  }

  window.addEventListener("scroll", checkPosition);
});

// Awards

let list = document.querySelectorAll(".carousel .list .item");
let carousel = document.querySelector(".carousel");
let dots = document.querySelectorAll(".dots li");
let nextBtn = document.getElementById("next");
let prevBtn = document.getElementById("prev");

let lastPosition = list.length - 1;
let active = 0;
let zIndex = 2;

nextBtn.onclick = () => {
  let newValue = active + 1 > lastPosition ? 0 : active + 1;
  setItemActive(newValue, showSlider);
};
prevBtn.onclick = () => {
  let newValue = active - 1 < 0 ? lastPosition : active - 1;
  setItemActive(newValue, showSlider);
};

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    setItemActive(index, showSlider);
  });
});

const setItemActive = (newValue, callbackFunction) => {
  if (newValue === active) return;
  let type = newValue > active ? "next" : "prev";
  active = newValue;
  callbackFunction(type);
};
let removeEffect;
let autoRun = setTimeout(() => {
  nextBtn.click();
}, 5000);
const showSlider = (type) => {
  carousel.style.pointerEvents = "none";
  // find Item Active Old
  let itemActiveOld = document.querySelector(".carousel .list .item.active");
  if (itemActiveOld) itemActiveOld.classList.remove("active");
  zIndex++;
  list[active].style.zIndex = zIndex;
  list[active].classList.add("active");

  if (type === "next") {
    carousel.style.setProperty("--transform", "300px");
  } else {
    carousel.style.setProperty("--transform", "-300px");
  }
  carousel.classList.add("effect");

  // dots
  // find dot active old
  let dotActiveOld = document.querySelector(".dots li.active");
  if (dotActiveOld) dotActiveOld.classList.remove("active");
  dots[active].classList.add("active");

  clearTimeout(removeEffect);
  removeEffect = setTimeout(() => {
    carousel.classList.remove("effect");
    carousel.style.pointerEvents = "auto";
  }, 1500);

  clearTimeout(autoRun);
  autoRun = setTimeout(() => {
    nextBtn.click();
  }, 5000);
};

// Member
$(".option").click(function () {
  $(".option").removeClass("active");
  $(this).addClass("active");
});

// Matches

const countToDate = new Date().setHours(new Date().getHours() + 24);
let previousTimeBetweenDates;
setInterval(() => {
  const currentDate = new Date();
  const timeBetweenDates = Math.ceil((countToDate - currentDate) / 1000);
  flipAllCards(timeBetweenDates);

  previousTimeBetweenDates = timeBetweenDates;
}, 250);

function flipAllCards(time) {
  const seconds = time % 60;
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600);

  flip(document.querySelector("[data-hours-tens]"), Math.floor(hours / 10));
  flip(document.querySelector("[data-hours-ones]"), hours % 10);
  flip(document.querySelector("[data-minutes-tens]"), Math.floor(minutes / 10));
  flip(document.querySelector("[data-minutes-ones]"), minutes % 10);
  flip(document.querySelector("[data-seconds-tens]"), Math.floor(seconds / 10));
  flip(document.querySelector("[data-seconds-ones]"), seconds % 10);
}

function flip(flipCard, newNumber) {
  const topHalf = flipCard.querySelector(".top");
  const startNumber = parseInt(topHalf.textContent);
  if (newNumber === startNumber) return;

  const bottomHalf = flipCard.querySelector(".bottom");
  const topFlip = document.createElement("div");
  topFlip.classList.add("top-flip");
  const bottomFlip = document.createElement("div");
  bottomFlip.classList.add("bottom-flip");

  topHalf.textContent = startNumber;
  bottomHalf.textContent = startNumber;
  topFlip.textContent = startNumber;
  bottomFlip.textContent = newNumber;

  topFlip.addEventListener("animationstart", () => {
    topHalf.textContent = newNumber;
  });
  topFlip.addEventListener("animationend", () => {
    topFlip.remove();
  });
  bottomFlip.addEventListener("animationend", () => {
    bottomHalf.textContent = newNumber;
    bottomFlip.remove();
  });
  flipCard.append(topFlip, bottomFlip);
}

// card counter
let section_counter = document.querySelector("#section_counter");
let counters = document.querySelectorAll(".counter-item .counter");

// Scroll Animation

let CounterObserver = new IntersectionObserver(
  (entries, observer) => {
    let [entry] = entries;
    if (!entry.isIntersecting) return;

    let speed = 200;
    counters.forEach((counter, index) => {
      function UpdateCounter() {
        const targetNumber = +counter.dataset.target;
        const initialNumber = +counter.innerText;
        const incPerCount = targetNumber / speed;
        if (initialNumber < targetNumber) {
          counter.innerText = Math.ceil(initialNumber + incPerCount);
          setTimeout(UpdateCounter, 40);
        }
      }
      UpdateCounter();

      if (counter.parentElement.style.animation) {
        counter.parentElement.style.animation = "";
      } else {
        counter.parentElement.style.animation = `slide-up 0.3s ease forwards ${
          index / counters.length + 0.5
        }s`;
      }
    });
    observer.unobserve(section_counter);
  },
  {
    root: null,
    threshold: window.innerWidth > 768 ? 0.4 : 0.3,
  }
);

CounterObserver.observe(section_counter);

// Footer-Contact

const scrollToTopBtn = document.getElementById("scrollToTopBtn");

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

scrollToTopBtn.addEventListener("click", scrollToTop);
