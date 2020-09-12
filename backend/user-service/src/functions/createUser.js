'use strict';
const AWS = require('aws-sdk');
const bcrypt = require('bcryptjs');

module.exports.createUser = async (event, context) => {
  const body = JSON.parse(event.body);
  const {
    username,
    password
  } = body;

  const newUserParams = {
    TableName: process.env.DYNAMODB_USER_TABLE,
    Item: {
      pk: username,
      password: bcrypt.hashSync(password, 10)
    }
  };

  try {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    await dynamoDB.put(newUserParams).promise();
    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'Authorization'
      }
    }
  } catch (ex) {
    console.warn('Error creating new user', newUserParams, ex);
    return new Error('Error creating new user');
  }
};
