'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

module.exports = (yeldData, businessName) => {
    const date = JSON.stringify(new Date());
    
    const dynamoDb = new AWS.DynamoDB.DocumentClient({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_DEFAULT_REGION
    });
    
    const params = {
        Item: {
            id: {
                S: uuid.v1()
            },
            businessName: {
                S: businessName
            },
            reviewCount: {
                N: yeldData.reviewCount
            },
            rating: {
                N: yeldData.rating
            },
            scrapedAt: {
                S: date
            }
        },
        TableName: process.env.DYNAMODB_TABLE
    };

    return dynamoDb.put(params, (error, data) => {
        console.log(data);

        if (error) {
            console.log(`Error saving data DynamoDB ${error}`);
            return Promise.reject(
                `Error saving data DynamoDB ${JSON.stringify(error)}`  
            );
        } else {
            console.log(params.Item);
            return Promise.resolve(params.Item);
        } 
    });
}