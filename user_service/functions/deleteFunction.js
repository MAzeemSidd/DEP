import db from "./dbConnection.js";

function deleteFunction(query, successMsg) {
    return new Promise((resolve, reject) => {
        db.query(query, (err) => {
            if(err) return reject(err);
            return resolve(successMsg)
        })
    })
}

export default deleteFunction;