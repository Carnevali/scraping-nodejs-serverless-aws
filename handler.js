'use strict';

const { getPage, parsePage, saveRatingsToDB } = require('./utils');

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
  .catch(error => 
      callback(new Error(`Error scraping ${event}: ${JSON.stringify(error)}`))
  );
};
