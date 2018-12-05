'use strict';

const { getPage, parsePage, saveRatingsToDB, deployScrapers } = require('./utils');

module.exports.scrape = async (event, context, callback) => {
  // 1. fetch yelp page
  await getPage(event)
  //2. parse the page
  .then(page => parsePage(page))
  //3. save ratings data to our db
  .then(yeldData => saveRatingsToDB(yeldData, event))
  .then(() => 
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: `Scraped ${event}`
      })  
    })
  )
  .catch((error) => 
      callback(new Error(`Error scraping ${event}: ${JSON.stringify(error)}`))
  );
};

module.exports.launch_scrapers = async (event, context, callback) => {
  //list business name
  const fakeDatabaseResults = [
    "urban-light-at-lacma-los-angeles",
    "the-museum-of-contemporary-art-los-angeles",
    "the-last-bookstore-los-angeles"
  ];

  //launch a lambda for each business name
  fakeDatabaseResults.forEach(businessName => {
    deployScrapers(businessName);
  });
};