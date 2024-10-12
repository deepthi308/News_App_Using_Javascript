const API_KEY = "723b8710f2ce47d7a7890a023c42efa2";

const API_URL = `https://newsapi.org/v2/top-headlines?q=tech&apiKey=${API_KEY}`;

const API_URL_Q = `https://newsapi.org/v2/everything?apiKey=${API_KEY}&q=`;

// Getting the elements reference with the help of DOM
let mainEl = document.getElementById("hero");
let searchInputEl = document.getElementById("search-input");
let searchButtonEl = document.getElementById("search-button");

async function fetchRandomNews(apiUrl) {
  try {
    let response = await fetch(apiUrl);
    let data = await response.json();
    setTimeout(() => {}, 5000);
    return data.articles;
  } catch (error) {
    return [];
  }
}

function displayNews(articles) {
  // Clearing the previous search results
  mainEl.innerHTML = "";
  articles = articles.filter((article) => {
    return (
      !article.title.toLowerCase().includes("removed") &&
      article.urlToImage !== null
    );
  });
  articles.forEach((article) => {
    let newsCard = `<article class="news-container">
        <section class="news-top">
          <img
            src=${article.urlToImage}
            alt=${article.title}
          />
        </section>
        <section class="news-bottom">
          <h3 class="news-title">${article.title.slice(0, 26) + "..."}</h3>
          <p class="news-description">
            ${article.description}
          </p>
          <footer class="article-footer">
          <small class="author">${
            article.author === null ? "Unknown" : article.author
          }</small>
            <br />
            <button class="readmore" id="readmore">Read More</button>
        </section></footer>
      </article>`;
    mainEl.innerHTML += newsCard;
  });
}

(async () => {
  try {
    const articles = await fetchRandomNews(API_URL);
    console.log(articles);
    displayNews(articles);
  } catch (error) {
    console.log("Error while fetching random news");
  }
})();

const fetchNewsQuery = async (query) => {
  try {
    const API_URL = `${API_URL_Q}${query}`;
    let response = await fetch(API_URL);
    let data = await response.json();
    return data.articles;
  } catch (error) {
    return [];
  }
};

// This function will be trigger on click of the seach button
const handleSearch = async () => {
  const searchQuery = searchInputEl.value;
  if (searchQuery) {
    searchInputEl.value = "";
    try {
      const articles = await fetchNewsQuery(searchQuery);
      displayNews(articles);
    } catch (error) {
      console.log("Error occured while fetching news by query");
    }
  }
};

// Attaching event handler to search button\
searchButtonEl.addEventListener("click", handleSearch);
