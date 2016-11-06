import addRoutes from 'business-chat-backend/routes/addRoutes';
import express from 'express';

const app = express();
addRoutes(app);

export default app;
