// Header Nav Function
window.addEventListener("load", function () {
  // Mengatur posisi scroll ke paling atas
  window.scrollTo(0, 0);
});
const iconNavbar = document.querySelector(".icon-navbar");
const iconNavbarSpan = document.querySelectorAll(".icon-navbar span");
const headerNav = document.querySelector(".header-nav-content");

iconNavbar.addEventListener("click", function () {
  iconNavbarSpan[0].classList.toggle("active-icon-line-1");
  iconNavbarSpan[1].classList.toggle("active-icon-line-3");
  iconNavbarSpan[2].classList.toggle("active-icon-line-2");
  headerNav.classList.toggle("open");
});

// Catch Margin header Nav
function isAnimationSpan() {
  const titleNav = [
    {
      title: "Home",
    },
    {
      title: "About",
    },
    {
      title: "Project",
    },
    {
      title: "Contact",
    },
  ];

  const navbarContainer = document.querySelector(".ul-header-nav");
  titleNav.forEach((t) => {
    const navbarNav = document.createElement("li");
    navbarNav.className = "navbar-nav";
    navbarNav.innerHTML = `<a href="#container-${t.title.toLowerCase()}" class="nav-link-active link-nav">${
      t.title
    }</a>`;
    navbarContainer.appendChild(navbarNav);
  });

  const navbarNavLink = document.querySelectorAll(
    ".navbar-nav .nav-link-active"
  );

  const headerNav = document.querySelector(".header-nav");
  const contentContainer = document.querySelector(".content-container");
  const rect = headerNav.getBoundingClientRect();
  contentContainer.style.paddingTop = rect.height + "px";

  navbarNavLink.forEach((n) => {
    n.style.height = rect.height + "px";
  });

  let showSpan = "";
  navbarNavLink.forEach((navItem, navIndex) => {
    showSpan = showSpanWave();

    const spanWave = document.createElement("span");

    spanWave.innerHTML = showSpan;
    navItem.parentNode.appendChild(spanWave);
    spanWave.style.setProperty("--set-opacity-span-title", 0);

    if (navIndex % 2 === 0) {
      navItem.nextElementSibling.style.transform = "translateX(100%)";
    }
    if (navIndex === 0) {
      spanWave.style.setProperty("--set-opacity-span-title", 1);
    }

    window.addEventListener("scroll", function () {
      const scrollY = this.window.scrollY;

      if (this.window.innerWidth <= 767) {
        if (
          scrollY >= nextScrolled.offsetTop &&
          scrollY <= projectView.offsetTop
        ) {
          headerNav.classList.add("active-when-at-about");
          navbarContainer.classList.add("active-for-ul-when-at-about");
        } else {
          headerNav.classList.remove("active-when-at-about");
          navbarContainer.classList.remove("active-for-ul-when-at-about");
        }
      }

      navbarNavLink.forEach((navItem, index) => {
        const targetID = navItem.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetID);
        const rect = targetElement.getBoundingClientRect();

        if (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          navbarNavLink[index].nextElementSibling.style.setProperty(
            "--set-opacity-span-title",
            1
          );
          navbarNavLink[index].nextElementSibling.classList.add(
            "active-span-e"
          );
          navbarNavLink[index].classList.add("active");
        } else {
          navbarNavLink[index].nextElementSibling.style.setProperty(
            "--set-opacity-span-title",
            0
          );
          navbarNavLink[index].nextElementSibling.classList.remove(
            "active-span-e"
          );
          navbarNavLink[index].classList.remove("active");
        }
      });
    });
    if (navIndex === 0) {
      navItem.nextElementSibling.classList.add("active-span-e");
      navItem.classList.add("active");
    }
    navItem.addEventListener("click", function (event) {
      event.preventDefault();

      navbarNavLink.forEach((other) => {
        other.classList.remove("active");
      });

      this.classList.add("active");

      const targetID = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetID);
      targetElement.scrollIntoView({ behavior: "smooth" });

      if (window.innerWidth <= 767) {
        this.nextElementSibling.classList.add("active-span-e");
        navbarNavLink.forEach((other) => {
          if (other !== this) {
            const otherSpan = other.nextElementSibling;
            otherSpan.classList.remove("active-span-e");
          }
        });
      } else {
        this.nextElementSibling.innerHTML = showSpan;
      }
    });
  });
}
const showSpanWave = function () {
  return `<span class="wave-header-animations">
                <i class="i-1"></i>
                <i class="i-2"></i>
                <i class="i-3"></i>
                <i class="i-4"></i>
                <i class="i-5"></i>
                <i class="i-6"></i>
                <i class="i-7"></i>
              </span>`;
};
isAnimationSpan();

// Scrolled Bg Home Start
const bgColor = document.querySelector("#container-home");

