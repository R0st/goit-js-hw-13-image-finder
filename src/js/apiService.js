
export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    fetchHits() {
        const BASE_URL = 'https://pixabay.com/api/';
        const API_KEY = '21793767-b218360da72fb262d25a858fe';
        const PER_PAGE = 12;
    
        return fetch(`${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=
                      ${this.page}&per_page=${PER_PAGE}&key=${API_KEY}`)
            .then(response => response.json())
            .then(({hits}) => {
                this.incrementPage();
                return hits;   //вернули промис
            })
            .catch(error => {
            console.log(error);
        });
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