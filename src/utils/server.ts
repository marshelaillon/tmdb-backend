import express from 'express';
import router from '../routes';

export default function createServer() {
  const app = express();
  app.use(express.json());
  app.use('/api/v1', router);
  return app;
}
