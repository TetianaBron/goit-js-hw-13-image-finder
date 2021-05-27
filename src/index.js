import './styles.scss';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';

import NewsApiService from './js/apiService';

import photoCardTpl from '../templates/photo-card.hbs';
import openModal from './js/openModal';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error, info } from '@pnotify/core';

import getRefs from './js/getRefs';

const refs = getRefs();
const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', searchImages);

let flag = false;

function searchImages(e) {
  flag = false;
  e.preventDefault();
  newsApiService.query = e.currentTarget.elements.query.value;

  if (newsApiService.query === '') {
    return error({
                text: 'Enter something',
            });
  }

    newsApiService.resetPage();
     clearImagesContainer();
  newsApiService.fetchImages().then(images => {
    appendImagesMarkup(images);
     newsApiService.incrementPage();
  });
}

function appendImagesMarkup(images) {
  refs.gallery.insertAdjacentHTML('beforeend', photoCardTpl(images));
}

function clearImagesContainer() {
  refs.gallery.innerHTML = '';
}

const onEntry = entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && newsApiService.query && flag) {
            newsApiService.fetchImages().then(images => {
                appendImagesMarkup(images);
                newsApiService.incrementPage();
            });
        }
    });
  flag = true;
};


const observer = new IntersectionObserver(onEntry, {
    rootMargin: '500px',
});
observer.observe(refs.sentinel);

