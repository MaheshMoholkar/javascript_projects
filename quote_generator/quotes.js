const quotecontainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");


let quotes = [];

console.log(authorText)
console.log(quoteText)

function showQuote() {
    let index = Math.floor(Math.random() * Math.floor(quotes.length));
    const quote = quotes[index];

    if (quote.author == "type.fit") {
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author.replace(", type.fit", "");
    }

    if (quote.text.length > 50 ) {
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-quote");
    }

    quoteText.textContent = quote.text;
}

async function getQuotes() {
    const apiUrl = "http://type.fit/api/quotes";
    const response = await fetch(apiUrl);
    quotes = await response.json();
    showQuote();
}

function tweetQuote() {
    const twitterUrl = `http://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

newQuoteBtn.addEventListener('click', showQuote);
twitterBtn.addEventListener('click', tweetQuote)

getQuotes();

