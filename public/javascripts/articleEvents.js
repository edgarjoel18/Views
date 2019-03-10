function showView(event) {
  view.removeAttribute('hidden');
  event.preventDefault();
}

function hideView(event) {
  view.setAttribute('hidden', '');
}

const container = document.querySelector('.container');
const view = document.querySelector('.article-title');