function setLeft() {
  const startWidth = 1920;
  const currentWidth = window.innerWidth;
  let adjustedLeft = -160 + (startWidth - currentWidth);
  bgColor.style.setProperty("--set-translateX", `${adjustedLeft}px`);

  if (window.innerHeight <= 1080) {
    const currentHeight = window.innerHeight;
    const startHeight = 1080;

    // Hitung perubahan left berdasarkan perbedaan tinggi
    let setLeft = (-1 * (startHeight - currentHeight)) / 2; // Sesuaikan dengan kebutuhan
    bgColor.style.setProperty("--set-left", `${setLeft}px`);
  } else {
    // Reset nilai --set-left jika tinggi lebih dari 1080
    bgColor.style.setProperty("--set-left", "0");
  }
}

setLeft();

window.addEventListener("resize", function () {
  setLeft();
});

const bgText = document.querySelector(".bg-home");
const nextBgText = document.querySelector(".bg-home-1");

window.addEventListener("scroll", function () {
  const scrollY = this.window.scrollY;
  const valueScroll = scrollY / 20;

  if (scrollY > 50) {
    bgText.style.right = `${-valueScroll}%`;
    nextBgText.style.left = `-${valueScroll}%`;
  } else {
    // Reset styles when scrolling back to the top
    bgText.style.right = "0";
    nextBgText.style.left = "0";
  }

  if (this.window.innerWidth <= 991) {
    bgText.style.top = `${valueScroll}%`;
    nextBgText.style.bottom = `${valueScroll}%`;
    bgText.style.right = "0";
    nextBgText.style.left = "0";
  } else {
    bgText.style.top = "0";
    nextBgText.style.bottom = "0";
  }
});

// Scrolled Bg Home End

// Scrolled Content Start

const scrolled = document.querySelector(".scrolled-content");
const nextScrolled = document.getElementById("container-about");
const projectView = document.getElementById("container-project");
scrolled.addEventListener("click", function () {
  nextScrolled.scrollIntoView({ behavior: "smooth" });
});

// Scrolled Content End
// Ukuran Background Sub-Nav
const itemNav = document.querySelectorAll(".btn-header-item-nav-content");
const itemNavContent = document.querySelectorAll(
  ".btn-header-sub-item-nav-content"
);
const buttonTextContent = document.querySelectorAll(".button-text-content a");
navContentWidth = () => {
  itemNavContent.forEach((element, index) => {
    const indexItemNav = itemNav;
    const widthItemNav = indexItemNav[index].clientWidth;
    const heightItemNav = itemNavContent[index].clientHeight;
    const thisBottom = (widthItemNav + heightItemNav) * -0.08;
    console.log(widthItemNav);

    if (index === 0) {
    } else if (index === 1) {
      element.style.width = "102.48px";
    } else {
      element.style.width = "100.69px";
    }
    element.style.setProperty("--set-bottom-item-nav", `${thisBottom}px`);
  });
};
navContentWidth();

//Cek Padding Right
itemNav.forEach(function (element) {
  let isText = element.textContent;
  let isTextLength = isText.length;
  let isPadding = 13;
  const isChevronRight = document.querySelectorAll(".chevron");

  isChevronRight.forEach(function (elem, index) {
    if (index === 3) {
      elem.style.marginLeft = "100px";
    }
  });

  element.addEventListener("mouseover", function (e) {
    e.target.style.paddingRight = isTextLength - isPadding + "px";
    e.target.classList.add("active");
  });
  element.addEventListener("mouseout", function (e) {
    e.target.style.paddingRight = "0px";
    e.target.classList.remove("active");
  });
});

let firstItemNav = null;
itemNav.forEach(function (clickItemNav) {
  document.addEventListener("click", function (e) {
    if (!clickItemNav.contains(e.target)) {
      clickItemNav.classList.remove("active-first-item-nav");
    }
  });
});

// Check Animation Slide Profesion
const dynamicTextContent = document.querySelector(".dynamic-txt-content");
const textWord = ["Game Enthusiast", "Junior Programmer", "Freelancer"];
let wordIndex = 0;
let charIndex = 1;
let isDeleting = false;

const typeEffect = () => {
  const currentWord = textWord[wordIndex];
  const currentChar = currentWord.substring(0, charIndex);
  dynamicTextContent.textContent = currentChar;
  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(typeEffect, 200);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 100);
  } else {
    isDeleting = !isDeleting;
    wordIndex = !isDeleting ? (wordIndex + 1) % textWord.length : wordIndex;
    setTimeout(typeEffect, 1200);
  }
};

typeEffect();

