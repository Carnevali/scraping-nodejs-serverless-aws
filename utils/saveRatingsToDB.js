'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (yeldData, businessName) => {
    const date = JSON.stringify(new Date());
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            id: uuid.v1(),
            businessName: businessName,
            reviewCount: yeldData.reviewCount,
            rating: yeldData.rating,
            scrapedAt: date
        }
    };

    dynamoDb.put(params, error => {
        if (error) {
            console.log(`Error saving data DynamoDB ${error}`);
            return Promise.reject(
                `Error saving data DynamoDB ${JSON.stringify(error)}`  
            );
        } else {
            return Promise.resolve(params.Item);
        } 
    });
}