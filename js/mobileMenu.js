(function showMenu() {
  var mobileButton = document.getElementById("mobileButton");
  var html = document.getElementsByTagName("html");
  var headerMenu = document.getElementById("headerMenu");

  mobileButton.onclick = function() {

    if (html[0].classList.contains("expanded")) {
      headerMenu.classList.add("transitionCollapse");
      headerMenu.classList.remove("transitionExpand");
      html[0].classList.remove("expanded");
    }
    else {
      headerMenu.classList.add("transitionExpand");
      headerMenu.classList.remove("transitionCollapse");
      html[0].classList.add("expanded");
      console.log("transitionExpand should be added.");
    }
  }

  window.addEventListener("resize", function() {
    headerMenu.classList.remove("transitionExpand");
    headerMenu.classList.remove("transitionCollapse");

    if (window.innerWidth >= 768) {
      html[0].classList.remove("expanded");
    }
  }, false);
})();