const contentStats = [
  {
    value: 3,
    title: "Project~",
  },
  {
    value: 1,
    title: "User~",
  },
  {
    value: 7,
    title: "Cerificate~",
  },
];
// Stats Counting
function statProject() {
  const statsCounting = document.querySelector(".stats-counting");

  function showStats(show) {
    return `<div class="stats-counting-content">
                <h1 class="count-up">0</h1>
                <span>${show.title}</span>
              </div>`;
  }

  let card = "";
  contentStats.forEach((show) => {
    card += showStats(show);
  });
  statsCounting.innerHTML = card;

  const countUp = document.querySelectorAll(".count-up");

  countUp.forEach((element, index) => {
    animateValue(element, 0, contentStats[index].value, 100);
  });

  function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor((duration / range) * 10));
    let currentValue = start;

    function updateValue() {
      element.textContent = currentValue;
      currentValue += increment;
      if (
        (increment > 0 && currentValue <= end) ||
        (increment < 0 && currentValue >= end)
      ) {
        setTimeout(updateValue, stepTime);
      }
    }

    updateValue();
  }
}
statProject();

const cSkillBtn = document.querySelectorAll(".item-skills-content li button");
const cSubNavSkill = document.querySelector(".subnav-item-skills");
const styleLeft = document.querySelector(".slide-left");
const activeSubnav = document.querySelector(".active-subnav-item-skills");
const cSubNavSkillContent = document.querySelectorAll(
  ".subnav-item-skills-content"
);

// Cek Lebar container-img-software start

const subContentContainerHome = document.querySelector(
  ".sub-content-container"
);

// Cek Lebar container-img-software end
// Cek Tinggi Element

// Kondisi
cSkillBtn.forEach((element, index) => {
  let subNavIndex = [];
  let subNavIndex2 = [];
  cSubNavSkillContent.forEach((subNav) => {
    const computedStyle = getComputedStyle(subNav);

    let subNavSkillContentHeightWithPadding =
      subNav.clientHeight + parseFloat(computedStyle.marginBottom);

    let subNavSkillContentHeight = subNav.clientHeight;

    subNavIndex.push(subNavSkillContentHeightWithPadding);
    subNavIndex2.push(subNavSkillContentHeight);

    console.log(subNavIndex[0]);
  });

  if (index === 0) {
    element.style.backgroundColor = "red";
  }
  element.addEventListener("click", function () {
    cSkillBtn.forEach((btn) => {
      btn.style.backgroundColor = "";
    });

    // Menambahkan warna merah pada elemen yang diklik
    element.style.backgroundColor = "red";

    // Menghapus Class Animasi (Jika Ada)
    cSubNavSkill.classList.remove("puff-in-ver");

    let totalSubNav = subNavIndex[0] + subNavIndex[1];
    let min = "-";
    if (index === 0) {
      cSubNavSkill.style.top = "0";
      activeSubnav.style.height = subNavIndex2[0] + "px";
    } else if (index === 1) {
      cSubNavSkill.style.top = min + subNavIndex[0] + "px";
      activeSubnav.style.height = subNavIndex2[1] + "px";
    } else {
      cSubNavSkill.style.top = min + totalSubNav + "px";
      activeSubnav.style.height = subNavIndex2[2] + "px";
    }

    // Menambahkan Class Animasi
    setTimeout(() => {
      cSubNavSkill.classList.add("puff-in-ver");
    }, 300);
  });
});

// box animation
const boxAnimation = document.querySelectorAll(".animation-box");

boxAnimation.forEach((element, index) => {
  element.classList.add("box-animation");

  if (index == 0) {
    element.style.setProperty("--set-rotate", "rotate(15deg)");
  } else if (index == 1) {
    element.style.setProperty("--set-rotate", "rotate(-20deg)");
    element.style.setProperty("--set-time", `1.2s`);
  } else if (index == 2) {
    element.style.setProperty("--set-rotate", "rotate(25deg)");
    element.style.setProperty("--set-time", `1.4s`);
  } else if (index == 3) {
    element.style.setProperty("--set-rotate", "rotate(5deg)");
    element.style.setProperty("--set-time", `1.6s`);
  } else if (index == 4) {
    element.style.setProperty("--set-rotate", "rotate(-15deg)");
    element.style.setProperty("--set-time", `1.8s`);
  } else {
    element.style.setProperty("--set-rotate", "rotate(15deg)");
    element.style.setProperty("--set-time", `2s`);
  }
});

// fungsi button text content start
const btnTextContent = document.querySelectorAll(".button-text");
const btnTxt = document.querySelectorAll(".btn-txt");
const contactView = document.getElementById("container-contact");

btnTxt[1].addEventListener("click", function (e) {
  e.preventDefault();
  contactView.scrollIntoView({ behavior: "smooth" });
  setTimeout(() => {
    focusOnName();
  }, 1000);
});

btnTxt.forEach((element) => {
  const isSpanFirst = element.nextElementSibling;
  const isSpanSecond = isSpanFirst.nextElementSibling;

  element.addEventListener("mouseover", function () {
    isSpanFirst.classList.add("active-span");
    isSpanSecond.classList.add("active-span");
    isSpanFirst.style.setProperty("--is-opacity", 1);
    isSpanSecond.style.setProperty("--is-opacity", 1);
    this.classList.add("active-btn");
  });
  element.addEventListener("mouseout", function () {
    isSpanFirst.classList.remove("active-span");
    isSpanSecond.classList.remove("active-span");
    isSpanFirst.style.setProperty("--is-opacity", 0);
    isSpanSecond.style.setProperty("--is-opacity", 0);
    this.classList.remove("active-btn");
  });
});

