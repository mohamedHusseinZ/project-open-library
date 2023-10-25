

let books = [

]
// Define the API endpoint URLs
const baseUrl = 'https://openlibrary.org';

const searchUrl = '/search.json?q=the+lord+of+the+rings';
const titleSearchUrl = '/search.json?title=the+lord+of+the+rings';
const authorSearchUrl = '/search.json?author=tolkien&sort=new';
const paginationUrl = '/search.json?q=the+lord+of+the+rings&page=2';
const authorsUrl = '/search/authors.json?q=twain';

// Function to fetch data from the API
async function fetchData(apiUrl) {
  const fullUrl = baseUrl + apiUrl;

  try {
    const response = await fetch(fullUrl);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error(`Failed to fetch data. Status code: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return null;
  }
}

// Fetch data from the APIs
fetchData(searchUrl)
  .then(searchResults => {
    console.log('Search Results:', searchResults);
  });

fetchData(titleSearchUrl)
  .then(titleSearchResults => {
    console.log('Title Search Results:', titleSearchResults);
  });

fetchData(authorSearchUrl)
  .then(authorSearchResults => {
    console.log('Author Search Results:', authorSearchResults);
  });

fetchData(paginationUrl)
  .then(paginationResults => {
    console.log('Pagination Results:', paginationResults);
  });

fetchData(authorsUrl)
  .then(authorsResults => {
    console.log('Authors Search Results:', authorsResults);
  });
