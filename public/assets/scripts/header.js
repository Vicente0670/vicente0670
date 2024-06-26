var menu = document.getElementById("menu");
var menuButton = document.getElementById("menu-button");
menuButton.addEventListener("click", toggleMenu);
var isMenuOpen = false;

function toggleMenu() {
  if (isMenuOpen === true) {
    menu.style.transform = "translate(-100%, 0)";
    isMenuOpen = false;
    return;
  }
  if (isMenuOpen === false) {
    menu.style.transform = "translate(0)";
    isMenuOpen = true;
    return;
  }
}