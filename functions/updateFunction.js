import db from "./dbConnection.js";

function updateFunction(updateQuery, values, successMsg) {
    return new Promise((resolve, reject) => {
        db.query(updateQuery, values, (err) => {
            if(err) return reject(err);
            return resolve(successMsg);
        })
    })
}

export default updateFunction;