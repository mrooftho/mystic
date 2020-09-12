'use strict';

module.exports.getUser = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Here is some data',
      input: event,
    }),
  };
};
