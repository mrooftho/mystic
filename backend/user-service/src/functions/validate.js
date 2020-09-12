'use strict';
const jwt = require('jsonwebtoken');
module.exports.validate = async (event, context) => {
  const {
    authorizationToken,
    methodArn
  } = event;
  const [bearer, token] = authorizationToken.split(' ', 2);
  if (!bearer || !token || bearer != 'Bearer' || token.length < 5) {
    return generatePolicy(
      null,
      'Deny',
      methodArn
    );
  }
  
  let tokenObj = jwt.verify(
    token,
    process.env.JWT_SECRET
  );

  if (tokenObj && tokenObj.username && tokenObj.salt) {
    return generatePolicy(
      tokenObj.username,
      'Allow',
      methodArn
    );
  }

  return generatePolicy(
    null,
    'Deny',
    methodArn
  );

};

const generatePolicy = function(principalId, effect, resource) {
  // Required output:
  let authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
      let policyDocument = {};
      policyDocument.Version = '2012-10-17'; // default version
      policyDocument.Statement = [];
      let statementOne = {};
      statementOne.Action = 'execute-api:Invoke'; // default action
      statementOne.Effect = effect;
      statementOne.Resource = resource;
      policyDocument.Statement[0] = statementOne;
      authResponse.policyDocument = policyDocument;
  }
  // Optional output with custom properties of the String, Number or Boolean type.
  /* authResponse.context = {
      "stringKey": "stringval",
      "numberKey": 123,
      "booleanKey": true
  }; */
  return authResponse;
}
