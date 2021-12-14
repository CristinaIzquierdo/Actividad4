import { connection } from '../common/db.js';
import { Noticia } from '../models/Noticia.js';

//Returns all the periodistas order by created_at
const get = (req, res) => {
  const query =
    'SELECT id, nombre, fechaNacimiento FROM periodistas ORDER BY created_at ASC';
  connection.query(query, (err, rows) => {
    err ? res.status(500).send(err) : res.status(200).send(rows);
  });
};

//Returns a periodista by id and his noticias
const getById = (req, res) => {
  const idPeriodista = req.params.id;
  const query = `SELECT id, nombre, fechaNacimiento FROM periodistas WHERE id = ${idPeriodista}`;
  connection.query(query, (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      //mongo query find noticias by idPeriodista, returns only titulo and texto
      Noticia.find({ 'periodista.id': idPeriodista }, (err, noticias) => {
        if (err) {
          res.status(500).send(err);
        } else {
          rows[0].noticias = noticias;
          res.status(200).send(rows);
        }
        //Of the noticias only returns its id, the titulo and the texto
      }).select('titulo texto');
    }
  });
};

const addPeriodista = (req, res) => {
  const nombrePer = req.body.nombre;
  const fechaNacimientoPer = req.body.fechaNacimiento;
  connection.query(
    `INSERT INTO periodistas (nombre, fechaNacimiento) VALUES ('${nombrePer}', '${fechaNacimientoPer}');`,
    (err, rows) => {
      err ? res.status(500).send(err) : res.status(200).send(rows);
    }
  );
};

// updates a periodistas's name and date of birth by id
const updateOneById = (req, res) => {
  const idPeriodista = req.params.id;
  const nuevoNombre = req.body.nombre;
  const nuevaFecha = req.body.fechaNacimiento;
  const query = `UPDATE periodistas SET nombre = '${nuevoNombre}', fechaNacimiento = '${nuevaFecha}' WHERE id = ${idPeriodista}`;
  connection.query(query, (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      //mongo find the periodista by id and update its name
      Noticia.updateMany(
        { 'periodista.id': idPeriodista },
        { 'periodista.$.nombre': nuevoNombre },
        (err, periodista) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(200).send('Periodista actualizado :)');
          }
        }
      );
    }
  });
};

//deletes the periodista by id and his noticias and recursos
const deleteOneById = (req, res) => {
  const idPeriodista = req.params.id;
  const query = `DELETE FROM periodistas WHERE id = ${idPeriodista}`;
  connection.query(query, (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      Noticia.find({ 'periodista.id': idPeriodista }, (err, noticia) => {
        if (err) {
          res.status(500).send(err);
        } else {
          //search for each noticia in the array the periodista's array length
          noticia.forEach((not) => {
            /**
             * If the length is 1, then delete the noticia,
             * if a noticia has more than 1 periodista then update the periodistas from the noticia without the periodista,
             * NOT delete the noticia
             * */
            if (not.periodista.length == 1) {
              Noticia.deleteOne({ _id: not._id }, (err, noticia) => {
                if (err) {
                  res.status(500).send(err);
                } else {
                  res.status(200).send('Periodista eliminado :)');
                }
              });
            } else {
              Noticia.updateOne(
                { _id: not._id },
                { $pull: { periodista: { id: idPeriodista } } },
                (err, noticia) => {
                  if (err) {
                    res.status(500).send(err);
                  } else {
                    res.status(200).send('Periodista eliminado :)');
                  }
                }
              );
            }
          });
        }
      });
    }
  });
};

export { get, addPeriodista, getById, updateOneById, deleteOneById };
