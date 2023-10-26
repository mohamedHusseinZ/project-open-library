
let books = [];

// Define the API endpoint URLs
const baseUrl = 'https://openlibrary.org';

const searchUrl = '/search.json?q=the+lord+of+the+rings';
const titleSearchUrl = '/search.json?title=the+lord+of+the+rings';
const authorSearchUrl = '/search.json?author=tolkien&sort=new';
const authorsUrl = '/search/authors.json?q=twain';

// Function to fetch data from the API
async function fetchData(apiUrl) {
  const fullUrl = baseUrl + apiUrl;

  try {
    const response = await fetch(fullUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status code: ${response.status}`);
    }
    const data = await response.json();
    return data;
    
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
      console.log(`Fetched data from: ${apiUrl}`);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Fetch data from the APIs and push it to the books array
async function fetchAndPushAllData() {
  const apiUrls = [searchUrl, titleSearchUrl, authorSearchUrl, authorsUrl];

  for (const apiUrl of apiUrls) {
    await pushDataToBooks(apiUrl);
  }

  console.log('All data fetched and pushed to the books array');
  displayBooks(); // Call a function to display the books or process them as needed
}

fetchAndPushAllData();


function displayBooks() {
  const bookslist = document.getElementById("bookslist");
  bookslist.innerHTML = ''; 

  books.forEach(book => {
    // Create a div to represent a card
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card"); // Add CSS class for styling

    // Create an image element for the cover photo
    const coverElement = document.createElement("img");
    coverElement.classList.add("card-img-top"); // Add CSS class for styling
    if (book.cover_i) {
      const coverImageUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
      coverElement.src = coverImageUrl;
    } else {
      coverElement.src = 'default-cover-image.jpg'; // Use a default image or placeholder
    }
    cardDiv.appendChild(coverElement);

    // Create a div for the card body
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body"); // Add CSS class for styling

    // Create a title element
    const titleElement = document.createElement("h5");
    titleElement.classList.add("card-title"); // Add CSS class for styling
    titleElement.textContent = book.title;
    cardBody.appendChild(titleElement);

    // Create an author element
    const authorElement = document.createElement("p");
    authorElement.classList.add("card-text"); 
    // add class for css styling
    authorElement.textContent = `Author: ${book.author_name.join(', ')}`;
    cardBody.appendChild(authorElement);

    // Create a "Download" button
    const downloadBtn = document.createElement("button");
    downloadBtn.classList.add("btn", "btn-primary"); 
    downloadBtn.textContent = "borrow";

    // Add a click event listener to the "Download" button
    downloadBtn.addEventListener("click", () => {
      
      alert(`borrow book: ${book.title}`);
    });
    const likeBtn = document.createElement("button");
    likeBtn.classList.add("btn", "btn-success"); 
    likeBtn.textContent = "Like";

    // Add a click event listener to the "Like" button
    likeBtn.addEventListener("like", () => {
      // Add your custom "Like" logic here
      alert(`Liked book: ${book.title}`);
    });
     // Create a comment area
     const commentInput = document.createElement("textarea");
     commentInput.classList.add("form-control"); // Add Bootstrap class for styling
     commentInput.placeholder = "Add your comment...";
     cardBody.appendChild(commentInput);
 
     // Create a submit button for comments
     const submitCommentBtn = document.createElement("button");
     submitCommentBtn.classList.add("btn", "btn-primary");
     submitCommentBtn.textContent = "Submit Comment";
     submitCommentBtn.addEventListener("submit", () => {
       const commentText = commentInput.value;
       alert(`Submitted comment: "${commentText}" for book: ${book.title}`);
       // You can handle the comment submission here
     });
     cardBody.appendChild(submitCommentBtn);

    cardBody.appendChild(downloadBtn);

    cardDiv.appendChild(cardBody);
    cardBody.appendChild(likeBtn);

    bookslist.appendChild(cardDiv);
  });
}


document.getElementById("feedbackForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the form from submitting
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  
  console.log("Name: " + name);
  console.log("Email: " + email);
  console.log("Feedback: " + message);

  
});



// Fetch data, push it to the books array, and then display the books
fetchAndPushAllData()
  .then(() => {
    console.log('All data fetched and pushed to the books array');
    displayBooks();
  });
