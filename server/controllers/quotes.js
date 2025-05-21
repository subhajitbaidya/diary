let cachedQuotes = [];

async function fetchQuotesAndCache() {
  try {
    const response = await fetch("https://zenquotes.io/api/quotes/");
    const data = await response.json();
    cachedQuotes = data;
  } catch (error) {
    console.error("Failed to fetch quotes:", error);
  }
}

// will cause delays on server restart if not called
fetchQuotesAndCache();

setInterval(fetchQuotesAndCache, 3600000);

async function getQuote(req, res) {
  if (cachedQuotes.length === 0) {
    await fetchQuotesAndCache();
  }
  res.json(cachedQuotes);
}

module.exports = {
  getQuote,
};
