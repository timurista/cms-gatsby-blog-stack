var contentful = require("contentful");

exports.handler = async event => {
  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello from Lambda! This is gatsby response")
  };
  return response;
};
