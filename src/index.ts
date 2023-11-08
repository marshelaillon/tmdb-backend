import createServer from './utils/server';

const PORT = process.env.PORT || 3000;
const app = createServer();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// https://github.com/wpcodevo/node_prisma_postgresql/blob/master/src/routes/auth.routes.ts
