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
                <li class="header__menu__list__item ${
                  currentUrl.indexOf("booking") !== -1 ? "active" : ""
                }"><a href="./booking.php">Booking</a></li>
            </ul>
        </nav>
    </div>`;

  // Function to update navigation menu based on login status
  function updateNavigationMenu(isLoggedIn) {
    const navList = $(".header__menu__list");

    // Remove existing login, register, and logout links
    navList.find(".login-link, .register-link, .logout-link").remove();

    // If user is logged in, display logout link
    if (isLoggedIn) {
      navList.append(`
      <li class="header__menu__list__item logout-link"><a href="./logout.php">Logout</a></li>
    `);
    } else {
      // If user is not logged in, display login and register links
      navList.append(`
      <li class="header__menu__list__item login-link"><a href="./login.html">Login</a></li>
      <li class="header__menu__list__item register-link"><a href="./register.html">Register</a></li>
    `);
    }
  }

  // Function to check login status
  function checkLoginStatus() {
    $.ajax({
      url: "check_login.php",
      type: "GET",
      dataType: "json",
      success: function (response) {
        const isLoggedIn = response.isLoggedIn;

        console.log("Is user logged in?", isLoggedIn); // Log whether the user is logged in

        // Update navigation menu based on login status
        updateNavigationMenu(isLoggedIn);
      },
      error: function (xhr, status, error) {
        console.error("Error checking login status:", error);
      },
    });
  }

  // Call the checkLoginStatus function to update navigation menu when the page loads
  checkLoginStatus();

  $.getJSON("./data.json", function (data) {
    const destinations = data.destinations;

    const selectElement = $("#destination");
    destinations.forEach((destination) => {
      selectElement.append(
        `<option value="${destination.name}">${destination.name} (${destination.cost})</option>`
      );
    });

    function calculateCost() {
      const selectedOption = selectElement.find(":selected");
      const costString = selectedOption
        .text()
        .match(/\$\d{1,3}(?:,\d{3})*(?:\.\d{2})?/);

      // Check if costString is not null
      if (costString && costString[0]) {
        let cost = parseFloat(costString[0].substring(1).replace(/,/g, ""));

        const destinationName = selectedOption.val();

        cost *= 1.2;

        cost = Math.round(cost * 100) / 100;

        const formattedCost =
          "$" + cost.toLocaleString(undefined, { minimumFractionDigits: 2 });
        $("#cost").val(formattedCost);
      } else {
        console.error("Cost string is null or undefined.");
      }
    }

    calculateCost();

    selectElement.on("change", calculateCost);
  });

  // Function to clear the form fields after successful submission
  function clearFormFields() {
    $("#name").val("");
    $("#email").val("");
    $("#number").val("");
    $("#destination").val("");
    $("#cost").val("");
  }

  // Function to validate the form inputs
  function validateForm() {
    const name = $("#name").val();
    const email = $("#email").val();
    const number = $("#number").val();

    // Validate name
    if (!/^[a-zA-Z\s]*$/.test(name)) {
      $("#nameError").text("Please enter a valid name.");
      return false;
    } else {
      $("#nameError").text("");
    }

    // Validate email
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      $("#emailError").text("Please enter a valid email address.");
      return false;
    } else {
      $("#emailError").text("");
    }

    // Validate number
    if (!/^\d{10}$/.test(number)) {
      $("#numberError").text("Please enter a 10-digit number.");
      return false;
    } else {
      $("#numberError").text("");
    }

    return true;
  }

  // Submit form
  $("#bookingForm").submit(function (event) {
    event.preventDefault(); // Prevent default form submission

    // Validate form
    if (validateForm()) {
      // Display success message
      $("#formSuccess").text("Form submitted successfully.");

      // Clear form fields
      clearFormFields();
    }
  });

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
