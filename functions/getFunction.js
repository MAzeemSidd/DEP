import db from "./dbConnection.js";

function getFunction(res, query) {
    db.query(query, (err, data) => {
        if(err) return res.send(err);
        return res.json(data);
    })
}

export default getFunction;