// fungsi button text content end
// Social Media Button Start
const buttonSocialMedia = document.querySelectorAll(".social-media-box li a");

buttonSocialMedia.forEach((button, index) => {
  window.addEventListener("resize", function () {});

  button.addEventListener("mouseover", function () {
    if (index != 1) {
      button.classList.add("active-social-media-a");
    } else {
      buttonSocialMedia[1].classList.add("active-social-media-a-2");
    }
  });

  button.addEventListener("mouseout", function () {
    if (index != 1) {
      button.classList.remove("active-social-media-a");
    } else {
      buttonSocialMedia[1].classList.remove("active-social-media-a-2");
    }
  });
});
// Social Media Button End
// Title Project Animation
const titleProject = document.querySelector(".title-project");
const spreadChar = [...titleProject.textContent]
  .map((t) => `<span class='span-title-project'>${t}</span>`)
  .join("");
titleProject.innerHTML = spreadChar;
const spanTitleProject = document.querySelectorAll(".span-title-project");

function animateColors(index) {
  if (index < spanTitleProject.length) {
    setTimeout(() => {
      spanTitleProject[index].classList.add("active-color");
      animateColors(index + 1);
    }, 200);
  } else {
    // Start the restoredColor function after a delay
    setTimeout(() => {
      restoredColor(spanTitleProject.length - 1);
    }, 200);
  }
}

function restoredColor(index) {
  if (index >= 0) {
    setTimeout(() => {
      spanTitleProject[index].style.color = "white";
      spanTitleProject[index].classList.remove("active-color");

      restoredColor(index - 1);
    }, 200);
  } else {
    // Start the animateColors function after a delay
    setTimeout(() => {
      animateColors(0);
    }, 200);
  }
}

animateColors(0);

// Fungsi Button Experience Start

const buttonSkils = document.querySelectorAll(".button-skils button");
const contentSkil = document.querySelectorAll(
  ".content-skils .content-skils-box"
);

const spanButtonSkilsFirst = document.querySelectorAll(".span-button-1");
const spanButtonSkilsSecond = document.querySelectorAll(".span-button-2");
const arrayContentSkils = Array.from(contentSkil);

const intFirstArray = arrayContentSkils[0].innerHTML;
const intSecondArray = arrayContentSkils[1].innerHTML;
const intThirdArray = arrayContentSkils[2].innerHTML;

function buttonClick(index) {
  const isFirstArray = intFirstArray;
  const isSecondArray = intSecondArray;
  const isThirdArray = intThirdArray;

  arrayContentSkils[1].style.display = "none";
  arrayContentSkils[2].style.display = "none";

  return function () {
    if (index == 1) {
      arrayContentSkils[0].innerHTML = isSecondArray;
      arrayContentSkils[1].innerHTML = isThirdArray;
      arrayContentSkils[2].innerHTML = isFirstArray;
    } else if (index == 2) {
      arrayContentSkils[0].innerHTML = isThirdArray;
      arrayContentSkils[1].innerHTML = isFirstArray;
      arrayContentSkils[2].innerHTML = isSecondArray;
    } else {
      arrayContentSkils[0].innerHTML = isFirstArray;
      arrayContentSkils[1].innerHTML = isSecondArray;
      arrayContentSkils[2].innerHTML = isThirdArray;
    }
  };
}

buttonSkils.forEach((e, i) => {
  const spanButton = document.querySelectorAll(".span-button-1");

  e.addEventListener("click", buttonClick(i));

  if (i == 0) {
    e.classList.add("active-span-button");
    spanButton.forEach((m, index) => {
      if (index === 0) {
        m.classList.add("span-button-set");
      }
    });
  }

  e.addEventListener("click", function () {
    buttonSkils.forEach((btn) => {
      btn.classList.remove("active-span-button");
      spanButton.forEach((m) => {
        m.classList.remove("span-button-set");
      });
    });

    spanButton[i].classList.add("span-button-set");
    e.classList.add("active-span-button");
  });
});

// Fungsi Button Experience End

// Project Object Start
// function myProject() {
//   const bodyProject = document.querySelector(".container-content-project");
//   let card = "";

