/* tslint:disable */
import express from 'express';
import { environments } from './config/environments';


const app = express();
app.listen(environments.port);

app.use('/character', require('./routes/characters.routes'))
