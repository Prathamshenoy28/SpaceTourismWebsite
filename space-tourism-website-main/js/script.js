jQuery(document).ready(function ($) {
  const currentUrl = window.location.href;
  const header = document.querySelector(".header");

  header.innerHTML = `
    <div class="container">
        <img class="header__icon menu-icon" src="./assets/shared/icon-hamburger.svg" alt="Menu Icon">
        <nav class="header__menu">
            <img class="header__icon--close menu-icon" src="./assets/shared/icon-close.svg" alt="">
            <ul class="header__menu__list">
                <li class="header__menu__list__item ${
                  currentUrl.indexOf("index") !== -1 ? "active" : ""
                }"><a href="./index.html">Home</a></li>
                <li class="header__menu__list__item ${
                  currentUrl.indexOf("destination") !== -1 ? "active" : ""
                }"><a href="./destination.html">Destination</a></li>
                <li class="header__menu__list__item ${
                  currentUrl.indexOf("crew") !== -1 ? "active" : ""
                }"><a href="./crew.html">Crew</a></li>
                <li class="header__menu__list__item ${
                  currentUrl.indexOf("technology") !== -1 ? "active" : ""
                }"><a href="./technology.html">Technology</a></li>
            </ul>
        </nav>
    </div>`;

  class MobileNavBar {
    constructor(mobileMenu, navList) {
      this.mobileMenu = document.querySelectorAll(mobileMenu);
      this.navList = document.querySelector(navList);
      this.activeClass = "active";
      this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
      this.navList.classList.toggle(this.activeClass);
    }
    addClickEvent() {
      this.mobileMenu.forEach((item) => {
        item.addEventListener("click", this.handleClick);
      });
    }
    init() {
      if (this.mobileMenu) {
        this.addClickEvent();
      }
      return this;
    }
  }

  const mobileNavBar = new MobileNavBar(".menu-icon", ".header__menu");

  mobileNavBar.init();
});