//   const isContentProject = [
//     {
//       image: "Asset/Project-Image.png",
//       title: `Web Development`,
//       description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor,
//               aspernatur.Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor,
//               aspernatur`,
//       iconVisible: `Asset/visible.png`,
//       iconCode: `Asset/code.png`,
//     },
//     {
//       image: `Asset/Project-Image.png`,
//       title: `Javascript`,
//       description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor,
//               aspernatur.`,
//       iconVisible: `Asset/visible.png`,
//       iconCode: `Asset/code.png`,
//     },
//     {
//       image: `Asset/Project-Image.png`,
//       title: `UI UX`,
//       description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor,
//               aspernatur.`,
//       iconVisible: `Asset/visible.png`,
//       iconCode: `Asset/code.png`,
//     },
//     {
//       image: `Asset/Project-Image.png`,
//       title: `UI UX`,
//       description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor,
//               aspernatur.`,
//       iconVisible: `Asset/visible.png`,
//       iconCode: `Asset/code.png`,
//     },
//     {
//       image: `Asset/Project-Image.png`,
//       title: `UI UX`,
//       description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor,
//               aspernatur.`,
//       iconVisible: `Asset/visible.png`,
//       iconCode: `Asset/code.png`,
//     },
//     {
//       image: `Asset/Project-Image.png`,
//       title: `UI UX`,
//       description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor,
//               aspernatur.`,
//       iconVisible: `Asset/visible.png`,
//       iconCode: `Asset/code.png`,
//     },
//   ];

//   isContentProject.forEach((m) => {
//     card += showContentProject(m);
//     bodyProject.innerHTML = card;
//   });

//   function showContentProject(m) {
//     return ` <div class="container-box-project">
//             <div class="box-project">
//               <div class="project-link">
//                 <img src="${m.image}" id="isImgProject" class="img-project" alt="" />
//               </div>
//               <div class="content-project">
//                 <h1>${m.title}</h1>
//                 <span
//                   >${m.description}</span
//                 >
//                 <div class="icon-project-container">
//                   <div class="icon-project-box">
//                    <a href=""><img src="${m.iconVisible}" alt="" /></a>
//                   </div>
//                   <div class="icon-project-box">
//                     <a href=""><img src="${m.iconCode}" alt="" /></a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         `;
//   }

//   const thisContentProject = document.querySelectorAll(".content-project");
//   const imgProject = document.querySelectorAll(".img-project");

