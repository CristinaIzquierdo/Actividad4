import { connection } from '../common/db.js';
import { Noticia } from '../models/Noticia.js';

const get = (req, res) => {
  Noticia.find({}, (err, data) => {
    err ? res.json(err) : res.json(data);
  });
};

//returns all noticias by noticiaBy
const getById = (req, res) => {
  const noticiaId = req.params.id;
  Noticia.findOne({ _id: noticiaId }).exec((err, data) => {
    if (err) {
      res.json(err);
    } else {
      // get all the ids from recurso array
      const recursosIds = data.recurso;
      //search in sql with recursosIds all the recursos
      const recuQuery = `SELECT id, url FROM recursos WHERE id IN (${recursosIds})`;
      connection.query(recuQuery, (err, resultRecurso) => {
        if (err) {
          res.json(err);
        } else {
          //builds a new object that add the result of both queries
          const noticia = {
            id: data._id,
            titulo: data.titulo,
            texto: data.texto,
            periodista: data.periodista,
            recursos: resultRecurso,
          };
          res.json(noticia);
        }
      });
    }
  });
};

//returns all the noticias from idPeriodista
const getNoticiaByIdPeriodista = (req, res) => {
  const idPeriodista = req.params.id;
  Noticia.find({ 'periodista.id': idPeriodista }).exec((err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
};

const add = (req, res) => {
  const arrPeriodistas = req.body.periodista;
  //checks if all the periodistas in the array (arrPeriodistas) exist in mysql, if all exist, can continue
  const perQuery = `SELECT id, nombre FROM periodistas WHERE id IN (${arrPeriodistas})`;
  connection.query(perQuery, (err, resultPeriodista) => {
    if (err) {
      res.send(err);
    } else {
      //if the length of the query result is equal to the length of the array of periodistas, can continue, else return a message
      if (resultPeriodista.length == arrPeriodistas.length) {
        const arrRecursos = req.body.recurso;
        //checks if all the recursos in the array (arrRecursos) exist in mysql, if all exist, can continue
        const recuQuery = `SELECT id FROM recursos WHERE id IN (${arrRecursos})`;
        connection.query(recuQuery, (err, resultRecurso) => {
          if (err) {
            res.send(err);
          } else {
            //if the length of the query result is equal to the length of the array of recursos, can create the noticia, else return a message
            if (resultRecurso.length == arrRecursos.length) {
              //creates the new noticia
              const noticia = new Noticia({
                titulo: req.body.titulo,
                texto: req.body.texto,
                periodista: resultPeriodista,
                recurso: arrRecursos,
              });
              //saves the new noticia
              noticia.save((err, data) => {
                err ? res.json(err) : res.json(data);
              });
            } else {
              res.send('Alguno de los recursos no existe');
            }
          }
        });
      } else {
        res.send('Alguno de los periodistas no existe');
      }
    }
  });
};

const deleteNoticia = (req, res) => {
  const idNoticia = req.params.id;
  Noticia.findOneAndDelete({ _id: idNoticia }, (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
};

export { get, getById, add, getNoticiaByIdPeriodista, deleteNoticia };
