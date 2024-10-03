import { db } from "./dbConnection.js";

function getFunction(query) {
    return new Promise((resolve, reject) => {
        db.query(query, (err, data) => {
            if(err) return reject(err);
            return resolve(data);
        })
    })
}

export default getFunction;