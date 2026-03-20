const headerNav = document.querySelector(".headerNav ul");
const toggleMenu = document.querySelector(".toggleMenu");
const backDrop = document.querySelector(".transparent");

toggleMenu.addEventListener("click", () => {
  toggleMenu.classList.toggle("open");
  headerNav.classList.toggle("open");
  backDrop.classList.toggle("open");
});
