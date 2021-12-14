import { Noticia } from '../models/Noticia.js';
import { connection } from '../common/db.js';

const get = (req, res) => {
  Noticia.find({}, (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.render('noticias', { noticias: data });
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
      res.render('noticias', { noticias: data });
    }
  });
};

export { get, getNoticiaByIdPeriodista };
