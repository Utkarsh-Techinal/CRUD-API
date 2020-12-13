'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;

const {userID,TimeStamp,Meal,MealCalorie,MealName,MealWeight} = JSON.parse(event.body);

  const params = {
    TableName: "Meal_planner",
    Item: {
      userID :userID,
        TimeStamp : TimeStamp,
        Meal : Meal,
        MealCalorie: MealCalorie,
        MealName: MealName,
        MealWeight : MealWeight
    }
  };

  try {
    const data = await documentClient.put(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 201;
  } catch(err) {
    responseBody = `Unable to put product: ${err}`;
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


/*    // Response Body Post //
{
    "userID" :"Anish",
    "TimeStamp" : "26Sept2020",
    "Meal" : "Lunch",
    "MealCalorie": 987,
    "MealName": "Dal",
    "MealWeight" : 40
}
*/