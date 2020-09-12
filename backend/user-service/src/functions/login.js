'use strict';
const AWS = require('aws-sdk');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
module.exports.login = async (event, context) => {
  const body = JSON.parse(event.body);
  const {
    username,
    password
  } = body;

  let qryResult = {};
  try {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    qryResult = await dynamoDB.query({
      TableName: process.env.DYNAMODB_USER_TABLE,
      KeyConditionExpression: '#username = :username',
      ExpressionAttributeNames: {
        '#username': 'pk'
      },
      ExpressionAttributeValues: {
        ':username': username
      }
    }).promise();
  } catch (ex) {
    console.warn('Error retrieving user', username, ex);
    return new Error('Error retrieving user');
  }

  if (qryResult.Items && qryResult.Items.length) {
    const validatePasswordResult = bcrypt.compareSync(
      password,
      qryResult.Items[0].password
    );
    if (validatePasswordResult) {
      const token = jwt.sign({
        username,
        salt: uuid.v4()
      }, process.env.JWT_SECRET);
      return {
        statusCode: 200,
        body: JSON.stringify({
          token
        })
      }
    }
  }

  return {
    statusCode: 404
  };
};
