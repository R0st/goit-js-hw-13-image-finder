// import './sass/main.scss';
import ApiService from '../src/js/apiService';
import galleryImagesTmp from '../src/templates/galleryImagesTmp.hbs';
import './style.css';
import LoadMoreBtn from './js/load-more-btn';

// https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=
const refs = {
  searchInput: document.querySelector('.search-form'),
  imageContainer: document.querySelector('.js-container-hits'),
  // loadMoreBtn: document.querySelector('[data-action="load-more"]'),
  // element: document.getElementById('.photo-card'),
}

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const apiService = new ApiService();

console.log(loadMoreBtn);



refs.searchInput.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', showHiddenBtnLoadMore);

function onSearch(event) {
  event.preventDefault();

  apiService.query = event.currentTarget.elements.query.value;
  
  if (apiService.query === '') {
    return alert('Input correct name');
  }

  loadMoreBtn.show();
  apiService.resetPage();
  clearHitsMarkup();
  showHiddenBtnLoadMore();
  
}

function showHiddenBtnLoadMore() {
  loadMoreBtn.disable();
  apiService.fetchHits().then(hits => {
    appendHitsMarkup(hits);
    loadMoreBtn.enable();
  });
}
function appendHitsMarkup(hits) {
  refs.imageContainer.insertAdjacentHTML('beforebegin', galleryImagesTmp(hits));
}

function clearHitsMarkup() {
  refs.imageContainer.innerHTML = '';
}

// refs.element.scrollIntoView({
//   behavior: 'smooth',
//   block: 'end',
// });


