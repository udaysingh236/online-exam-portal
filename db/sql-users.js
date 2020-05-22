const sqlHelper = require("./sqlhelper");
const commonTags = require("common-tags");

const insertUser = commonTags.stripIndent(`
    INSERT INTO USERS (NAME, EMAIL) 
    VALUES (:userName, :userEmail) RETURNING ID INTO :userID
`);

exports.insertUser = async (userName, userEmail) => {
  try {
    const insertUserParams = {
      userName: userName,
      userEmail: userEmail,
      userID: {
        type: oracledb.NUMBER,
        dir: oracledb.BIND_OUT,
      },
    };
    const insertUserResults = await sqlHelper.getQueryResults(insertUser, insertUserParams);
    return insertUserResults.outBinds;
  } catch (error) {
    console.log(`sql-users error ${error}`);
    throw error;
  }
}