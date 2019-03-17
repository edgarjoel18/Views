function showView(event) {
  view.removeAttribute('hidden');
  event.preventDefault();
}

function hideView(event) {
  view.setAttribute('hidden', '');
}
$(function () {
  $('[data-toggle="popover"]').popover()
})

const container = document.querySelector('.container');
const view = document.querySelector('.article-title');
