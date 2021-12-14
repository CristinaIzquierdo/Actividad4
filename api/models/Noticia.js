import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const NoticiaSchema = Schema({
  titulo: String,
  texto: String,
  periodista: [
    {
      _id: false,
      id: Number,
      nombre: String,
    },
  ],
  recurso: [Number],
});

const Noticia = mongoose.model('Noticia', NoticiaSchema);
export { Noticia };
