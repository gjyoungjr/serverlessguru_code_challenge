const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();

const tableName = process.env.TABLE_NAME; // gets table name from env variable

module.exports.deleteOrder = async (event) => {
  const { orderId, userId } = event.pathParameters; // gets order Id & user Id from url

  // Config Object for DynamoDB
  let params = {
    TableName: tableName,
    Key: {
      //
      PK: orderId,
      SK: userId,
    },
  };

  // call delete operation to delete data in dynamoDb.
  try {
    await docClient.delete(params).promise();
  } catch (err) {
    console.error("ERROR:", err.message);
    return err;
  }

  const response = {
    statusCode: 204, // 204 code for No Content since data is deleted
  };
  return response;
};
