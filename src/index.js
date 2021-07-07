import './sass/main.scss';

import imegesList from './tpl/imegesList.hbs';
import { searchImages } from './apiService';
import LoadMoreBtn from './load-more-btn';

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
let page = 1;

const formRef = document.querySelector('#search-form');
const inputRef = formRef.querySelector('input');
const imegesListRef = document.querySelector('.gallery');

let value = null;

function sendDataHandler(event) {
  event.preventDefault();
  value = inputRef.value;

  if (!value) return;
  page = 1;
  loadMoreBtn.show();
  searchImages(value, page).then(data => {
    imegesListRef.insertAdjacentHTML('beforeend', imegesList(data.hits));
    loadMoreBtn.enable();
  });
}

formRef.addEventListener('submit', sendDataHandler);
document.querySelector('.btn').addEventListener('click', e => {
  page += 1;
  searchImages(value, page).then(data => {
    imegesListRef.insertAdjacentHTML('beforeend', imegesList(data.hits));
    loadMoreBtn.enable();
  });
});
