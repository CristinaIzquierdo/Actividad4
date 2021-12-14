import express from 'express';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';
dotenv.config();

//express config
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static('./public'));

//mongodb config
import mongoose from 'mongoose';
const mongoDB = 'mongodb://localhost/mongoPeriodistas';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongoose error: '));

const port = process.env.PORT || 8080;
const url = `http://localhost:${port}`;
const api = process.env.API;

import { route as noticiasRoute } from './routes/noticia.routes.js';
import { route as periodistasRoute } from './routes/periodista.routes.js';
import { route as viewsRoute } from './routes/views.routes.js';

app.use('/noticias', viewsRoute);
app.use('/periodistas', viewsRoute);

app.use(`${api}/noticias`, noticiasRoute);
app.use(`${api}/periodistas`, periodistasRoute);

//Document
import { swaggerDocument } from './docs/swagger.js';
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(port, () => {
  console.log(` * Listening at port ${port}\n`);
  console.log(` * Server launched in ${url}\n`);
  console.log(` * API URL ${url}${api}`);
});

export default app;
