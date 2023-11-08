import express from 'express';
import router from '../routes';
import morgan from 'morgan';

export default function createServer() {
  const app = express();
  app.use(express.json());
  app.use(morgan('dev'));
  app.use('/api/v1', router);
  return app;
}
