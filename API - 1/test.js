'use strict';
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const uuid = require('uuid/v4');

const postsTable = process.env.POSTS_TABLE;

//Create a response body
function response(statusCode, message) {
    return {
      statusCode: statusCode,
      body: JSON.stringify(message)
    };
}

// Get a single post
module.exports.getPost = (event, context, callback) => {
    const id = event.pathParameters.id;
    const params = {
      Key: {
        id: id
      },
      TableName: postsTable
    };
  
    return db
      .get(params)
      .promise()
      .then((res) => {
        if (res.Item) callback(null, response(200, res.Item));
        else callback(null, response(404, { error: 'Post not found' }));
    })
      .catch((err) => callback(null, response(err.statusCode, err)));
};