//   const imgMouseover = function () {
//     imgProject.forEach((img, index) => {
//       img.addEventListener("mouseover", function () {
//         thisContentProject.forEach((content, contentIndex) => {
//           const topValue = contentIndex === index ? 0 : "100%";
//           content.style.top = topValue;
//         });
//       });
//     });
//   };
//   imgMouseover();
// }
// myProject();
function project() {
  const boxMainImgProject = document.querySelector(".content-img-project");
  const visibleIcon = document.querySelector(".icon-visible-project");
  const mainImgProject = document.querySelector(".main-img-project");
  const visibleIconLink = document.querySelectorAll(".icon-visible-project a");
  const titleCurrentProject = document.querySelector(".box-content h1");
  const explanationBox = document.querySelector(".explanation-box p");
  const iconImgSoftware = document.querySelectorAll(".box-icon-project img");
  const loadingText = document.querySelector(".waiting-content h2");

  const spreadChar = [...loadingText.textContent]
    .map((text) => `<span class='span-waiting-text'>${text}</span>`)
    .join("");

  loadingText.innerHTML = spreadChar;
  const spanWaitingText = document.querySelectorAll(".span-waiting-text");

  function animateColors(index) {
    if (index < spanWaitingText.length) {
      setTimeout(() => {
        spanWaitingText[index].classList.add("active-color-loading");
        animateColors(index + 1);
      }, 200);
    } else {
      // Start the restoredColor function after a delay
      setTimeout(() => {
        restoredColor(spanWaitingText.length - 1);
      }, 200);
    }
  }

  function restoredColor(index) {
    if (index >= 0) {
      setTimeout(() => {
        spanWaitingText[index].style.color = "white";
        spanWaitingText[index].classList.remove("active-color-loading");

        restoredColor(index - 1);
      }, 200);
    } else {
      // Start the animateColors function after a delay
      setTimeout(() => {
        animateColors(0);
      }, 200);
    }
  }

  animateColors(0);

  boxMainImgProject.addEventListener("mouseover", function () {
    mainImgProject.classList.add("active-img-hover");
    visibleIcon.classList.add("active-icon-visible");
    if (loadingText.classList.contains("set-opacity-loading-text")) {
      loadingText.classList.remove("set-opacity-loading-text");
    }
  });

  boxMainImgProject.addEventListener("mouseout", function () {
    mainImgProject.classList.remove("active-img-hover");
    visibleIcon.classList.remove("active-icon-visible");
  });

  visibleIconLink.forEach((icon) => {
    if (visibleIcon.classList.contains("icon-visible-project")) {
      icon.addEventListener("mouseover", function () {
        this.classList.add("active-visible-icon-link");
      });

      icon.addEventListener("mouseout", function () {
        this.classList.remove("active-visible-icon-link");
      });
    }
  });

  // Another Project Slider Start

  // Another Project Slider End

  // Template Literals Another Project
  function anotherProject() {
    const containerSwiper = document.querySelector(".container-swiper");
    let card = "";

    function showContentAnotherProject(show) {
      return `<div class="swiper-box">
    <img src="${show.img}" alt="" />
    </div>`;
    }
    const showAnotherProject = [
      {
        title: `Web Development`,
        img: `Asset/Icon-Project.jpg`,
        explanation:
          "Proyek ini adalah pengembangan situs web dengan fokus pada antarmuka responsif dan pengalaman pengguna yang baik. ",
        iconImg1: `Asset/html-5.png`,
        iconImg2: `Asset/css-3.png`,
        iconImg3: `Asset/js.png`,
      },
      {
        title: `UI/UX`,
        img: `Asset/Project-Image.png`,
        explanation:
          "Proyek ini memfokuskan diri pada pengembangan situs web dengan dua aspek utama: antarmuka responsif dan pengalaman pengguna yang baik.",
        iconImg1: `Asset/html-5.png`,
        iconImg2: `Asset/css-3.png`,
        iconImg3: `Asset/js.png`,
      },
      {
        title: `Jankenpo`,
        img: `Asset/About Me.jpg`,
        explanation:
          "Proyek Jankenpo adalah implementasi digital dari permainan batu-gunting-kertas klasik. Dengan memanfaatkan gambar dan desain yang menarik, proyek ini menghadirkan pengalaman seru dalam versi digital.",
        iconImg1: `Asset/html-5.png`,
        iconImg2: `Asset/css-3.png`,
        iconImg3: `Asset/bootstrap.png`,
      },
      {
        title: `Online Shop`,
        img: `Asset/Project-Image.png`,
        explanation:
          "Proyek Online Shop merupakan platform e-commerce yang menawarkan pengalaman belanja online yang mudah dan efisien. Dengan desain antarmuka yang responsif, pengguna dapat menjelajahi katalog produk, menambahkannya ke keranjang, dan menyelesaikan pembelian secara nyaman. ",
        iconImg1: `Asset/html-5.png`,
        iconImg2: `Asset/css-3.png`,
        iconImg3: `Asset/java.png`,
      },
      {
        title: `Freemazon`,
        img: `Asset/Project-Image.png`,
        explanation:
          "Proyek Freemazon adalah platform e-commerce inovatif yang menawarkan pengalaman berbelanja online yang unik. Dengan antarmuka yang menarik dan responsif, Freemazon memudahkan pengguna untuk menjelajahi beragam produk, menambahkannya ke keranjang, dan menyelesaikan transaksi dengan cepat dan aman. ",
        iconImg1: `Asset/html-5.png`,
        iconImg2: `Asset/css-3.png`,
        iconImg3: `Asset/commit-git.png`,
      },
      {
        title: `Nilvalen`,
        img: `Asset/Project-Image.png`,
        explanation:
          "Proyek Nilvalen merupakan platform yang menghadirkan pengalaman unik dalam dunia virtual. Dengan desain antarmuka yang menawan, Nilvalen menyediakan ruang eksplorasi digital yang memungkinkan pengguna untuk berinteraksi, berbagi, dan menciptakan pengalaman pribadi. ",
        iconImg1: `Asset/html-5.png`,
        iconImg2: `Asset/bootstrap.png`,
        iconImg3: `Asset/js.png`,
      },
    ];

    function limitChar(text, maxChar) {
      if (text.length > maxChar) {
        return text.substring(0, maxChar) + "...";
      }
      return text;
    }

    showAnotherProject.forEach((exLength) => {
      const maxChar = 200;
      exLength.explanation = limitChar(exLength.explanation, maxChar);
    });
    showAnotherProject.forEach((show) => {
      card += showContentAnotherProject(show);
      containerSwiper.innerHTML = card;
    });

    // Slider
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");
    const swiperContainer = document.querySelectorAll(".swiper-box");
    const swiperBox = document.querySelectorAll(".swiper-box img ");
    const mainImageProject = document.querySelector(".main-img-project");

    function getTotalMargin(element) {
      const computedStyle = window.getComputedStyle(element);
      const marginLeft =
        parseFloat(computedStyle.getPropertyValue("margin-left")) || 0;
      const marginRight =
        parseFloat(computedStyle.getPropertyValue("margin-right")) || 0;

      return marginLeft + marginRight;
    }

    function getWidthImg(element) {
      const computedStyle = window.getComputedStyle(element);
      const imgWidth = parseFloat(computedStyle.getPropertyValue("width")) || 0;

      return imgWidth;
    }

    function updateTotalCount() {
      const targetElement = swiperContainer[0];
      const totalMargin = getTotalMargin(targetElement);
      const targetImg = swiperBox[0];
      const totalWidthImg = getWidthImg(targetImg);
      totalCount = totalMargin + totalWidthImg;
    }

    updateTotalCount();

    window.addEventListener("resize", function () {
      updateTotalCount();
      setLengthSwiperBox();
      if (this.window.innerWidth >= 576) {
        resetIfResize();
      }
    });
    function updateMainImg() {
      mainImageProject.classList.add("active-image-project");
      titleCurrentProject.classList.add("active-title-project");
      explanationBox.classList.add("active-explanation");
      iconImgSoftware.forEach((m) => {
        m.classList.add("active-icon");
      });
      setTimeout(() => {
        titleCurrentProject.innerHTML = showAnotherProject[currentIndex].title;
        mainImageProject.src = showAnotherProject[currentIndex].img;
        explanationBox.innerHTML = showAnotherProject[currentIndex].explanation;
        iconImgSoftware[0].src = showAnotherProject[currentIndex].iconImg1;
        iconImgSoftware[1].src = showAnotherProject[currentIndex].iconImg2;
        iconImgSoftware[2].src = showAnotherProject[currentIndex].iconImg3;
        iconImgSoftware.forEach((m) => {
          m.classList.remove("active-icon");
        });
        titleCurrentProject.classList.remove("active-title-project");
        mainImageProject.classList.remove("active-image-project");
        explanationBox.classList.remove("active-explanation");
      }, 500);
    }

    let currentTranslateX = 0;
    let currentTranslateXArrow = 0;
    let currentIndex = 0;
    let setSwiperBoxSize = 4;
    let setSwiperBoxSizeTwo = 3;

    function setLengthSwiperBox() {
      if (window.innerWidth <= 260) {
        setSwiperBoxSize = 2;
        setSwiperBoxSizeTwo = 1;
      } else if (window.innerWidth <= 360) {
        setSwiperBoxSize = 3;
        setSwiperBoxSizeTwo = 2;
      } else {
        setSwiperBoxSize = 4;
        setSwiperBoxSizeTwo = 3;
      }
    }

    swiperBox.forEach((icon, index) => {
      if (index == 0) {
        icon.classList.add("active-img-another-project");
        mainImageProject.src = `${showAnotherProject[0].img}`;
      }
      icon.addEventListener("click", function () {
        loadingText.classList.add("set-opacity-loading-text");
        if (!icon.classList.contains("active-img-another-project")) {
          swiperBox.forEach((deleteClass) => {
            deleteClass.classList.remove("active-img-another-project");
          });
          updateTotalCount();
          updateMainImg();
          setLengthSwiperBox();
        }

        this.classList.add("active-img-another-project");

        if (index <= swiperBox.length - setSwiperBoxSize) {
          let total = -totalCount;
          currentTranslateX = total * index;
          swiperContainer.forEach((setTranslateX) => {
            setTranslateX.style.transform = `translateX(${currentTranslateX}px)`;
          });
        } else {
          swiperContainer.forEach((deleteStyle) => {
            deleteStyle.style.transform = `translateX(${currentTranslateX})`;
          });
        }

        if (index == swiperBox.length - 3) {
          swiperContainer.forEach((setTranslateX) => {
            setTranslateX.style.transform = `translateX(${currentTranslateX}px)`;
          });
        }
        currentIndex = index;
      });
    });

    leftArrow.addEventListener("click", function () {
      loadingText.classList.add("set-opacity-loading-text");
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = swiperBox.length - 1;
      }
      swiperBox.forEach((deleteClass) => {
        deleteClass.classList.remove("active-img-another-project");
      });
      swiperBox[currentIndex].classList.add("active-img-another-project");

      if (currentIndex == swiperContainer.length - 1) {
        let isLastElement = swiperBox.length - setSwiperBoxSize;
        let c = -totalCount;
        swiperContainer.forEach((setTranslateX) => {
          setTranslateX.style.transform = `translateX(${isLastElement * c}px)`;
        });
      } else {
        swiperContainer.forEach((setTranslateX) => {
          let count = -totalCount;
          currentTranslateXArrow = (currentIndex - setSwiperBoxSizeTwo) * count;
          setTranslateX.style.transform = `translateX(${currentTranslateXArrow}px)`;
        });
      }

      if (currentIndex < setSwiperBoxSize) {
        swiperContainer.forEach((setTranslateX) => {
          setTranslateX.style.transform = "translateX(0px)";
        });
      }
      updateTotalCount();
      updateMainImg();
      setLengthSwiperBox();
    });
    //
    rightArrow.addEventListener("click", function () {
      loadingText.classList.add("set-opacity-loading-text");
      if (currentIndex < swiperBox.length - 1) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }

      swiperBox.forEach((deleteClass) => {
        deleteClass.classList.remove("active-img-another-project");
      });
      swiperBox[currentIndex].classList.add("active-img-another-project");

      if (currentIndex == swiperContainer.length - 1) {
        let isLastElement = swiperBox.length - setSwiperBoxSize;
        let c = -totalCount;
        swiperContainer.forEach((setTranslateX) => {
          setTranslateX.style.transform = `translateX(${isLastElement * c}px)`;
        });
      } else {
        swiperContainer.forEach((setTranslateX) => {
          let count = -totalCount;
          currentTranslateXArrow = (currentIndex - setSwiperBoxSizeTwo) * count;
          setTranslateX.style.transform = `translateX(${currentTranslateXArrow}px)`;
        });
      }

      if (currentIndex < setSwiperBoxSize) {
        swiperContainer.forEach((setTranslateX) => {
          setTranslateX.style.transform = "translateX(0px)";
        });
      }
      updateMainImg();
      updateTotalCount();
      setLengthSwiperBox();
    });
    function resetIfResize() {
      currentIndex = 0;
      swiperBox.forEach((deleteClass) => {
        deleteClass.classList.remove("active-img-another-project");
      });
      swiperContainer.forEach((setTranslateX) => {
        setTranslateX.style.transform = `${currentTranslateX}px`;
      });
      updateMainImg();
      mainImageProject.classList.remove("active-image-project");
      swiperBox[currentIndex].classList.add("active-img-another-project");
    }
  }
  anotherProject();
}
project();
// Another Project Slider End
// Cek Contact
// const buttonSend = document.querySelector(".input-field button");
// const inputBox = document.querySelectorAll(".input-field input");
// const inputLabel = document.querySelectorAll(".input-field span");

