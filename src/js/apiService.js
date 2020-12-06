const BASE_URL = 'https://pixabay.com/api';
const KEY = '19207978-b8cc5d5178f1c84e5ac39b1c7';

// let numberOfpage, prevQuery;


// function page() {
//     return numberOfpage + 1;
// }
 
// function fetchImages(searchQuery) { 
//     if (searchQuery !== prevQuery) numberOfpage = 0;
//     prevQuery = searchQuery;
//     numberOfpage++;
//     return fetch(`${BASE_URL}/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${numberOfpage}&per_page=${perPage}&key=${KEY}`)
//         .then(response => {
//             return response.json();
//         })
//         .catch(error => console.log(error));
// }

// export { fetchImages, page };

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 12;
    }
    
    fetchImages() {
        
        const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.numberOfpage}&per_page=${this.perPage}&key=${KEY}`;

        return fetch(url)
            .then(response => response.json())
            .then(({ hits }) => hits);
    }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}