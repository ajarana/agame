(function showMenu() {
  var mobileButton = document.getElementById("mobileButton");
  var html = document.getElementsByTagName("html");
  var headerMenu = document.getElementById("headerMenu");

  var minMenuHeight = '470';


  mobileButton.onclick = function() {
    headerMenu.classList.add("transitionEverything");

    if (html[0].classList.contains("expanded")) {
      html[0].classList.remove("expanded", "staticHeight");
    }
    else if (window.innerHeight < minMenuHeight) {
      html[0].classList.add("expanded", "staticHeight");
    } else {
      html[0].classList.add("expanded");
    }
  }

  window.addEventListener("resize", function() {
    headerMenu.classList.remove("transitionEverything");

    if (window.innerHeight < minMenuHeight) {
      html[0].classList.add("staticHeight");
    } else {
      html[0].classList.remove("staticHeight");
    }
  }, false);
})();
