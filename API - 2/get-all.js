'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;

//const {userID} = JSON.parse(event.body);

  const params = {
    TableName: "Meal_planner",
  };

  try {
    const data = await documentClient.scan(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 200;
  } catch(err) {
    responseBody = `Unable to get product: ${err}`;
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
     
    },
    body: responseBody
  };

  return response;
};

/// No Response Body is Required ///