// const contentError = [
//   { content: `Email Cannot be Empty` },
//   { content: `Subject Cannot be Empty` },
//   { content: `Message Cannot be Empty` },
// ];

// function clearError(index) {
//   inputLabel[index].textContent = "";
// }

// function showErrorText(showError) {
//   return showError.content;
// }

// inputBox.forEach((input, index) => {
//   input.addEventListener("input", function () {
//     if (input.value.trim() !== "") {
//       clearError(index);
//     }
//   });
// });

// buttonSend.addEventListener("click", function (event) {
//   inputLabel.forEach((label) => (label.textContent = ""));

//   inputBox.forEach((m, index) => {
//     if (m.value.trim() === "") {
//       const showError = contentError[index];
//       const textError = showErrorText(showError);
//       inputLabel[index].textContent = textError;
//     }
//   });

//   if (Array.from(inputLabel).some((label) => label.textContent !== "")) {
//     event.preventDefault();
//   }
// });
const form = document.querySelector("form-mail");
const textInput = document.querySelectorAll(".text-input");
const message = document.querySelector("#messages");
const successInfo = document.querySelector("#success");
const errorNodes = document.querySelectorAll(".error");
const sendMessageButton = document.querySelector(".send-messages");

function focusOnName() {
  textInput[0].focus();
}
const contentErrorText = [
  { content: `Name Cannot be Empty` },
  { content: `Email Cannot be Empty` },
  { content: `Please enter Messages` },
];

