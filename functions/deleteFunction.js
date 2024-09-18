import db from "./dbConnection.js";

function deleteFunction(res, query, successMsg) {
    db.query(query, (err) => {
        if(err) return res.send(err);
        return res.send(successMsg)
    })
}

export default deleteFunction;