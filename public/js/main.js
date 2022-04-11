const header = document.getElementById('site-header');
var offset = header.offsetTop;

window.onscroll = function () {
  if (window.pageYOffset > offset) { header.classList.add('sticky'); }
  else { header.classList.remove('sticky'); }
}