const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

exports.getQueryResults = async (sqlQuery, sqlParams, opts = {
    outFormat: oracledb.OBJECT
}) => {
    let connection;
    try {
        connection = await oracledb.getConnection().catch(error => {
            console.log(`sqlhelper get connection error: ${error}`);
            throw error;
        });
        const results = await connection.execute(sqlQuery, sqlParams, opts);
        return results;
    } catch (error) {
        console.log(`sqlhelper first catch error: ${error}`);
        throw error;
    } finally {
        try {
            if (connection) {
                await connection.close();
                let poolStats = {
                    connectionInUse: oracledb.getPool().connectionInUse,
                    connectionsOpen: oracledb.getPool().connectionsOpen,
                    poolIncrement: oracledb.getPool().poolIncrement,
                    poolMax: oracledb.getPool().poolMax,
                    poolMin: oracledb.getPool().poolMin,
                    poolTimeout: oracledb.getPool().poolTimeout,
                    poolPingInterval: oracledb.getPool().poolPingInterval,
                }
                console.log(`poolStats: ${JSON.stringify(poolStats)}`);

            }
        } catch (error) {
            console.log(`sqlhelper error: ${error}`);
            throw error;
        }
    }
}

exports.getStatementResults = async sqlQuery => {
    let connection;
    try {
        oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
        connection = await oracledb.getConnection().catch(error => {
            console.log(`sqlhelper get connection error: ${error}`);
            throw error;
        });
        const results = await connection.execute(sqlQuery);
        return results;
    } catch (error) {
        console.log(`sqlhelper first catch error: ${error}`);
        throw error;
    } finally {
        try {
            if (connection) {
                await connection.close();
                let poolStats = {
                    connectionInUse: oracledb.getPool().connectionInUse,
                    connectionsOpen: oracledb.getPool().connectionsOpen,
                    poolIncrement: oracledb.getPool().poolIncrement,
                    poolMax: oracledb.getPool().poolMax,
                    poolMin: oracledb.getPool().poolMin,
                    poolTimeout: oracledb.getPool().poolTimeout,
                    poolPingInterval: oracledb.getPool().poolPingInterval,
                }
                console.log(`poolStats: ${JSON.stringify(poolStats)}`);

            }
        } catch (error) {
            console.log(`sqlhelper error: ${error}`);
            throw error;
        }
    }
}