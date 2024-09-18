import db from "./dbConnection.js";

function updateFunction(res, updateQuery, values, successMsg) {
    db.query(updateQuery, values, (err) => {
        if(err) return res.send(err);
        return res.send(successMsg);
    })
}

export default updateFunction;