function sendEmail() {
  const bodyMessage = `Name : ${textInput[0].value}<br> Email : ${textInput[1].value}<br> Message : ${message.value}`;
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "rizqisabilla1@gmail.com",
    Password: "2DC90362FBE5B9FABAFE639C7BE654404A29",
    To: "rizqisabilla1@gmail.com",
    Subject: `Email From Portfolio`,
    From: `rizqisabilla1@gmail.com`,
    Body: bodyMessage,
  }).then((message) => message);
}

function showErrorText(showError) {
  return showError.content;
}

function showInvalidText(showErrorInvalid) {
  return showErrorInvalid.content;
}

function clearErrorText(index) {
  errorNodes[index].textContent = "";
}
function isValidEmail(email) {
  const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegEx.test(email);
}

textInput.forEach((input, index) => {
  input.addEventListener("input", function () {
    if (input.value.trim() !== "") {
      clearErrorText(index);
      textInput[index].classList.remove("error-border");
    }
  });
});

sendMessageButton.addEventListener("click", function (event) {
  let errorFlag = false;
  event.preventDefault();
  textInput.forEach((m, index) => {
    if (m.value.trim() === "") {
      m.classList.add("error-border");
      const showError = contentErrorText[index];
      const textError = showErrorText(showError);
      errorNodes[index].textContent = textError;
      errorFlag = true;
    } else if (index === 0 && /[^a-zA-Z\s]/.test(m.value)) {
      // Validasi simbol untuk nama (hanya huruf dan spasi diperbolehkan)
      m.classList.add("error-border");

      errorNodes[
        index
      ].textContent = `Name should only contain letters and spaces.`;
      errorFlag = true;
    } else if (index === 1 && !isValidEmail(m.value)) {
      // Validasi alamat email
      m.classList.add("error-border");
      errorNodes[index].textContent = "Invalid Email Address";
      errorFlag = true;
    } else {
      clearErrorText(index);
      textInput[index].classList.remove("error-border");
    }
  });
  if (!errorFlag) {
    successInfo.innerHTML = "Succes";
    sendMessageButton.classList.add("success-send");
    sendEmail();
  } else {
    sendMessageButton.classList.remove("success-send");
    successInfo.innerHTML = "";
  }
});
