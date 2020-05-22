const sqlHelper = require("./sqlhelper");
const commonTags = require("common-tags");

const eduPageQuery = commonTags.stripIndent(`
    SELECT TST.* FROM ADMIN.PRACTICE_TEST_QUESTIONS TST
`);

exports.geteduPageDetails = async () => {
    try {
        const eduPageResults = await sqlHelper.getStatementResults(eduPageQuery);
        // console.log(`eduPageResults: ${JSON.stringify(eduPageResults, null, 2)}`);
        return eduPageResults.rows;
    } catch (error) {
        console.log(`sql-education error ${error}`);
        throw error;
    }
}