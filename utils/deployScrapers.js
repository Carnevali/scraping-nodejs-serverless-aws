'use strict';

const request = require('request-promise');
const AWS = require('aws-sdk');

module.exports = (businessName) => {
    const lambda = new AWS.Lambda({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_DEFAULT_REGION
    });

    const params = {
        FunctionName: "yeld-scraper-dev-scrape",
        InvocationType: "RequestResponse",
        LogType: "Tail",
        Payload: JSON.stringify(businessName)
    };

    return lambda.invoke(params, function(error, data) {
        if (error) {
            console.log(JSON.stringify(error));
            return new Error(`Error scraping: ${JSON.stringify(error)}`)
        } else {
            console.log(JSON.stringify(data));
            return JSON.stringify(data);
        }
    });
}