import './sass/main.scss';

import imagesList from './tpl/imagesList.hbs';
import { searchImages } from './apiService';
import LoadBtn from './load-btn';

const loadMoreBtn = new LoadBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
let page = 1;

const formRef = document.querySelector('#search-form');
const inputRef = formRef.querySelector('input');
const imagesListRef = document.querySelector('.gallery');

let value = null;

function sendDataHandler(event) {
  event.preventDefault();
  value = inputRef.value;
  imagesListRef.innerHTML = '';
  if (!value) return;
  page = 1;
  loadMoreBtn.show();
  searchImages(value, page).then(data => {
    imagesListRef.insertAdjacentHTML('beforeend', imagesList(data.hits));
    loadMoreBtn.enable();
  });
}

formRef.addEventListener('submit', sendDataHandler);
document.querySelector('.btn').addEventListener('click', e => {
  page += 1;
  searchImages(value, page).then(data => {
    imagesListRef.insertAdjacentHTML('beforeend', imagesList(data.hits));
    loadMoreBtn.enable();
  });
});
