import connection from "../database.js";

async function createFinance({user, value, type}) {
    const result = await connection.query(
        `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3) RETURNING *;`,
        [user.id, value, type]
    );
    return result.rows[0];
}

export {
    createFinance,
}