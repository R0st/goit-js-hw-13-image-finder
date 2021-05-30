
import ApiService from '../src/js/apiService';
import galleryImagesTmp from '../src/templates/galleryImagesTmp.hbs';
import './style.css';
import LoadMoreBtn from './js/load-more-btn';

const refs = {
  searchInput: document.querySelector('.search-form'),
  imageContainer: document.querySelector('.js-container-hits'),
}

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const apiService = new ApiService();

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
  refs.imageContainer.insertAdjacentHTML('beforeend', galleryImagesTmp(hits));
}

function clearHitsMarkup() {
  refs.imageContainer.innerHTML = '';
}

// refs.element.scrollIntoView({
//   behavior: 'smooth',
//   block: 'end',
// });


