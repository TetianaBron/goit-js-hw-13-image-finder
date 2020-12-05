import './styles.scss';

import {fetchImages, page} from './js/apiService';
import photoCardTpl from '../templates/photo-card.hbs';

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { info } from '@pnotify/core';


import getRefs from './js/getRefs';
const refs = getRefs();

const debounce = require('lodash.debounce');

refs.searchInput.addEventListener(
    'input',
    debounce(() => {
        searchImages(true);
    }, 1000)
);
 
function searchImages(isReset) { 
    fetchImages(refs.searchInput.value)
        .then(data => renderImagesList(data.hits, isReset, data.totalHits))
        .catch(error => console.log(error));
}

function renderImagesList(images, isReset, total) {
    const markup = photoCardTpl(images);
    if (isReset) {
        refs.gallery.innerHTML = markup;
        info({
            text: `There are ${total} pictures found!`,
            type: 'info'
        })
    }
    else {
        refs.gallery.innerHTML += markup;
        
    };
}

const onEntry = entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && refs.searchInput.value !== '') {
            searchImages();
        }
    });
};


const observer = new IntersectionObserver(onEntry, {
    rootMargin: '500px',
});
observer.observe(refs.sentinel);

