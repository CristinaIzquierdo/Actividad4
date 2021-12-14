import { connection } from '../common/db.js';

//TODO: borrar ??? , no se usa, los datos se insertan desde sql directamente
const add = (req, res) => {
  const url = req.body;
  connection.query(`INSERT INTO recursos (url) VALUES ('${url}');`);
  (err, rows) => {
    err ? res.status(500).send(err) : res.status(200).send(rows);
  };
};

export { add };
