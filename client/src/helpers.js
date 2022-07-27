function switchBackground (hasBackground) {
  if (hasBackground) {
    document.body.classList.remove('remove-background');
  } else {
    document.body.classList.add('remove-background');
  }
}

function openSidebar() {
  document.body.classList.toggle('open-sidebar');
}

function closeSidebar() {
  document.body.classList.remove('open-sidebar');
}

function toggleNav() {
  document.body.classList.toggle('open-nav');
}

function closeNav() {
  document.body.classList.remove('open-nav');
}

function checkWindowSize() {
  if (window.innerWidth >= 750) {
    closeNav();
  }
}

function setActive(page) {
  document.querySelector('.active').classList.remove('active');
  document.querySelector(`.${page}`).classList.add('active');
}

export { switchBackground, closeSidebar, openSidebar, toggleNav, closeNav, checkWindowSize, setActive };