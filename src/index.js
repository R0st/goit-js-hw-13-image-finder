// import './sass/main.scss';
import ApiService from '../src/js/apiService';
import galleryImagesTmp from '../src/templates/galleryImagesTmp.hbs';
import './style.css';

// https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=
const refs = {
  searchInput: document.querySelector('.js-form'),
  imageContainer: document.querySelector('.js-container'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
}

const apiService = new ApiService();
refs.searchInput.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(event) {
  event.preventDefault();
  apiService.query = event.currentTarget.elements.query.value;
  apiService.resetPage();
  apiService.fetchHits().then(appendHitsMarkup);
}

function onLoadMore() {
  apiService.fetchHits().then(appendHitsMarkup);
}

function appendHitsMarkup(hits) {
  refs.imageContainer.insertAdjacentHTML('beforebegin', galleryImagesTmp(hits));
}


// const element = document.getElementById('.my-element-selector');
// element.scrollIntoView({
//   behavior: 'smooth',
//   block: 'end',
// });


