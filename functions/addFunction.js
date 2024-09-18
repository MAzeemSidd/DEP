import db from "./dbConnection.js";

function addFunction(res, query, values, successMsg) {
    db.query(query, [values], (err) => {
        if(err) return res.send(err);
        return res.send(successMsg);
    })
}

export default addFunction;