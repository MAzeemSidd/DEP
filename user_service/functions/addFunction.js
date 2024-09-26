import db from "./dbConnection.js";

function addFunction(query, values, successMsg) {
    return new Promise((resolve, reject) => {
        db.query(query, [values], (err) => {
            if(err) return reject(err);
            return resolve(successMsg);
        })
    })
}

export default addFunction;