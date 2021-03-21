import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
const bearerToken = require('express-bearer-token');
import {router as enigmeRouter} from './enigmeService';

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(bearerToken())
  .use(enigmeRouter);

app.listen(4201, () => {
  return console.log('My Node App listening on port 4201');
});