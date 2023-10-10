require('dotenv').config();
import express from 'express';
import router from './routes';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/v1', router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;

// https://github.com/wpcodevo/node_prisma_postgresql/blob/master/src/routes/auth.routes.ts
