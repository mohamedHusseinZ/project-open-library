
let books = [];

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
      console.log(data);
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

// Function to push data into the books array
async function pushDataToBooks(apiUrl) {
  try {
    const data = await fetchData(apiUrl);
    if (data) {
      books.push(...data.docs);
      console.log(data);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Fetch data from the APIs and push it to the books array
async function fetchAndPushAllData() {
  await pushDataToBooks(searchUrl);
  await pushDataToBooks(titleSearchUrl);
  await pushDataToBooks(authorSearchUrl);
  await pushDataToBooks(paginationUrl);
  await pushDataToBooks(authorsUrl);
}

// Display books on the web page
// function displayBooks() {
//   const bookslist = document.getElementById("bookslist");
//   bookslist.innerHTML = ''; // Clear the existing content

//   books.forEach(book => {
//     const div = document.createElement("div");
//     const titleElement = document.createElement("h2");
//     titleElement.textContent = book.title;
//     const authorElement = document.createElement("p");
//     authorElement.textContent = `Author: ${book.author_name.join(', ')}`;

//     div.appendChild(titleElement);
//     div.appendChild(authorElement);
//     bookslist.appendChild(div);
//   });
// }
function displayBooks() {
  const bookslist = document.getElementById("bookslist");
  bookslist.innerHTML = ''; // Clear the existing content

  books.forEach(book => {
    const div = document.createElement("div");
    const titleElement = document.createElement("h2");
    titleElement.textContent = book.title;

    // Create an image element for the cover photo
    const coverElement = document.createElement("img");
    if (book.cover_i) {
      // If a cover image is available (cover_i field exists in the API response)
      const coverImageUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
      coverElement.src = coverImageUrl;
    } else {
      // Use a default image or placeholder if a cover image is not available
      coverElement.src = 'default-cover-image.jpg';
    }

    const authorElement = document.createElement("p");
    authorElement.textContent = `Author: ${book.author_name.join(', ')}`;

    div.appendChild(titleElement);
    div.appendChild(coverElement);
    div.appendChild(authorElement);

    bookslist.appendChild(div);
  });
}



// Fetch data, push it to the books array, and then display the books
fetchAndPushAllData()
  .then(() => {
    console.log('All data fetched and pushed to the books array');
    displayBooks();
  });
